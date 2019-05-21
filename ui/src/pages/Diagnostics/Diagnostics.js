import React from 'react';
import './styles.scss';

const Diagnostics = () =>
<div>
  <h1>Diagnostics and Monitoring</h1>

  <p>Ambassador includes an integrated Diagnostics service which is helpful for troubleshooting.
  For this tour, we've enabled the diagnostics service to be publicly accessible. Click <a href="/ambassador/v0/diag/">HERE</a> to
  visit the diagnostics service.</p>

  <p>Ambassador also ships with best in class observability by 
     exposing <a href="https://www.envoyproxy.io/docs/envoy/latest/configuration/http_conn_man/stats">Envoy's statistics</a> via 
     statsd. Ambassador integrates with various graphing tools, like Prometheus and Grafana,
     to collect and display these statistics.
  </p>

  <p>For more information about Diagnostics and Monitoring in Ambassador, 
    see the <a href="https://www.getambassador.io/reference/diagnostics">Diagnostics</a> and 
    the <a href="https://www.getambassador.io/reference/statistics">Statistics and Monitoring</a> reference
    in the documentation.</p>
</div>;

export default Diagnostics;
