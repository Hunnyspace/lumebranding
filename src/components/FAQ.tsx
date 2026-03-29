import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Why choose LUME Branding?",
    answer: "We don't just create pretty designs; we engineer attention. Our approach is rooted in psychology, strategy, and high-end aesthetics to ensure your brand dominates its market."
  },
  {
    question: "How fast is delivery?",
    answer: "Timelines depend on the project scope. A standard brand identity takes 2-4 weeks, while comprehensive website and performance marketing campaigns may take 4-8 weeks. We prioritize quality over rushed execution."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely. We love partnering with ambitious startups that understand the value of premium branding from day one. We help you look like an industry leader right out of the gate."
  },
  {
    question: "Pricing flexibility?",
    answer: "We offer tailored packages based on your specific needs and goals. While we maintain premium standards, our multi-tiered approach allows us to scale our services to fit different investment levels."
  },
  {
    question: "What makes you different?",
    answer: "Our founder's background in VFX and diverse industries brings a unique, cinematic quality to our work. We combine relentless discipline with high-end creative execution to build brands that print money."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 light-rays-text">Frequently Asked Questions</h2>
          <p className="text-white/50">Everything you need to know about partnering with LUME.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="glass border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium pr-8">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  openIndex === index ? 'platinum-btn' : 'bg-white/5 text-white'
                }`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-white/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
