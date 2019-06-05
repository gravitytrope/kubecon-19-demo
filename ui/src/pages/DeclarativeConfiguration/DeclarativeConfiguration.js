import React from 'react';

import './styles.scss';

const DeclarativeConfiguration = () =>
<div>
  <h1>Declarative Configuration</h1>

  <p>Ambassador is configured <strong>declaratively</strong>. Unlike traditional
  API Gateways that are configured using REST APIs or UIs, you configure
  Ambassador through Kubernetes service annotations or Custom Resources. Not only is this approach
  consistent with Kubernetes, but it also makes it possible (and recommended!) for you
  to manage all your configuration under source control.</p>
  
  <p>
    Here's an example configuration for the <code>tour</code> service and 
    <code>Mapping</code> that's serving this React application through Ambassador:
  </p>

  <div className="code-block">
      <pre>
        <code>
    {`---
apiVersion: v1
kind: Service
metadata:
  name: tour
  annotations:
    getambassador.io/config: |
      ---
      apiVersion: ambassador/v1
      kind: Mapping
      name: tour-ui_mapping
      prefix: /
      service: tour:5000
spec:
  ports:
  - name: ui
    port: 5000
    targetPort: 5000
  - name: backend
    port: 8080
    targetPort: 8080
  selector:
    app: tour
`}
        </code>
    </pre>
  </div>

  <p>
    Above is a standard Kubernetes service called <code>tour</code> that exposes 
    port <code>5000</code> for this React application and <code>8080</code> for 
    the golang backend running in the <code>tour</code> pod.
    Using a <code>Mapping</code> annotation, we tell Ambassador to map requests
    from <code>/</code> to <code>service: tour:5000</code> so requests
    to <code>http://{`{AMBASSADOR_IP}`}/</code> are routed to this React application.
    An example of this using a <code>Mapping</code> custom resource is shown below:
  </p>
    <div className="code-block">
      <pre>
        <code>
    {`---
apiVersion: getambassador.io/v1
kind: Mapping
metadata:
  name: tour-ui
spec:
  prefix: /
  service: tour:5000
`}
        </code>
    </pre>
  </div>
  <p>
    Ambassador exposes a rich set of configuration options for the mapping object,
    including timeouts, load balancing options, traffic weights, and more. For details,
    see <a href="https://www.getambassador.io/reference/mappings">the mapping documentation</a>.
  </p>
  
</div>;

export default DeclarativeConfiguration;
