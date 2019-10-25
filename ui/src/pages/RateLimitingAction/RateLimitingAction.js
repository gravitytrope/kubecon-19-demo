import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './styles.scss';

import RealTimeGraph from '../../components/RealTimeGraph';
import aeslogo from "../../images/aes-logo.png";
import styles from "../../components/RealTimeGraph/styles.module.scss";
import ManifestArea from '../../components/ManifestArea';
import SliderTemplate from '../../components/SliderTemplate';

// template for the manifest we will `kubectl apply` using the backend service
const template = `---
apiVersion: getambassador.io/v1beta1
kind: RateLimit
metadata:
  name: backend-rate-limit
spec:
  domain: ambassador
  limits:
    - pattern:
        - generic_key: backend
      rate: [VALUE]
      unit: second
`

///////////////////////////////////////////////////////////////////////////////////////

class RateLimitingAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manifest: ""
    };

    this.handleManifestChange = this.handleManifestChange.bind(this);
  }

  handleManifestChange(value) {
    this.setState({
      manifest: value
    });
  }

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: 15,
        textAlign: 'center',
      },
    }));

    return (
      <div>
        <div className={useStyles.root}>

          <Grid container spacing={10}>

            <Grid item xs={12}>
              <img className={styles.center} src={aeslogo} alt="Ambassador Edge Stack" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3">
                <center> Rate Limiting in Action </center>
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <RealTimeGraph />
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={5} direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item xs={8}>
                  <ManifestArea manifest={this.state.manifest} />
                </Grid>
                <Grid item xs={3}>
                  <SliderTemplate template={template} default="100" onChange={this.handleManifestChange} />
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </div>
    );
  }
}

export default RateLimitingAction;
