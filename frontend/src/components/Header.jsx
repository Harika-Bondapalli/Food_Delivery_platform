import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Component-specific styles

function Header() {
  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;