import React from 'react';
import styles from './styles.module.scss';
import aeslogo from "../../images/aes-logo.png";

function handleClick() {
    window.location.href="/docs/"
}

const DevPortal = () =>
    <div>

        <p>
            <img className={styles.center} src={aeslogo} alt="Ambassador Edge Stack"/>
        </p>

        <center>
            <h1>Dev Portal in Action</h1>
        </center>
        <section className={styles.container}>

            <div className={styles.center}>
                <br/>
                <button
                    className={styles.Button}
                    onClick={handleClick}
                >
                    Go to Dev Portal
                </button>

                <br/>
                <br/>
            </div>

        </section>
    </div>
;

export default DevPortal;
