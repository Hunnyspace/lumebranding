/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import CursorGlow from './components/CursorGlow';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import GamePage from './components/GamePage';

export default function App() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const handleOpenGame = () => setShowGame(true);
    window.addEventListener('open-game', handleOpenGame);
    return () => window.removeEventListener('open-game', handleOpenGame);
  }, []);

  if (showGame) {
    return <GamePage onBack={() => setShowGame(false)} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-white/20">
      <CursorGlow />
      <Header />
      
      <main>
        <Hero />
        <SocialProof />
        <About />
        <Services />
        <Portfolio />
        <Careers />
        <ContactForm />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
