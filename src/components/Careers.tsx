import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, UserPlus, Sparkles } from 'lucide-react';

export default function Careers() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:anuroopbatta99@gmail.com?subject=Creative Partner Application - ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="careers" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 light-rays-text">
              Join the <br />
              <span className="platinum-text-shift">LUME Legacy</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles size={48} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <UserPlus className="text-white/60" size={20} /> Creative Partner
                </h3>
                <p className="text-white/60 mb-4">
                  We are looking for a visionary creative partner to help scale LUME to new heights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 text-xs font-medium text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <MapPin size={12} /> Vizag, India
                  </span>
                  <span className="flex items-center gap-2 text-xs font-medium text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    Female Candidate Preferred
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white/50 leading-relaxed max-w-md">
              At LUME, we don't just hire employees; we build partnerships. If you have the intensity, the discipline, and the creative fire, we want you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-[2rem]"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Apply for Partnership</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-1">Why you?</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your creative fire..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-5 rounded-2xl platinum-btn font-bold text-lg flex items-center justify-center gap-3 group"
              >
                Send Application <Mail className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
