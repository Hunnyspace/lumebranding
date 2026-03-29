import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Gift, Sparkles, MessageSquareQuote } from 'lucide-react';
import { soundManager } from '../lib/sounds';

export default function GreetingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    contact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenModal = localStorage.getItem('hasSeenGreeting');
      if (!hasSeenModal) {
        setIsOpen(true);
        soundManager.play('success');
      }
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenGreeting', 'true');
    soundManager.play('tap');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.play('success');
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={24} />
            </button>

            <div className="p-12 md:p-16">
              {!isSubmitted ? (
                <div className="space-y-12">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 overflow-hidden shadow-2xl">
                      <img 
                        src="https://drive.google.com/thumbnail?id=1YAV1L9TRahKKAXJkCUNbzyxdOAPzO6Ec&sz=w100" 
                        alt="Anuroop" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold tracking-tight">Anuroop Batta</h3>
                      <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-semibold">Founder, LUME</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute -top-6 -left-6 opacity-5">
                        <MessageSquareQuote size={80} />
                      </div>
                      <p className="text-3xl md:text-4xl font-heading font-bold text-white leading-[1.1] tracking-tight max-w-lg">
                        "Welcome to LUME. We're looking for 3 ambitious brands to transform this month—for free."
                      </p>
                    </div>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
                      I personally select a few limited slots each month to help visionaries build a legacy. Drop your details below to see if we're a fit.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 pt-10 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Business Name</label>
                        <input 
                          required
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          placeholder="Your brand name"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 text-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">Contact Info</label>
                        <input 
                          required
                          type="text"
                          value={formData.contact}
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          placeholder="Email or Phone"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 text-lg"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full platinum-btn py-6 rounded-2xl font-bold text-black text-lg flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-2xl shadow-white/5"
                    >
                      Apply for Free Branding <Sparkles size={24} />
                    </button>
                    <p className="text-[11px] text-center text-white/20 uppercase tracking-[0.3em] font-semibold">
                      Limited to 3 slots per month • Selection based on vision
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <Sparkles size={40} className="text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-bold text-white">Application Received</h3>
                    <p className="text-white/50">
                      Anuroop will personally review your vision for <span className="text-white font-bold">{formData.businessName}</span>. We'll be in touch soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Decorative Bottom Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
