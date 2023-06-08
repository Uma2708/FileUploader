import React from 'react';
import logoImage from './logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
    <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
    <p className="logo-text"> FileXchange </p>
  </div>
  )
};

export default Logo;