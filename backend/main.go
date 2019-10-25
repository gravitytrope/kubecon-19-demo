// Copyright 2019 Philip Lombardi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gorilla/websocket"
	"github.com/plombardi89/gozeug/randomzeug"
)

var port = 8080

const (
	EnvPORT        = "PORT"
	EnvHOST        = "HOST"
	EnvOpenAPIPath = "OPENAPI_PATH"
	EnvRPS         = "RPS"
)

type Server struct {
	id       string
	host     string
	port     int
	router   *chi.Mux
	upgrader websocket.Upgrader
	hub      *Hub
	random   *randomzeug.Random
	quotes   []string
	reqTimes []time.Time
}

type QuoteResult struct {
	Server string    `json:"server"`
	Quote  string    `json:"quote"`
	Time   time.Time `json:"time"`
}

type DebugInfo struct {
	Server     string              `json:"server"`
	Time       time.Time           `json:"time"`
	Method     string              `json:"method"`
	Host       string              `json:"host"`
	Proto      string              `json:"proto"`
	URL        *url.URL            `json:"url"`
	RemoteAddr string              `json:"remoteaddr"`
	Headers    map[string][]string `json:"headers`
	Body       string              `json:"body`
}

func (s *Server) GetRPS() int {
	n := time.Now()

	count := 0

	for _, t := range s.reqTimes {
		d := n.Sub(t)
		if d.Seconds() <= 1 {
			count += 1
		}
	}
	return count
}

func (s *Server) GetQuote(w http.ResponseWriter, r *http.Request) {
	if rpsString := os.Getenv(EnvRPS); rpsString != "" {
		rps, err := strconv.Atoi(rpsString)
		if err != nil {
			log.Fatalln(err)
		}
		s.reqTimes = append(s.reqTimes, time.Now())
		if s.GetRPS() >= rps {
			http.Error(w, "Request Overload", http.StatusInternalServerError)
			return
		}
	}

	quote := s.random.RandomSelectionFromStringSlice(s.quotes)
	//quote := "Service Preview Rocks!"
	res := QuoteResult{
		Server: s.id,
		Quote:  quote,
		Time:   time.Now().UTC(),
	}

	resJson, err := json.MarshalIndent(res, "", "    ")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusOK)

	if _, err := w.Write(resJson); err != nil {
		log.Panicln(err)
	}
}

func (s *Server) StreamQuotes(w http.ResponseWriter, r *http.Request) {
	hdr := make(map[string][]string)
	val := make([]string, 1)
	val[0] = "tour-cookie=ws"
	hdr["set-cookie"] = val

	conn, err := s.upgrader.Upgrade(w, r, http.Header(hdr))
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{hub: s.hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	go client.readPump()
	go client.writePump()
}

func (s *Server) HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func (s *Server) Debug(w http.ResponseWriter, r *http.Request) {
	var bBytes []byte
	if r.Body != nil {
		bBytes, _ = ioutil.ReadAll(r.Body)
		r.Body = ioutil.NopCloser(bytes.NewBuffer(bBytes))
	}

	bString := string(bBytes)

	req := DebugInfo{
		Server:     s.id,
		Time:       time.Now().UTC(),
		Method:     r.Method,
		Host:       r.Host,
		Proto:      r.Proto,
		URL:        r.URL,
		RemoteAddr: r.RemoteAddr,
		Headers:    r.Header,
		Body:       bString,
	}

	reqJson, err := json.MarshalIndent(req, "", "    ")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println(string(reqJson))

	if strings.Compare(r.URL.Path, "/add_header") == 0 {
		w.Header().Set("x-custom-header", "true")
		w.Header().Set("set-cookie", "tour-cookie=REST")
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusOK)

	if _, err := w.Write(reqJson); err != nil {
		log.Panicln(err)
	}
}

// KubectlApply aplies a manifest by executing a local `kubectl`.
// This endpoint will be used by some frontend demos for loading
// manifests in the kubernetes cluster.
func (s *Server) KubectlApply(w http.ResponseWriter, r *http.Request) {
	var bBytes []byte
	bBytes, _ = ioutil.ReadAll(r.Body)
	yaml := string(bBytes)

	log.Printf("Received manifest:\n%s", yaml)

	kubeconfig := getEnv("KUBECONFIG", "")
	if kubeconfig != "" {
		log.Printf("Using KUBECONFIG: %q", kubeconfig)
	}

	if err := kubectlApply(yaml, kubeconfig, ""); err != nil {
		log.Printf("error when applying manifest: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (s *Server) ConfigureRouter() {
	s.router.Use(middleware.Recoverer)
	s.router.Use(middleware.RequestID)
	s.router.Use(middleware.RealIP)

	s.router.Get("/", s.GetQuote)
	s.router.Get("/get-quote/", s.GetQuote)
	s.router.Get("/debug/*", s.Debug)
	s.router.Post("/debug/", s.Debug)
	s.router.Delete("/debug/", s.Debug)
	s.router.Put("/debug/", s.Debug)
	s.router.Post("/kubectl/", s.KubectlApply)
	s.router.Get("/health", s.HealthCheck)
	s.router.HandleFunc("/ws", s.StreamQuotes)

	s.router.Get(getEnv(EnvOpenAPIPath, "/.ambassador-internal/openapi-docs"), s.GetOpenAPIDocument)
}

func (s *Server) Start() error {
	s.hub = newHub(s.random, s.quotes)
	go s.hub.run()

	listenAddr := fmt.Sprintf("%s:%d", s.host, s.port)
	log.Printf("listening on %s\n", listenAddr)
	return http.ListenAndServe(listenAddr, s.router)
}

func main() {
	if portString := os.Getenv(EnvPORT); portString != "" {
		p, err := strconv.Atoi(portString)
		if err != nil {
			log.Fatalln(err)
		}

		if p < 1 || p > 65535 {
			log.Fatalln("Server port must be in range 1..65535 (inclusive)")
		}

		port = p
	}

	startingQuotes := []string{
		"Abstraction is ever present.",
		"A late night does not make any sense.",
		"A principal idea is omnipresent, much like candy.",
		"Nihilism gambles with lives, happiness, and even destiny itself!",
		"The light at the end of the tunnel is interdependent on the relatedness of motivation, subcultures, and management.",
		"Utter nonsense is a storyteller without equal.",
		"Non-locality is the driver of truth. By summoning, we vibrate.",
		"A small mercy is nothing at all?",
		"The last sentence you read is often sensible nonsense.",
		"668: The Neighbor of the Beast.",
	}

	random := randomzeug.NewRandom()
	s := Server{
		id:     generateServerID(random),
		host:   os.Getenv(EnvHOST),
		port:   port,
		router: chi.NewRouter(),
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
		random: random,
		quotes: startingQuotes,
	}

	s.ConfigureRouter()

	log.Fatalln(s.Start())
}
