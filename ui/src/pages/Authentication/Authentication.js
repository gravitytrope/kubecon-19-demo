import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Authentication = () =>
  <div>
    <div className={useStyles.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <img className={styles.center} src={aeslogo} alt="Ambassador Edge Stack" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">
            <center>Authentication in Action</center>
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <ManifestArea manifest={manifestAuth1} rows={40} />
        </Grid>

        <Grid item xs={6}>
          <ManifestArea manifest={manifestAuth2} rows={40} />
        </Grid>
      </Grid>
    </div>
  </div>
;

export default Authentication;
