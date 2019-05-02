import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

import Link from '../Link';

const ambassadorLogo = require('../../images/ambassador-logo.svg');
const datawireLogo = require('../../images/datawire-logo.svg');

class Header extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };
  }

  toggleNav = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;

    return (
      <header className={styles.Header}>
        <div className={styles.Container}>
          <div className={styles.MobileTop}>
            <Link to="/" className={styles.LogoLink}>
              <img
                src={ambassadorLogo}
                alt="Ambassador Logo"
                className={styles.LogoImage}
              />
            </Link>
            <button
              onClick={this.toggleNav}
              className={classnames(styles.Burger, open && styles.open)}
            >
              <span />
              <span />
              <span />
              <span />
            </button>
          </div>
          <nav className={classnames(styles.MobileNav, open && styles.open)}>
            <ul className={styles.NavContainer}>
              <li>
                <Link
                  className={styles.NavLink}
                  to="http://getambassador.io/features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className={styles.NavLink}
                  to="http://getambassador.io/docs"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  className={styles.NavLink}
                  to="http://getambassador.io/pro"
                >
                  Pro
                </Link>
              </li>
              <li>
                <Link
                  className={styles.NavLink}
                  to="http://blog.getambassador.io/case-studies/home"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  className={styles.NavLink}
                  to="http://blog.getambassador.io"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={styles.NavLink}
                  to="https://github.com/datawire/ambassador"
                >
                  Github
                </Link>
              </li>
            </ul>
            <div className={styles.RightNav}>
              <div className={styles.Dropdown}>
                <button className={styles.DropdownButton}>▾ Need Help?</button>
                <div className={styles.DropdownContent}>
                  <Link to="https://join.slack.com/t/datawire-oss/shared_invite/enQtMzcwMDEwMTc5ODQ3LTE1NmIzZTFmZWE0OTQ1NDc2MzE2NTkzMDAzZWM0MDIxZTVjOGIxYmRjZjY3N2M2Mjk4NGI5Y2Q4NGY4Njc1Yjg">Community Slack</Link>
                  <Link to="http://getambassador.io/pro">Ambassador Pro</Link>
                  <Link to="http://www.twitter.com/getambassadorio">Tweet Us</Link>
                </div>
              </div>
              <Link to="https://www.datawire.io" className={styles.DatawireLink}>
                <img
                  src={datawireLogo}
                  alt="Datawire Logo"
                  className={styles.LogoImage}
                />
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
