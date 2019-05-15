import React from 'react';

import './styles.scss';

import RealTimeGraph from '../../components/RealTimeGraph';

const RateLimitingAction = () =>
<div>
  <h1>Rate Limiting in Action</h1>
  <p>Suppose we have deployed a backend that cannot handle more than 30 requests per second before encountering server errors. In order to protect our entire application from crashing, we need to apply a rate limit on the number of requests to this backend.</p>
  <p>In Ambassador Pro, this is done by injecting a label onto requests that identify the limit of requests allowed over a period of time. This injection is done via the same declarative configuration model used to expose an endpoint.</p>
  <p>Observe the <code>Mapping</code> used to expose the <code>/backend</code> endpoint by running <code>kubectl describe svc tour</code> and notice the <code>labels</code> attribute in the <code>backend_mapping</code>.</p>
  <div className="code-block">
    <pre>
      <code>
{`...
---
apiVersion: ambassador/v1
kind: Mapping
name: backend_mapping
prefix: /backend
service: tour:8080
labels:
  ambassador:
    - request_label:
      - backend
...`}
      </code>
    </pre>
  </div>
  <p>This configures Ambassador to label the request with the string <code>backend</code>. Ambassador Pro then uses this label to count the number of requests of this type and determine if it is over the limit.</p>
  <p>These limits are set by configuring a <code>RateLimit</code> in Ambassador.</p>
  <div className="code-block">
    <pre>
      <code>
{`---
apiVersion: getambassador.io/v1beta1
kind: RateLimit
metadata:
  name: backend-rate-limit
spec:
  domain: ambassador
  limits:
  - pattern: [{generic_key: "backend"}]
    rate: 30
    unit: second
`}
      </code>
    </pre>
  </div>
  <p>The <code>RateLimit</code> defined above will tell Ambassador Pro to only allow 30 requests per second to the <code>/backend</code> endpoint so we can protect our application from crashes that may occur after exceeding that threshold.</p>
  <p>Since <code>RateLimit</code>s are exposed as a Custom Resource Definition, simply copy the YAML to a file and apply it with <code>kubectl</code>.</p>
  <div className="code-block">
    <pre>
      <code>
{`kubectl apply -f ratelimit.yaml`}
      </code>
    </pre>
  </div>
  <br></br>
  <p><strong>Demo this rate limiting using the chart below.</strong></p>
  <ol>
    <li>Click <code>Start Requests</code> to start sending requests to the <code>/backend</code> endpoint.</li>
    <li>Notice the response codes returned in the graph. You will see that we are sending requests at a much higher rate than the endpoint can handle.</li>
    <li>Protect your application by applying the <code>RateLimit</code> above.</li>
    <li>You will now see, instead of the endpoint returning 500 errors, Ambassador is preventing any requests above the 30 request per second limit from reaching the backend and returning a 429 response.</li>
  </ol>
  <hr></hr>
  <RealTimeGraph />
</div>;

export default RateLimitingAction;
