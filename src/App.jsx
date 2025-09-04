import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Footer from './components/Footer';
import Testimonies from './components/Testimonies';
import About from './components/About';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonies />
      <About />
      <Footer />
    </>
  );
};

export default App;