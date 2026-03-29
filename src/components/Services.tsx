import { motion } from 'motion/react';
import { Palette, Share2, PenTool, Layout, TrendingUp } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Branding & Identity',
      description: 'Crafting unforgettable visual identities that resonate and dominate.',
      icon: <Palette size={24} />
    },
    {
      title: 'Social Media Strategy',
      description: 'Data-driven strategies to scale your presence and engage audiences.',
      icon: <Share2 size={24} />
    },
    {
      title: 'Content Creation',
      description: 'High-end visuals, copy, and multimedia that engineer attention.',
      icon: <PenTool size={24} />
    },
    {
      title: 'Website Design',
      description: 'Immersive, high-converting digital experiences.',
      icon: <Layout size={24} />
    },
    {
      title: 'Performance Marketing',
      description: 'ROI-focused campaigns that drive growth and revenue.',
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 light-rays-text">Our Services</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            We deliver premium solutions tailored to elevate your brand's perception and market value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group glass-panel p-8 rounded-3xl hover-glow transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-glow transition-all">
                {service.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass px-6 py-3 rounded-full border border-white/10">
            <p className="text-white/70 text-sm">
              <span className="text-white font-semibold">Printing Services Coming Soon</span> – For enquiries, DM us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
