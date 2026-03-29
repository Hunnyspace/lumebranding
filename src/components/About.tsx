import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

const storySequence = [
  "I'm Anuroop Batta — Founder of LUME Branding.",
  "A Certified VFX Compositor from Arena Animations.",
  "Have you ever faced a moment that forced you to choose between breaking down or building up?",
  "From surviving personal losses in childhood to navigating life's toughest phases...",
  "I chose discipline over distraction.",
  "Every brand I build carries that exact intensity and resilience.",
  "This isn't just design. This is identity engineering."
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storySequence.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="founder" className="relative py-32 overflow-hidden bg-[#050505] min-h-[80vh] flex items-center">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center gap-12">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40 light-rays-text">
              The Mind Behind LUME
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
          </div>

          <div className="h-[250px] md:h-[200px] flex flex-col items-center justify-center relative w-full px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`font-light leading-relaxed text-center ${
                  currentIndex === storySequence.length - 1 
                    ? 'font-heading font-bold platinum-text-shift text-4xl md:text-6xl mb-8' 
                    : 'text-2xl md:text-4xl text-white/80'
                }`}
              >
                {storySequence[currentIndex]}
              </motion.p>
            </AnimatePresence>
            
            <AnimatePresence>
              {currentIndex === storySequence.length - 1 && (
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <motion.a
                    href="#work"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="px-8 py-3 platinum-btn rounded-full font-semibold inline-flex items-center gap-2"
                  >
                    Explore Our Work
                  </motion.a>
                  <motion.button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-game'))}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="px-8 py-3 glass rounded-full font-semibold inline-flex items-center gap-2 border border-white/10 hover:bg-white/5 transition-all"
                  >
                    Enter the Mind <Zap size={18} className="text-yellow-500" />
                  </motion.button>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-3 mt-12">
            {storySequence.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/20 w-2 hover:bg-white/50'
                }`} 
                aria-label={`Go to story slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
