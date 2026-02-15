
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GeometricBackground from './components/GeometricBackground';

// Lazy load below-the-fold components to improve initial load time
const Stats = lazy(() => import('./components/Stats'));
const About = lazy(() => import('./components/About'));
const Features = lazy(() => import('./components/Features'));
const FixForward = lazy(() => import('./components/FixForward'));
const Community = lazy(() => import('./components/Community'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingFallback = () => (
  <div className="py-20 flex justify-center items-center w-full">
    <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-accent/30 transition-colors duration-300">
      <GeometricBackground />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Stats />
          <About />
          <Features />
          <FixForward />
          <Community />
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
