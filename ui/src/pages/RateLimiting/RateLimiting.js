import React from 'react';

import './styles.scss';


const RateLimiting = () =>
<div>
  <h1>Rate Limiting</h1>

  <p>Rate limiting is a powerful technique to improve systems resilience. There are a wide variety of
  <a href="https://www.getambassador.io/user-guide/rate-limiting">rate limiting strategies</a> which
  are appropriate for different situations. Ambassador supports rate limiting via a 
  <a href="https://www.getambassador.io/reference/services/rate-limit-service">rate limiting API</a>
  where you can implement your own rate limiting service.</p>

  <p>Ambassador Pro includes an integrated, high performance rate limiting service that supports
  a variety of rate limiting strategies, including per-client rate limiting, global rate limiting,
  and per-service rate limiting. Like Ambassador, Ambassador Pro's rate limiting is configured
  declaratively, e.g.,
  </p>

  <pre>
  ```
apiVersion: getambassador.io/v1beta1
kind: RateLimit
metadata:
  name: basic-rate-limit
spec:
  domain: ambassador
  limits:
   - pattern: [{x_limited_user: "false"}, {generic_key: "qotm"}]
     rate: 5
     unit: minute
  </pre>

  <p>
  Later in the tour, we'll show rate limiting in action once you install Ambassador Pro.
  </p>

</div>;

export default RateLimiting;