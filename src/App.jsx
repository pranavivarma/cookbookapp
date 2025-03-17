import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import Dashboard from "./pages/Dashboard"; // Import Dashboard component
import Recipes from "./pages/Recipes"; // Import Recipes component
import Communities from "./pages/Communities"; // Import Communities component
import Profile from "./pages/Profile"; // Import Profile component
import Login from "./pages/Login"; // Import Login component
import Register from "./pages/Register"; // Import Register component
import Navbar from "./components/Navbar"; // Import Navbar component
import Footer from "./components/footer"; // Import Footer component
import "./Styles.css";

const App = () => {
  const location = useLocation();
  const hideFooterOnPages = ["/profile", "/login", "/register", "/recipes", "/communities"];
  const shouldShowFooter = !hideFooterOnPages.includes(location.pathname);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;