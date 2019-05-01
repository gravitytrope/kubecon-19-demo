import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to);
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <RouterLink to={to} {...other}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={other.className}
    >
      {children}
    </a>
  );
};

export default Link;
