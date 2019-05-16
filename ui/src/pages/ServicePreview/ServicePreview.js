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
     commands, we can view a version of this application running on a client 
     machine from a web browser. 
  </p>

  <ol>
    <li>First, we will deploy a version of the application with the <code>traffic-sidecar</code>
      <div className="code-block">
        <pre>
          <code>
{`apictl traffic inject tour.yaml -d tour -p 5000 > tour-traffic-sidecar.yaml
kubectl apply -f tour-traffic-sidecar.yaml`}
          </code>
        </pre>
      </div>
    </li>
    <li>Next, we will initialize the traffic intercept proxy
      <div className="code-block">
        <pre>
          <code>
            apictl traffic initialize
          </code>
        </pre>
      </div>
    </li>
    <li>Finally, we will tell the proxy to intercept all traffic with <code>host: service-preview.k736.net</code> and send it to the version running locally on port 3000
      <div className="code-block">
        <pre>
          <code>
            apictl traffic intercept tour -n :authority -m service-preview.k736.net -t 3000
          </code>
        </pre>
      </div>
    </li>
    <p>Now, when we go to the URL <a href="https://service-preview.k736.net">https://service-preview.k736.net</a>, we will see
       the version of the tour we have running locally and any changes we make will
        be seen in the web page.</p>
  </ol>

</div>;

export default ServicePreview;
