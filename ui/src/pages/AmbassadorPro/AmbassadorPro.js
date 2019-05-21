import React from 'react';
import HubspotForm from 'react-hubspot-form';

import './styles.scss';

const AmbassadorPro = () =>
<div>
  <h1>Ambassador Pro</h1>

  <p>Ambassador Pro is a commercial version of Ambassador. Ambassador Pro includes additional
  capabilities around security (e.g., authentication, rate limiting) and developing
  microservices (e.g., Telepresence integration). If you're interested in trying
  Ambassador Pro, sign up for a free, 14 day trial below. You'll receive an email
  in a few minutes with a license key that you can use.</p>

  <section className="free-trial-form">
    <HubspotForm
      portalId="485087"
      formId="d98c38b7-9551-4490-8800-6cb3ae0f13ff"
      loading="Loading..."
      css=""
    />
  </section>
</div>;

export default AmbassadorPro;
