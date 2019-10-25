# Copyright 2019 Philip Lombardi
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM golang:1.12 as foundation

WORKDIR /build

RUN curl --fail -L https://storage.googleapis.com/kubernetes-release/release/v1.16.0/bin/linux/amd64/kubectl -o /usr/bin/kubectl && \
    chmod a+x /usr/bin/kubectl

COPY go.mod .
COPY go.sum .

RUN go mod download

FROM foundation as builder

COPY . .
RUN make

FROM gcr.io/distroless/base as runtime

COPY --from=builder /usr/bin/kubectl /usr/bin/kubectl
COPY --from=builder /build/bin/qotm-linux-amd64 /bin/qotm

ENTRYPOINT ["/bin/qotm"]
