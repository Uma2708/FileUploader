import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
    <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
    <p className="logo-text"> FileXchange </p>
      <Link to="/" className="logo-p1">Home</Link>
      <Link to="/uploads" className="logo-p2">Uploads</Link>
  </div>
  )
};

export default Logo;