import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Video, Instagram, Youtube, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { soundManager } from '../lib/sounds';

export default function Creators() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'Instagram',
    username: '',
    followers: '',
    niche: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.play('tap');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycbxeZosk03CpCyeRPnUW1yDW6xwfSVjnnwLyJUsxR1Ufxaj7h_1GxiANh8RjNyBjCkGfTw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          formType: 'creator',
          name: formData.name,
          email: formData.email,
          platform: formData.platform,
          username: formData.username,
          followers: formData.followers,
          niche: formData.niche
        })
      });
      
      soundManager.play('success');
      setSubmitStatus('success');
      
      // Generate PDF
      const doc = new jsPDF();
      
      // Add Header
      doc.setFillColor(5, 5, 5);
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('LUME BRANDING', 20, 25);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Creator Application', 140, 25);
      
      doc.setTextColor(100, 100, 100);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      
      let yPos = 75;
      const lineHeight = 7;
      const valueX = 50;
      const maxLineWidth = 140;
      
      const addField = (label: string, value: string) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}:`, 20, yPos);
        doc.setFont('helvetica', 'normal');
        
        const splitText = doc.splitTextToSize(value || 'N/A', maxLineWidth);
        doc.text(splitText, valueX, yPos);
        yPos += (splitText.length * lineHeight) + 5;
      };
      
      addField('Name', formData.name);
      addField('Email', formData.email);
      addField('Platform', formData.platform);
      addField('Username', formData.username);
      addField('Followers', formData.followers);
      addField('Niche', formData.niche);
      
      // Add Legal Terms
      yPos += 10;
      if (yPos > 220) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, 190, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'bold');
      doc.text('Terms & Conditions:', 20, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const terms = [
        "1. Submission of this application does not guarantee acceptance into the LUME Branding creator network.",
        "2. LUME Branding will review the application and contact the creator if there is a mutual fit.",
        "3. Any future collaborations or partnerships will be subject to a separate, formal agreement.",
        "4. The information provided will be used solely for evaluating potential collaborations and will not be shared with third parties without consent."
      ];
      
      terms.forEach(term => {
        const splitTerm = doc.splitTextToSize(term, 170);
        doc.text(splitTerm, 20, yPos);
        yPos += (splitTerm.length * 4) + 2;
      });
      
      doc.save(`LUME_Creator_${formData.name.replace(/\s+/g, '_')}.pdf`);

      setFormData({
        name: '',
        email: '',
        platform: 'Instagram',
        username: '',
        followers: '',
        niche: ''
      });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="creators" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Video size={14} className="text-white/70" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">Creator Network</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 light-rays-text">
            Calling All Content Creators
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Are you a vlogger, influencer, or content creator? We're looking for talented individuals to collaborate with our brands. Submit your details below to join our verified creator network.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 md:p-12 relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-all"
                  placeholder="Enter your professional email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Primary Platform</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'Instagram'})}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      formData.platform === 'Instagram' 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <Instagram size={16} /> Instagram
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'YouTube'})}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      formData.platform === 'YouTube' 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <Youtube size={16} /> YouTube
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Username / Handle</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                  <input 
                    type="text" 
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white focus:outline-none focus:border-white/50 transition-all"
                    placeholder="yourusername"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Follower Count</label>
                <input 
                  type="text" 
                  required
                  value={formData.followers}
                  onChange={(e) => setFormData({...formData, followers: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-all"
                  placeholder="e.g., 50k, 1M+"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Content Niche</label>
                <input 
                  type="text" 
                  required
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/50 transition-all"
                  placeholder="e.g., Tech, Lifestyle, Fashion"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>We verify all creator profiles before onboarding.</span>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  submitStatus === 'success' ? 'bg-green-500 text-white' : 'platinum-btn text-black'
                } disabled:opacity-70`}
              >
                {isSubmitting ? 'Submitting...' : 
                 submitStatus === 'success' ? 'Application Received!' : 
                 submitStatus === 'error' ? 'Error. Try Again.' : 
                 <>Submit Application <ArrowRight size={18} /></>}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}
