import React from 'react';

import './styles.scss';

const NextSteps = () =>
<div>
  <h1>Next Steps</h1>

  <p>Thanks for walking through the Ambassador Tour! We've just scratched the surface of Ambassador. Here are some additional resources
  for you to continue going forward:</p>

  <ul>
    <li>Our <a href="https://d6e.co/slack">Slack channel</a> is a good place to join for help (and please stick around and help others)</li>
    <li>We have a number of <a href="https://www.getambassador.io/docs/guides/">Guides</a> that walk you through configuring
    gRPC, distributed tracing, and many other features of Ambassador</li>
    <li>Pick up an issue in our GitHub (some are <a href="https://github.com/datawire/ambassador/labels/help%20wanted">tagged help wanted</a>, which is a good place to start)</li>
    <li><a href="https://www.getambassador.io/contact">Contact Sales</a> if you are interested in
    the additional security capabilities in Ambassador Pro, or if you want guaranteed support</li>
  </ul>
</div>;

export default NextSteps;