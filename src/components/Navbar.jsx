import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/recipes">Recipes</Link></li>
      <li><Link to="/communities">Communities</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/login">Login</Link></li> {/* Add Login link */} {/* Add Dashboard link */}
    </ul>
  </nav>
);

export default Navbar;