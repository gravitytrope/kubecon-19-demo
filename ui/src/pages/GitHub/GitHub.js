import React from 'react';

import './styles.scss';

const GitHub = () =>
<div>
  <h1>Single Sign-On with GitHub</h1>

  <p>We've configured the quote endpoint to require authentication from GitHub in order to return a random quote to the user. With Ambassador Pro, we can require users to login with their GitHub credentials before they can view their random quote while allowing full access to rest of this application.</p>

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
    <li>Create a <code>ConfigMap</code> below to hold the credentials for your newly
        created OAuth application. 
      <div className="code-block">
        Replace the <code>{`{{CLIENT_ID}}`}</code> and <code>{`{{CLIENT_SECRET}}`}</code> with
        the Client ID and Client Secret from GitHub and save it to a file called <code>github-cm.yaml</code>.
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
        Apply the <code>ConfigMap</code> above with <code>kubectl</code>:
        <pre>
          <code>
{`kubectl apply -f github-cm.yaml`}
          </code>
        </pre>
      </div>
     </li>
     <li>Deploy Keycloak configured to use GitHub for single sign-on
       <div className="code-block">
         <pre>
           <code>
{`kubectl apply -f https://www.getambassador.io/yaml/tour/github-sso.yaml`}
           </code>
         </pre>
       </div>
     </li>
     <li>Get the <code>External-IP</code> for your Ambassador service <code>kubectl get svc ambassador</code>.</li>
     <li>Create the following <code>Filter</code> and <code>FilterPolicy</code> and save it to a file called <code>github-sso.yaml</code>
       <div className="code-block">
         Replace <code>{`{AMBASSADOR_URL}`}</code> with the protocol and IP/domain of your Ambassador service.
         <pre>
           <code>
{`---
apiVersion: getambassador.io/v1beta2
kind: Filter
metadata:
  name: keycloak
spec:
  OAuth2:
    authorizationURL: {AMBASSADOR_URL}/auth/realms/demo
    clientURL: {AMBASSADOR_URL}
    audience: app
    clientID: app
    secret: 8517c278-0ae8-40e5-b418-20199b7e3fb5
    insecureTLS: true
---
apiVersion: getambassador.io/v1beta2
kind: FilterPolicy
metadata:
  name: httpbin-policy
spec:
  rules:
    - host: "*"
      path: /auth/*
      public: true
    - host: "*"
      path: /backend/get-quote/*
      public: false
      filters:
        - name: keycloak`}
           </code>
         </pre>
       The above resources will tell Ambassador Pro to require authentication from GitHub for every request to <code>{`{AMBASSADOR_IP}`}/backend/get-quote/</code>. Deploy this with <code>kubeclt</code>:
       <pre>
         <code>
{`kubectl apply -f github-sso.yaml`}
         </code>
       </pre>
       </div>
     </li>
     <li>After creating the <code>Filter</code> and <code>FilterPolicy</code> above, click the "Get Quote" button below and log in with GitHub to get your quote.</li>
  </ol>
  
  <a href="/backend/get-quote/" class="quote-btn" target="_blank">Get Quote</a>

</div>;

export default GitHub;
