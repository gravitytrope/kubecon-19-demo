import React from 'react';

import './styles.scss';

import RealTimeGraph from '../../components/RealTimeGraph';

const RateLimitingAction = () =>
<div>
  <h1>Rate Limiting in Action</h1>

  <p>Ambassador Pro supports a variety of rate limiting strategies. When you click on the
  button below, a loop of requests will be sent to the <code>backend</code> service. The
  graph will plot the HTTP response codes received by the client. Initially, you should
  see a large number of successful (2xx) requests.</p>

  <p><RealTimeGraph /></p>

  <p>We can now deploy a rate limit to protect our <code>backend</code> service. Create the
  following rate limit, and save it to a file called <code>backend-rate-limit.yaml</code>:</p>

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
    rate: 50
    unit: second
`}
        </code>
    </pre>
  </div>

  <p>This rule above will tell Ambassador Pro to limit requests that match the "backend" pattern to 30 requests
  per second. Deploy this rate limit to your cluster:</p>

  <div className="code-block">
    <pre>
      <code>
{`kubectl apply -f ratelimit.yaml`}
      </code>
    </pre>
  </div>

  <h2>Under the hood</h2>

  <p>How does this work? Ambassador Pro lets you inject a label onto requests to a given
  service. The rate limit can then pattern match on labels to enforce a rate limit. In this
  case, we've created a label on the <code>backend</code> service.  The <code>Mapping</code>
  for this service looks like the following:</p>

  <div className="code-block">
    <pre>
      <code>
{`...
---
apiVersion: ambassador/v1
kind: Mapping
name: backend_mapping
prefix: /backend/
service: tour:8080
labels:
  ambassador:
    - request_label:
      - backend
...`}
      </code>
    </pre>
  </div>

  <p>The label scheme is highly flexible. Labels can also represent specific client IPs, HTTP headers,
  as well as fixed values. For more information, see the <a href="https://www.getambassador.io/user-guide/advanced-rate-limiting/">advanced
  rate limiting</a> documentation.</p>
  <br></br>
</div>;

export default RateLimitingAction;
