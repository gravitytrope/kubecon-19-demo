import React from 'react';

import './styles.scss';

const GitHub = () =>
<div>
  <h1>Single Sign-On with GitHub</h1>

  <p>The quote endpoint requires authentication from GitHub in order to return a random quote to the user. With Ambassador Pro, we can require users to login with their GitHub credentials before they can view their random quote while allowing full access to rest of this application.</p>

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
    <li>In the <code>sso/</code> directory, edit the <code>github.yaml</code> <code>ConfigMap</code> declaration and add the <code>{`{{CLIENT_ID}}`}</code> and <code>{`{{CLIENT_SECRET}}`}</code> from GitHub:

      <div className="code-block">
        <pre>
          <code>
{`---
apiVersion: v1
kind: ConfigMap
metadata:
  name: github-app
data:
  clientId: {{CLIENT_ID}}
  clientSecret: {{CLIENT_SECRET}}`}
          </code>
        </pre>
      </div>
     </li>
     <li>Get the <code>External-IP</code> for your Ambassador service <code>kubectl get svc ambassador</code>.</li>
     <li>Replace the <code>$AMBASSADOR_IP</code> and <code>$PROTO</code> values in <code>sso/00-tenant.yaml</code></li>
     <li>Deploy Keycloak, the <code>Filter</code> and <code>FilterPolicy</code> with <code>kubectl</code>.
     
       <div className="code-block">
         <pre>
           <code>
{`kubectl apply -f sso/`}             
           </code>
         </pre>
       </div>
     </li>
    <li>After waiting for Keycloak to start, click the <code>Get Quote</code> button below to get your quote.</li>
  </ol>
  
  <a href="/get-quote/" class="quote-btn">Get Quote</a>

</div>;

export default GitHub;
