import React from 'react';
import grafanaLogo from '../../images/grafana.png';
import './styles.scss';

const Diagnostics = () =>
<div>
  <h1>Diagnostics</h1>

  <p>Ambassador includes an integrated Diagnostics service which is helpful for troubleshooting.
  For this tour, we've enabled the diagnostics service to be publicly accessible. Click <a href="/ambassador/v0/diag/">HERE</a> to
  visit the diagnostics service.</p>

  <p>For more information about Diagnostics, see the <a href="https://www.getambassador.io/reference/diagnostics">Diagnostics</a> reference
    in the documentation.</p>

  <h1>Monitoring</h1>

  <p>Ambassador ships with best in class observability by exposing the various statistics that Envoy collects. This demo includes an integration with Prometheus and Grafana for collecting and processing these statistics. You can view this dashboard by clicking the "Grafana" button at the bottom of this page.</p>

  <a href="https://grafana.k736.net">
  <img border="0" alt="Grafana" src={grafanaLogo} width="186px" height="45px"></img></a>
</div>;

export default Diagnostics;
