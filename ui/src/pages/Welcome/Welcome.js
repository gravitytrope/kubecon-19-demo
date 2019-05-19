import React from 'react';

import './styles.scss';

import multiPlatformIcon from '../../images/icons/multi-platform.svg';
import l7SupportIcon from '../../images/icons/l7-support.svg';
import realtimeIcon from '../../images/icons/realtime.svg';
import decentralizedManagementIcon from '../../images/icons/decentralized-management.svg';

const Welcome = () =>
<div>
  <h1>Congratulations!</h1>
  <h2>You've successfully installed the Ambassador API Gateway.</h2>

  <p>
    Ambassador is an open source, Kubernetes-native API Gateway built on <a href="https://www.envoyproxy.io">Envoy Proxy</a>.
  </p>

  <p>
    With Ambassador you can:
  </p>

  <div className="features">
    <div className="column">
      <p className="column-heading">Support multi-platform, L7 workloads</p>
      <article className="feature">
        <div className="icon">
          <img alt="Multi Platform" src={multiPlatformIcon} />
        </div>
        <div>
          <h1>Multi-Platform</h1>
          <p>Support services deployed on VMs, Kubernetes, bare metal.</p>
        </div>
      </article>
      <article className="feature">
        <div className="icon">
          <img alt="L7 Support" src={l7SupportIcon}/>
        </div>
        <div>
          <h1>L7 Support</h1>
          <p>Robust observability & proxy support at the application layer.</p>
        </div>
      </article>
    </div>
    <div className="column">
      <p className="column-heading">Support real-time, decentralized workflows</p>
      <article className="feature">
        <div className="icon">
          <img alt="Real-Time" src={realtimeIcon}/>
        </div>
        <div>
          <h1>Real-Time</h1>
          <p>Designed for fast-changing, ephemeral environments.</p>
        </div>
      </article>
      <article className="feature">
        <div className="icon">
          <img alt="Decentralized Management" src={decentralizedManagementIcon}/>
        </div>
        <div>
          <h1>Decentralized Management</h1>
          <p>Different teams can simultaneously set different API gateway policies.</p>
        </div>
      </article>
    </div>
  </div>

  <p>In this tour, we'll walk you through some of the key features of Ambassador.</p>

</div>;

export default Welcome;
