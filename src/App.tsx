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