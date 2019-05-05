import React from 'react';

import './styles.scss';

import ambassadorConsul from '../../images/ambassador-consul.png';

const MultiPlatform = () =>
<div>
  <h1>Multi Platform</h1>

  <p>Many organizations don't migrate to Kubernetes and containers overnight. The
  reality is that you will frequently have legacy applications running in virtual
  machines or bare metal. Using Ambassador as an API Gateway to all your
  applications -- both legacy and containerized -- is a powerful approach to 
  accelerating your cloud migration efforts.</p>

  <p>Ambassador natively integrates with <a href="https://consul.io">Consul</a> to
  route to applications anywhere in your data center. In this architecture, Consul
  tracks the real-time availability of all your services. Ambassador synchronizes
  with Consul's availability data and routes traffic to the appropriate applications,
  whether or not that application is in Kubernetes.</p>

  <p>
    <img src={ambassadorConsul} alt="consul" />
  </p>

  <p>For more information on Consul, see the <a href="https://www.getambassador.io/user-guide/consul">
  Ambassador and Consul integration guide</a>.</p>
</div>;

export default MultiPlatform;