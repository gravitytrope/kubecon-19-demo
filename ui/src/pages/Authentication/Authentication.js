import React from 'react';

import ManifestArea from '../../components/ManifestArea';

import styles from './styles.module.scss';
import aeslogo from "../../images/aes-logo.png";

const manifestAuth1 = `---
apiVersion: v1
kind: Service
metadata:
  name: example-auth
spec:
  type: ClusterIP
  selector:
    app: example-auth
  ports:
  - port: 3000
    name: http-example-auth
    targetPort: http-api
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-auth
spec:
  replicas: 1
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: example-auth
  template:
    metadata:
      labels:
        app: example-auth
    spec:
      containers:
      - name: example-auth
        image: datawire/ambassador-auth-service:2.0.0
        env:
        - name: AUTH_PATH
          value: /extauth/authentication
        imagePullPolicy: Always
        ports:
        - name: http-api
          containerPort: 3000
        resources:
          limits:
            cpu: "0.1"
            memory: 100Mi
`;

const manifestAuth2 = `---
apiVersion: getambassador.io/v1
kind: AuthService
metadata:
  name: authentication
spec:
  auth_service: "example-auth:3000"
  path_prefix: "/extauth"
  allowed_request_headers:
  - "x-qotm-session"
  allowed_authorization_headers:
  - "x-qotm-session"
---
apiVersion: v1
kind: Service
metadata:
  name: example-auth
spec:
  type: ClusterIP
  selector:
    app: example-auth
  ports:
  - port: 3000
    name: http-example-auth
    targetPort: http-api
`;

const Authentication = () =>
        <div>
            <p>
                <img className={styles.center} src={aeslogo} alt="Ambassador Edge Stack"/>
            </p>

            <center>
                <h1>Authentication in Action</h1>
            </center>
            <section className={styles.container}>
                <div className={styles.half}>
                  <ManifestArea manifest={manifestAuth1} />
                </div>
                <div className={styles.half}>
                  <ManifestArea manifest={manifestAuth2} />
                </div>
            </section>
        </div>
;

export default Authentication;
