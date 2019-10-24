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
          <nav className={classnames(styles.MobileNav, open && styles.open)}>
            <div className={styles.RightNav}>
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
