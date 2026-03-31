import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, IndianRupee, Users, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { soundManager } from '../lib/sounds';

export default function ReferAndEarn() {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerContact: '',
    upiId: '',
    referredBusinessName: '',
    referredBusinessType: '',
    additionalNotes: ''
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
          formType: 'referral',
          name: formData.referrerName,
          contact: formData.referrerContact,
          upiId: formData.upiId,
          referredBusiness: formData.referredBusinessName,
          businessType: formData.referredBusinessType,
          notes: formData.additionalNotes
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
      doc.text('Referral Submission', 140, 25);
      
      doc.setTextColor(100, 100, 100);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      
      let yPos = 75;
      const lineHeight = 7;
      const valueX = 70;
      const maxLineWidth = 120;
      
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
      
      addField('Referrer Name', formData.referrerName);
      addField('Contact', formData.referrerContact);
      addField('UPI ID', formData.upiId);
      addField('Referred Business', formData.referredBusinessName);
      addField('Business Type', formData.referredBusinessType);
      addField('Notes', formData.additionalNotes);
      
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
        "1. Referral commissions are subject to the successful signing of a contract and receipt of the first payment from the referred client.",
        "2. LUME Branding reserves the right to determine the eligibility of any referral.",
        "3. This document serves as a record of submission and does not constitute a legally binding contract for payment until the referral conditions are met.",
        "4. Information provided in this form will be kept confidential and used solely for the purpose of the referral program."
      ];
      
      terms.forEach(term => {
        const splitTerm = doc.splitTextToSize(term, 170);
        doc.text(splitTerm, 20, yPos);
        yPos += (splitTerm.length * 4) + 2;
      });
      
      doc.save(`LUME_Referral_${formData.referrerName.replace(/\s+/g, '_')}.pdf`);

      setFormData({
        referrerName: '',
        referrerContact: '',
        upiId: '',
        referredBusinessName: '',
        referredBusinessType: '',
        additionalNotes: ''
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
    <section id="refer-earn" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles size={14} className="text-white/70" />
              <span className="text-xs font-medium uppercase tracking-wider text-white/70">Partnership Program</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Refer & <span className="light-rays-text">Earn</span>
            </h2>
            
            <p className="text-white/50 text-lg mb-10 max-w-lg">
              Know a business that needs a brand transformation? Refer them to LUME and earn a commission when they sign up. We value your network.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">1. Connect Us</h4>
                  <p className="text-white/50">Fill out the form with your details and the business you are referring to us.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <IndianRupee size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">2. Get Rewarded</h4>
                  <p className="text-white/50">Once the project kicks off, we'll transfer the commission directly to your provided UPI ID.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Your Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.referrerName}
                      onChange={(e) => setFormData({...formData, referrerName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Your Contact Info</label>
                    <input 
                      type="text" 
                      required
                      value={formData.referrerContact}
                      onChange={(e) => setFormData({...formData, referrerContact: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm"
                      placeholder="Email or Phone Number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Your UPI ID (For Payout)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.upiId}
                    onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm"
                    placeholder="example@upi"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-xl font-bold border-b border-white/10 pb-4">Referral Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Referred Business Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.referredBusinessName}
                      onChange={(e) => setFormData({...formData, referredBusinessName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Type of Business</label>
                    <input 
                      type="text" 
                      required
                      value={formData.referredBusinessType}
                      onChange={(e) => setFormData({...formData, referredBusinessType: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm"
                      placeholder="e.g., E-commerce, Real Estate"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Additional Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-all text-sm resize-none"
                    placeholder="Any context about this referral?"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 transition-all ${
                  submitStatus === 'success' ? 'bg-green-500 text-white' : 'platinum-btn text-black'
                } disabled:opacity-70`}
              >
                {isSubmitting ? 'Submitting...' : 
                 submitStatus === 'success' ? 'Submitted Successfully!' : 
                 submitStatus === 'error' ? 'Error. Try Again.' : 
                 <>Submit Referral <ArrowRight size={18} /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
