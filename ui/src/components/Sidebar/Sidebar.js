import React from 'react';

import styles from './styles.module.scss';

import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => (
  <div className={styles.Sidebar}>
    <ul>
      {
        links.map((link, index) => (
          <li key={index} className={styles.ItemLi}>
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
