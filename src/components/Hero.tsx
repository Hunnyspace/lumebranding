import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { soundManager } from '../lib/sounds';

const quotes = [
  "We don't just design — we engineer attention.",
  "Building perception that dominates the market.",
  "Your brand's visual identity, weaponized for growth.",
  "Crafting digital experiences that print money.",
  "LUME: Where strategy meets stunning execution.",
  "We build brands that people can't ignore."
];

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">LUME Branding</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight">
            <span className="block text-white">Crafting Brands.</span>
            <span className="block text-white/70">Building Perception.</span>
            <span className="block light-rays-text">Scaling Presence.</span>
          </h1>

          <div className="h-20 flex items-start pt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-white/60 font-light max-w-lg leading-relaxed"
              >
                {quotes[quoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#contact" 
              onMouseEnter={() => soundManager.play('hover')}
              onClick={() => soundManager.play('tap')}
              className="group relative px-8 py-4 platinum-btn rounded-full overflow-hidden transition-all flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#work" 
              onMouseEnter={() => soundManager.play('hover')}
              onClick={() => soundManager.play('tap')}
              className="group px-8 py-4 platinum-btn rounded-full flex items-center gap-2"
            >
              <Play size={18} className="fill-black group-hover:fill-black transition-colors" />
              View Portfolio
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Animated Frame */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl p-[2px] overflow-hidden group">
            {/* Spinning Gradient Border */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,1)_360deg)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,transparent_0_340deg,rgba(255,255,255,1)_360deg)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Inner Content */}
            <div className="relative w-full h-full bg-[#0a0a0a] rounded-[22px] overflow-hidden">
              <img 
                src="https://drive.google.com/thumbnail?id=1YAV1L9TRahKKAXJkCUNbzyxdOAPzO6Ec&sz=w1000" 
                alt="Anuroop Batta - Founder" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">Anuroop Batta</p>
                    <p className="text-white/50 text-xs">Founder, LUME</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
