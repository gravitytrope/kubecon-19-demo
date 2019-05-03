import React from 'react';

import './styles.scss';

const SingleSignOn = () =>
<div>
  <h1>Single Sign-On</h1>

  <p>  
  Ambassador Pro includes integrated support for Single Sign-On via OpenID Connect and OAuth.
  This support is highly configurable: you can set different authentication policies for
  different services. For example, you could support GitHub SSO for internally-facing services,
  while requiring Google authentication for externally facing services.
  </p>

  <p>
  Ambassador Pro supports multiple authentication policies through its pluggable <a href="https://www.getambassador.io/reference/filter-reference">Filter</a>
  mechanism. Here's an example policy:
  </p>

  <pre>
---
apiVersion: getambassador.io/v1beta2
kind: Filter
metadata:
  name: keycloak
spec:
  OAuth2:
    authorizationURL: https://104.197.119.82/auth/realms/demo
    clientURL: https://104.197.119.82
    secret: 8517c278-0ae8-40e5-b418-20199b7e3fb5
    insecureTLS: true
---
apiVersion: getambassador.io/v1beta2
kind: FilterPolicy
metadata:
  name: httpbin-policy
spec:
  rules:
    - host: "*"
      path: "/tour/private"
      public: false
      filters:
        - name: keycloak
    - host: "*""
      path: "/tour/internal"
      public: false
      filters:
        - name: basic-auth
</pre>

<p>The configuration above runs the Keycloak SSO filter for requests to `/tour/private`, while running the
basic authentication filter for requests to `/tour/internal`.</p>

  <p>
  Later on in this tour, we'll show you how you can set up SSO using GitHub
  in just a few minutes.
  </p>

</div>;

export default SingleSignOn;