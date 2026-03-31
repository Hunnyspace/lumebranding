import { motion } from 'motion/react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

const clientLogos = [
  { name: 'Ortus Nursing College', url: 'https://drive.google.com/thumbnail?id=1c8eEGq_hxVRCfcTxQV-HtPhQlFV8a6TU&sz=w500' },
  { name: 'Pranathi’s Beauty Zone', url: 'https://drive.google.com/thumbnail?id=1c_KXKByZIjhJ8cShiieDAlwWyNA9cEwq&sz=w500' },
  { name: 'Pranav Advanced Homoeopathy', url: 'https://drive.google.com/thumbnail?id=16LOykQHt1yylomq-Tu7Zl4DJX100U5xK&sz=w500' },
  { name: 'Aroma Beauty Parlour', url: 'https://drive.google.com/thumbnail?id=1QJb69gXrE4hRmTnwd3W4Lof_Y23VRrZw&sz=w500' },
  { name: 'Helen O’Grady', url: 'https://drive.google.com/thumbnail?id=1b_KSc9jHdwRfk2YCceXklwhEcCaG4AT_&sz=w500' },
  { name: 'Syamala Homoeopathy', url: 'https://drive.google.com/thumbnail?id=1nHSoc1BNbmaGZ0f04AXMLykpYIkCclVs&sz=w500' },
  { name: 'Nucleus International', url: 'https://drive.google.com/thumbnail?id=1owZZ2q_oSQlMV2rqkNe9XBMq7TCqZKaw&sz=w500' },
  { name: 'The Skin 1st Clinic', url: 'https://drive.google.com/thumbnail?id=1J00Npebg84oTa9Ut8Vk-h_4ATaBs03_n&sz=w500', bg: 'bg-black' },
];

export default function SocialProof() {
  const socials = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/anuroopbatta99',
      followers: '1.5K+',
      label: 'Followers'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      url: 'https://www.instagram.com/thecommittedceo/',
      followers: '1.7K+',
      label: 'Followers'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: 'https://www.facebook.com/thathunnyguy/',
      followers: 'Community',
      label: 'Active'
    }
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-black/50 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest text-center light-rays-text whitespace-nowrap">
            Trusted by a growing community
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex items-center gap-4 hover-glow p-3 rounded-2xl transition-all"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all">
                  {social.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg leading-tight group-hover:text-glow transition-all">
                    {social.followers}
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">
                    {social.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Marquee */}
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee flex items-center gap-20 whitespace-nowrap">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
            <div key={index} className="flex items-center gap-6 group px-4">
              {/* Background Frame */}
              <div className={`${logo.bg || 'bg-white'} p-3 md:p-4 rounded-xl shadow-lg shadow-black/20 flex items-center justify-center h-14 md:h-20 w-auto min-w-[100px] transition-transform duration-500 group-hover:scale-105`}>
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Subtle Brand Name */}
              <span className="text-white/20 font-heading font-medium text-sm md:text-base group-hover:text-white/50 transition-colors uppercase tracking-[0.2em] whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
