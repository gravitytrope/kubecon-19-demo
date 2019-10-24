import React from 'react';

import './styles.scss';

import RealTimeGraph from '../../components/RealTimeGraph';
import aeslogo from "../../images/aes-logo.png";
import styles from "../../components/RealTimeGraph/styles.module.scss";

const RateLimitingAction = () =>
        <div>

            <p>
                <img className={styles.center} src={aeslogo} alt="Ambassador Edge Stack"/>
            </p>

            <center>
              <h1>Rate Limiting in Action</h1>
            </center>
            <section className={styles.container}>

                <div className={styles.half}><RealTimeGraph/></div>

                <div className={[styles.half, "code-block"].join(' ')}>
                  <pre>
                    <code>
{`apiVersion: getambassador.io/v1beta1
kind: RateLimit
metadata:
  name: backend-rate-limit
spec:
  domain: ambassador
  limits:
  - pattern: [{generic_key: "backend"}]
    rate: 50
    unit: second
`}
                    </code>
                  </pre>
                  <br/>
                    <button className={styles.Button}>
                        kubectl apply -f ratelimit.yaml
                    </button>

                </div>
            </section>
        </div>
;

export default RateLimitingAction;
