import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { soundManager } from '../lib/sounds';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    soundManager.startMusic();
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(onComplete, 1000); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {/* Background Atmosphere */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ 
                duration: 2.5, 
                ease: [0.16, 1, 0.3, 1], 
              }}
              className="relative group"
            >
              {/* The Logo Image */}
              <img 
                src="https://drive.google.com/thumbnail?id=1v1MwcKVris98yvhhS4SAoX3qDqckK47i&sz=w1000" 
                alt="LUME Logo" 
                className="h-24 md:h-32 w-auto object-contain brightness-125 relative z-10"
                referrerPolicy="no-referrer"
              />

              {/* Katana Shine Effect */}
              <motion.div
                initial={{ left: '-150%', skewX: -45 }}
                animate={{ left: '150%' }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1.2, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
              />

              {/* Glow behind logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1.2 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute inset-0 bg-white/10 blur-[80px] -z-10 rounded-full"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-8 text-[10px] uppercase tracking-[0.5em] font-bold text-white"
            >
              Forging Legacies
            </motion.p>

            {/* Click to Experience Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={handleEnter}
              className="mt-12 px-8 py-3 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white hover:border-white/40 transition-all duration-500 glass"
            >
              Enter Experience
            </motion.button>
          </div>

          {/* Cinematic Light Rays */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
