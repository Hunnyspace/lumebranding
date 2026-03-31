import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { soundManager } from '../lib/sounds';

export default function RecentWorkPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the popup after 8 seconds (after the greeting modal if it appears)
    const timer = setTimeout(() => {
      const hasSeenRecentWork = sessionStorage.getItem('hasSeenRecentWork');
      if (!hasSeenRecentWork) {
        setIsVisible(true);
        soundManager.play('success');
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenRecentWork', 'true');
    soundManager.play('tap');
  };

  const handleView = () => {
    handleClose();
    navigate('/work');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[200] max-w-sm w-[calc(100%-3rem)] md:w-auto"
        >
          <div className="glass bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-start gap-4 relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/5">
              <img 
                src="/skinfirst1.png" 
                alt="The Skin 1st Clinic" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 pr-4 relative z-10">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Recent Work</p>
              <h4 className="text-white font-heading font-bold text-sm mb-1">The Skin 1st Clinic</h4>
              <p className="text-white/60 text-xs mb-3 line-clamp-2">
                Cosmetic Dermatologist specializing in facial sculpting and regenerative treatments.
              </p>
              
              <button 
                onClick={handleView}
                className="text-xs font-medium text-white flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Case Study <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
