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

  <br></br>
</div>;

export default RateLimitingAction;
