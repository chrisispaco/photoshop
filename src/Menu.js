import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/">Home</Link>
      {' '}
      <Link to="/app">App</Link>
      {' '}
      <Link to="/help">Help</Link>
    </div>
  );
};

export default Menu;