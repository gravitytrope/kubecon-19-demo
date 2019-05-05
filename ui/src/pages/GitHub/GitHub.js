import React from 'react';

import './styles.scss';

const GitHub = () =>
<div>
  <h1>Single Sign-On with GitHub</h1>

  <p>In this quick start, we'll show you how you can easily configure Ambassador Pro with GitHub for Single Sign-On.</p>

  <ol>
    <li>In Github, create an OAuth application.
      <ul>
       <li>Click on your Profile photo, then choose Settings.</li>
       <li>Click on Developer Settings.</li>
       <li>Click on "Register a New Application".</li>
        <ul>
         <li>The Name can be any value.</li>
         <li>The Homepage URL should be set to your domain name, or you can use <code>https://example.com</code> if you're just testing.</li>
         <li>The Authorization callback uRL should be <code>https://$AMBASSADOR_IP/auth/realms/demo/broker/github/endpoint</code>.</li>
        </ul>
      </ul>
    </li>
    <li>Edit your <code>env.sh</code> and add the <code>CLIENT_ID</code> and <code>CLIENT_SECRET</code> from GitHub:

      <div className="code-block">
        <pre>
          <code>
{`CLIENT_ID=Client ID from GitHub
CLIENT_SECRET=Client Secret from GitHub`}
          </code>
        </pre>
      </div>
     </li>
     <li>Get the <code>External-IP</code> for your Ambassador service <code>kubectl get svc ambassador</code>.</li>
     <li>Replace the <code>$AMBASSADOR_IP</code> values in [api-auth-with-github/00-tenant.yaml](00-tenant.yaml)</li>
     <li>Run <code>make apply-api-auth</code>.</li>
    <li>Go to <code>https://$AMBASSADOR_IP/httpbin/headers</code> in your browser and you will be asked to login. Select the <code>GitHub</code> option.</li>
  </ol>

</div>;

export default GitHub;