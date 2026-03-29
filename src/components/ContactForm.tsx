import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../lib/sounds';

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Services' },
  { id: 3, title: 'Budget' },
  { id: 4, title: 'Timing' },
  { id: 5, title: 'Details' }
];

const servicesList = [
  'Branding & Identity',
  'Social Media Strategy',
  'Content Creation',
  'Website Design',
  'Performance Marketing'
];

const budgetRanges = ['5K–10K', '10K–25K', '25K+'];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    services: [] as string[],
    budget: '',
    callTime: '',
    description: ''
  });

  const handleNext = () => {
    soundManager.play('tap');
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    soundManager.play('tap');
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const toggleService = (service: string) => {
    soundManager.play('tap');
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.play('success');
    
    const message = `Hey LUME Branding! I'm interested in starting a project.
    
*Name:* ${formData.name}
*Business:* ${formData.businessName}
*Services:* ${formData.services.join(', ')}
*Budget:* ${formData.budget}
*Preferred Call Time:* ${formData.callTime}

*Project Details:*
${formData.description}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9154276077?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 light-rays-text">
            Let's Build Something That Prints Money.
          </h2>
          <p className="text-white/50 text-lg">
            Tell us about your vision, and we'll engineer the attention it deserves.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-12 relative">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10 -translate-y-1/2"></div>
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  currentStep >= step.id ? 'text-white' : 'text-white/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                  currentStep >= step.id ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-[#1a1a1a] border border-white/10'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-grow"
              >
                {/* Step 1: Basics */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">Let's start with the basics.</h3>
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-2">Business Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Services */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">What do you need help with?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {servicesList.map(service => (
                        <button
                          key={service}
                          type="button"
                          onMouseEnter={() => soundManager.play('hover')}
                          onClick={() => toggleService(service)}
                          className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                            formData.services.includes(service)
                              ? 'platinum-btn shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">What's your budget range?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {budgetRanges.map(range => (
                        <button
                          key={range}
                          type="button"
                          onMouseEnter={() => soundManager.play('hover')}
                          onClick={() => {
                            soundManager.play('tap');
                            setFormData({...formData, budget: range});
                          }}
                          className={`p-6 rounded-xl border text-center text-lg font-medium transition-all duration-300 ${
                            formData.budget === range
                              ? 'platinum-btn shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Timing */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">When is a good time to call?</h3>
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-2">Preferred Call Time (IST)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.callTime}
                        onChange={(e) => setFormData({...formData, callTime: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all"
                        placeholder="e.g., Tomorrow at 2 PM"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Details */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold mb-6">Tell us about the project.</h3>
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-2">Project Description</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all resize-none"
                        placeholder="Briefly describe your goals, target audience, and current challenges..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full text-white/50 hover:text-white transition-colors font-medium"
                >
                  Back
                </button>
              ) : <div></div>}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.businessName)) ||
                    (currentStep === 2 && formData.services.length === 0) ||
                    (currentStep === 3 && !formData.budget) ||
                    (currentStep === 4 && !formData.callTime)
                  }
                  className="flex items-center gap-2 px-8 py-3 platinum-btn rounded-full transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.description}
                  className="flex items-center gap-2 px-8 py-3 platinum-btn rounded-full transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Submit via WhatsApp <ArrowRight size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
