
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Features from './components/Features';
import FixForward from './components/FixForward';
import Community from './components/Community';
import CTA from './components/CTA';
import Footer from './components/Footer';
import GeometricBackground from './components/GeometricBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-accent/30">
      <GeometricBackground />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Features />
        <FixForward />
        <Community />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
