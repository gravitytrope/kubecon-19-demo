import React from 'react';

import './styles.scss';

const DeclarativeConfiguration = () =>
<div>
  <h1>Declarative Configuration</h1>

  <p>Ambassador is configured <strong>declaratively</strong>. Unlike traditional
  API Gateways that are configured using REST APIs or UIs, you configure
  Ambassador through Kubernetes-style annotations. Not only is this approach
  consistent with Kubernetes, but it also makes it possible (and recommended!) for you
  to manage all your configuration under source control.</p>
  
  <p>
  Here's an example configuration for the `tour` service that's serving 
  this React application through Ambassador:
  </p>

  <pre>
  ---
apiVersion: v1
kind: Service
metadata:
  name: tour
  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v1
      kind:  Mapping
      name:  tour_mapping
      prefix: /tour/
      service: tour
spec:
  ports:
  - name: http
    port: 80
  </pre>

  <p>This is a standard Kubernetes service called `tour`. In the service, we create
  an Ambassador `mapping` resource which maps requests from `/` to `service: tour`.
  Ambassador exposes a rich set of configuration options for the mapping object,
  including timeouts, load balancing options, traffic weights, and more. For details,
  see <a href="https://www.getambassador.io/reference/mappings">the mapping documentation</a>.</p>
  
</div>;

export default DeclarativeConfiguration;