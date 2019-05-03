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
       <li>The Homepage URL should be set to your domain name, or you can use `https://example.com` if you're just testing.</li>
       <li>The Authorization callback uRL should be `https://$AMBASSADOR_IP/auth/realms/demo/broker/github/endpoint`.</li>
      </ul>
    </ul>
  </li>
  <li>Edit your `env.sh` and add the `CLIENT_ID` and `CLIENT_SECRET` from GitHub:

   ```
   CLIENT_ID=Client ID from GitHub
   CLIENT_SECRET=Client Secret from GitHub
   ```
   </li>
   <li>Get the `External-IP` for your Ambassador service `kubectl get svc ambassador`.</li>
   <li>Replace the `$AMBASSADOR_IP` values in [api-auth-with-github/00-tenant.yaml](00-tenant.yaml)</li>
   <li>Run `make apply-api-auth`.</li>
   <li>Go to `https://$AMBASSADOR_IP/httpbin/headers` in your browser and you will be asked to login. Select the `GitHub` option.</li>
  </ol>

</div>;

export default GitHub;