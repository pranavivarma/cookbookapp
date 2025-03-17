import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the import path as needed

const Home = () => (
  <div className="home-container">
    <header>
      <h1>𝐂𝐎𝐎𝐊𝐁𝐎𝐎𝐊</h1>
      <Navbar />
    </header>
    <main>
      <section className="hero">
        <h2>Discover Authentic Recipes</h2>
        <Link to="/recipes" className="btn">Explore Recipes</Link>
      </section>
    </main>
  </div>
);

export default Home;