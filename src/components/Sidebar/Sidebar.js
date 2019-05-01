import React from 'react';

import styles from './styles.module.scss';

import { NavLink } from 'react-router-dom';

const links = [
  {
    path: '/',
    title: 'Welcome'
  },
  {
    path: '/rate-limiting',
    title: 'Rate Limiting'
  }
];

const Sidebar = () => (
  <div className={styles.Sidebar}>
    <ul>
      {
        links.map((link, index) => (
          <li className={styles.ItemLi}>
            <NavLink
              exact
              to={link.path}
              className={styles.ItemLink}
              activeClassName={styles.ItemLinkActive}
            >
              {link.title}
            </NavLink>
          </li>
        ))
      }
    </ul>
  </div>
);

export default Sidebar;
