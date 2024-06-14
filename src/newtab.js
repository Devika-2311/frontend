// NewTabLink.jsx
import React from 'react';

const NewTabLink = ({ to, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(to, '_blank', 'noopener,noreferrer');
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default NewTabLink;
