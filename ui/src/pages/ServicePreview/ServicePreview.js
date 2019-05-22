import React from 'react';
import svcPreview from '../../images/svc_preview.png';
import './styles.scss';

const ServicePreview = () =>
<div>
  <h1>Service Preview</h1>

  <p>With microservices, it is unlikely that a service you are working on operates
     completely independent of other services running in your Kubernetes cluster. 
     Your service will need to make calls to or use resources from other services.
     This means, that in order to effectively test how your service interacts with
     the others running in your cluster, you will either need to run copies of every
     service locally or build and push an image to your development cluster.
  </p>

  <p>Neither of these solutions work for a developer who wants to quickly make 
     and test changes to their microservice. Option one requires your local 
     machine have the resource capacity to run a copy of your Kubernetes cluster
     and option two introduces a bottleneck into your dev loop that makes 
     iteration only as fast as your build time.
  </p>

  <p><strong>Service preview helps you speed up your dev loop by allowing you to test
     changes made locally against your application running in the cloud in
     real time.</strong>
  </p>

  <img src={svcPreview} alt="svcPreview" align="right"></img>
  <p>
     Say you are adding a feature to service <code>A</code> running in your cluster.
     Service <code>A'</code> is the version of service <code>A</code> with the 
     new feature you just added. Service <code>A</code> relies on both services <code>B</code> and <code>C</code> so 
     testing changes to service <code>A'</code> locally 
     is not an option unless you can run a copy of services <code>B</code> and <code>C</code> locally as well.
  </p>

  <p>
     Service preview allows you test service <code>A'</code> on your local machine
     by acting as a proxy between your local machine and the other services running
     in the cluster. This means that all the calls service <code>A'</code> makes to
     services <code>B</code> and <code>C</code> will be sent to those services running
     in the cluster and any calls they make to service <code>A</code> will instead, 
     be sent to service <code>A'</code> on your local machine.
  </p>

  <p>
     With Ambassador, we are able to have the developer working on service <code>A</code> view
     these changes without impacting anyone else viewing 
     the application. In the graphic, the developer (red lines) with service <code>A'</code> running 
     locally can view these changes while another client
     (blue lines) only sees the version of service <code>A</code> running in the
     cluster. Ambassador does this by routing all requests with <code>host: dev-a.example.com</code> to 
     service <code>A'</code> and all requests
     with <code>host: example.com</code> will be routed normally to the version running
     in the cluster.
  </p>

  <p>A quick example of this functionality can be seen here. With a few simple 
     commands, we can get a version of the backend application running on your 
     machine from a web browser. 
  </p>

  <ol>
    <li>Clone this repository
      <div className="code-block">
        <pre>
          <code>
{`git clone https://github.com/datawire/tour
cd tour/`}
          </code>
        </pre>
      </div>
    </li>
    <li>Run the backend application locally</li>
      <ol type="a">
        <li>Edit <code>backend/main.go</code> by removing the original set 
            of <code>startingQuotes</code>(lines 161-172) and uncommenting the <code>startingQuotes</code> above.
          <div className="code-block">
            <pre>
              <code>
{`
...
  /*
	startingQuotes := []string{
		"Service Preview Rocks!",
	}
	*/

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
...
`}
              </code>
            </pre>
          </div>
        </li>
        <li>Build and run backend application locally on port <code>8080</code>
          <div className="code-block">
            <pre>
              <code>
{`make run -C backend/`}
              </code>
            </pre>
            From a different terminal, send a request to <code>http://localhost:8080/</code> and you will now always get the response: <code>Service Preview Rocks!</code>
          </div>
        </li>
      </ol>
    <li><a href="https://www.getambassador.io/docs/dev-guide/service-preview#install-apictl">Install apictl</a></li>
    <li>Inject and deploy the <code>traffic-sidecar</code> into the tour pod
      <div className="code-block">
        <pre>
          <code>
{`apictl traffic inject k8s/tour.yaml -d tour -s tour -p 8080 > k8s/tour-traffic-sidecar.yaml
kubectl apply -f k8s/tour-traffic-sidecar.yaml`}
          </code>
        </pre>
      </div>
    </li>
    <li>Initialize the traffic intercept proxy
      <div className="code-block">
        <pre>
          <code>
            apictl traffic initialize
          </code>
        </pre>
      </div>
    </li>
    <li>Configure the proxy to intercept all traffic with the header <code>x-user: dev</code> and send it to the version running locally on port 8080
      <div className="code-block">
        <pre>
          <code>
            apictl traffic intercept tour -n x-user -m dev -t 8080
          </code>
        </pre>
      </div>
    </li>
    <li>From another terminal window, send a <code>cURL</code> request to <code>/backend/</code> with the header <code>x-user: dev</code>
      <div className="code-block">
        <pre>
          <code>
            curl -v -H "x-user: dev" http://{`{AMBASSADOR_IP}`}/backend/
          </code>
        </pre>
      </div>
    </li>
  </ol>

</div>;

export default ServicePreview;
