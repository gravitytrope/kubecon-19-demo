import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';
import Link from '../Link';


const isCurrentPage = (location, item) => {
  const currentItemLink = item.path || '';
  const currentLocationPath = location.pathname || '';

  return currentItemLink.replace(/\//g, '') === currentLocationPath.replace(/\//g, '');
};

const BottomNav = ({ routes, location }) => {
  // find the next and previous links based on tutorialLinks
  const currentIdx = routes.findIndex(item => isCurrentPage(location, item));

  const prevLink = currentIdx > 0 ? routes[currentIdx - 1] : null;
  const nextLink = currentIdx < routes.length - 1 ? routes[currentIdx + 1] : null;
  return (
    <div className={styles.Container}>
      { prevLink && <Link className={classnames(styles.Link, styles.Prev)} to={prevLink.path}>Previous: {prevLink.title}</Link> }
      { nextLink && <Link className={classnames(styles.Link, styles.Next)} to={nextLink.path}>Next: {nextLink.title}</Link> }
    </div>
  )};

export default withRouter(BottomNav);