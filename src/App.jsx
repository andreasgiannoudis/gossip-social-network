import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import PrivateRoutes from './hooks/PrivateRoutes';
import UserProfile from './components/UserProfile/UserProfile';
import Gossips from './pages/Gossips/Gossips'; // Import the Gossips component

import './App.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gossips" element={<Gossips />} /> {/* Add Gossips route */}
          </Route>

          {/* Dynamic Route for User Profile */}
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
