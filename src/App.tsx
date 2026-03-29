/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
import GreetingModal from './components/GreetingModal';
import Preloader from './components/Preloader';
import { soundManager } from './lib/sounds';

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleOpenGame = () => setShowGame(true);
    window.addEventListener('open-game', handleOpenGame);
    
    // Start music on first interaction
    const startMusicOnInteraction = () => {
      console.log("User interaction detected, starting audio...");
      if (!hasInteracted) {
        setHasInteracted(true);
        soundManager.startMusic();
        setIsMusicPlaying(soundManager.isMusicPlaying());
      }
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('touchstart', startMusicOnInteraction);
      window.removeEventListener('keydown', startMusicOnInteraction);
    };
    window.addEventListener('click', startMusicOnInteraction);
    window.addEventListener('touchstart', startMusicOnInteraction);
    window.addEventListener('keydown', startMusicOnInteraction);

    return () => {
      window.removeEventListener('open-game', handleOpenGame);
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('touchstart', startMusicOnInteraction);
      window.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const playing = soundManager.toggleMusic();
    setIsMusicPlaying(playing);
    soundManager.play('tap');
  };

  if (isPreloading) {
    return <Preloader onComplete={() => setIsPreloading(false)} />;
  }

  if (showGame) {
    return <GamePage onBack={() => setShowGame(false)} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-white/20">
      <CursorGlow />
      <Header />
      <GreetingModal />
      
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

      {/* Apple-style Music Toggle */}
      <motion.button 
        onClick={toggleMusic}
        initial={false}
        animate={{
          backgroundColor: isMusicPlaying ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: isMusicPlaying ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-[400] h-12 px-4 rounded-2xl glass border flex items-center gap-3 transition-colors duration-500 group shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isMusicPlaying ? (
              <motion.div
                key="on"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                className="text-white"
              >
                <Volume2 size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="off"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                className="text-white/40"
              >
                <VolumeX size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visualizer Bars */}
        <div className="flex items-end gap-[2px] h-3 w-4">
          {[0.6, 1, 0.8].map((height, i) => (
            <motion.div
              key={i}
              animate={{
                height: isMusicPlaying ? ['20%', '100%', '40%', '80%', '20%'] : '20%',
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className={`w-[2px] rounded-full ${isMusicPlaying ? 'bg-white' : 'bg-white/20'}`}
            />
          ))}
        </div>

        <span className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${isMusicPlaying ? 'text-white' : 'text-white/40'}`}>
          {isMusicPlaying ? "Music On" : "Muted"}
        </span>
      </motion.button>
    </div>
  );
}