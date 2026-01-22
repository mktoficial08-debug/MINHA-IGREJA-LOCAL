import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

interface LandingPageProps {
  onNavigateToAuth: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth }) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header onNavigateToAuth={onNavigateToAuth} />
      <main>
        <Hero onNavigateToAuth={onNavigateToAuth} />
        <Features />
        <Pricing onNavigateToAuth={onNavigateToAuth} />
        <CallToAction onNavigateToAuth={onNavigateToAuth} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;