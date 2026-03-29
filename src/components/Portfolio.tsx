import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundManager } from '../lib/sounds';

const categories = ['All', 'Education', 'Beauty', 'Healthcare'];

const projects = [
  { 
    id: 1, 
    title: 'Ortus Nursing College', 
    category: 'Education', 
    image: 'https://drive.google.com/thumbnail?id=13xDjRLeMdjaZu_QvOdR9G7FHPGly0RRv&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=1c8eEGq_hxVRCfcTxQV-HtPhQlFV8a6TU&sz=w500',
    director: {
      name: 'Swathi Thakasi',
      image: 'https://drive.google.com/thumbnail?id=1nLnLXCLgBt3thKcVXFuvv60g9HGKluUs&sz=w500',
      role: 'Director'
    },
    review: "LUME Branding transformed our digital presence. Their strategic approach perfectly captured our institution's ethos.",
    stats: ['300% Enrollment Growth', 'Digital First Brand', 'Premium Identity'],
    gallery: [
      'https://drive.google.com/thumbnail?id=13xDjRLeMdjaZu_QvOdR9G7FHPGly0RRv&sz=w1000',
      'https://drive.google.com/thumbnail?id=1zcn1NbYvxcKDOeilvziqr1fSWAq-UsCH&sz=w1000',
      'https://drive.google.com/thumbnail?id=1nEBtyQhwPvRxhP9UpY8M4wNGU_6QBlgM&sz=w1000',
      'https://drive.google.com/thumbnail?id=1fkeCgZvPtiLoew2i_bimgoZBzeWPyuP3&sz=w1000',
      'https://drive.google.com/thumbnail?id=1yX2kXBfVkum7ig-bgyNH41BzpCw2dlnu&sz=w1000',
      'https://drive.google.com/thumbnail?id=1cTyNm11Mz5zU9orip1yzt2cfl3-EIkuL&sz=w1000',
      'https://drive.google.com/thumbnail?id=13flSV496_Vl_F1iNuRZzRyhVXIpx4vb3&sz=w1000',
      'https://drive.google.com/thumbnail?id=1ED_ROnULYb-fw558w8-s7glXb4zXzIly&sz=w1000',
      'https://drive.google.com/thumbnail?id=1z3h2QLFfa54i1v0T1x-LeovwmNy3iChn&sz=w1000'
    ]
  },
  { 
    id: 2, 
    title: 'Pranathi’s Beauty Zone', 
    category: 'Beauty', 
    image: 'https://drive.google.com/thumbnail?id=1HY9VpcDLQ552Lfw-baXRiKWhOsSIjPf0&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=1c_KXKByZIjhJ8cShiieDAlwWyNA9cEwq&sz=w500',
    director: {
      name: 'Pranathi',
      image: 'https://drive.google.com/thumbnail?id=1EvmfygBWmmgP3Yq-YijCibLatf3WUF04&sz=w500',
      role: 'Founder'
    },
    review: "The level of detail and premium feel they brought to our brand is unmatched. Highly recommended.",
    stats: ['Visual Excellence', 'Social Media Dominance', 'Luxury Positioning'],
    gallery: [
      'https://drive.google.com/thumbnail?id=1HY9VpcDLQ552Lfw-baXRiKWhOsSIjPf0&sz=w1000',
      'https://drive.google.com/thumbnail?id=1UQlIVVFgNF6BRwxi-b_f8rlXeA-P3ir_&sz=w1000',
      'https://drive.google.com/thumbnail?id=1tKYyeKYS1Ci1TWv3STrmiHvbFqAk_aeu&sz=w1000',
      'https://drive.google.com/thumbnail?id=17fMWpLx78LvELRIYzWugPOPCpyBdLyWi&sz=w1000',
      'https://drive.google.com/thumbnail?id=1PGVI0S35zbU6Nw-Shi2Vwhp_WTLPol_X&sz=w1000',
      'https://drive.google.com/thumbnail?id=1ZRhxhYwvzTP9N0F1b4j5w6Pckaen34pT&sz=w1000',
      'https://drive.google.com/thumbnail?id=14HLG4RcsSHVx9y3u-1HYPxzJndcn0xZC&sz=w1000',
      'https://drive.google.com/thumbnail?id=1po8qgkwwevU4IoO5qk8zDqayDwYpYan8&sz=w1000'
    ]
  },
  { 
    id: 3, 
    title: 'Pranav Advanced Homoeopathy', 
    category: 'Healthcare', 
    image: 'https://drive.google.com/thumbnail?id=1RoXBpelBbM-iY-H3uUFjcfazdA_XRUkO&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=16LOykQHt1yylomq-Tu7Zl4DJX100U5xK&sz=w500',
    director: {
      name: 'Pranav Management',
      image: '', // Not available
      role: 'Chief Physician'
    },
    review: "A seamless experience from start to finish. Our patient engagement has doubled since the rebrand.",
    stats: ['Patient Trust Built', 'Modern Healthcare UX', 'Strategic Growth'],
    gallery: [
      'https://drive.google.com/thumbnail?id=1RoXBpelBbM-iY-H3uUFjcfazdA_XRUkO&sz=w1000',
      'https://drive.google.com/thumbnail?id=1HFUFU7wEgQdngXkciNWIMmNMIwwhUQlv&sz=w1000',
      'https://drive.google.com/thumbnail?id=1ZtwRDXe_x6XMZTIVKHC9k8UL58mqBy-H&sz=w1000',
      'https://drive.google.com/thumbnail?id=1oq4952tI2A-o1lJAtJdXGkKlWSVi9iR-&sz=w1000',
      'https://drive.google.com/thumbnail?id=1L1ur4DlWzwUGAuUwfT83Pz47zJhRDL2x&sz=w1000',
      'https://drive.google.com/thumbnail?id=1a8_yTamYpJQgb8FmLh7-4Bohj-WBpOt0&sz=w1000',
      'https://drive.google.com/thumbnail?id=15rY8Pex1qm3hUlORJO3qzGeMpYROa0VV&sz=w1000',
      'https://drive.google.com/thumbnail?id=1SFvtr01Spg4sqZ1WlPo0TS4g75MqZOT0&sz=w1000'
    ]
  },
  { 
    id: 4, 
    title: 'Aroma Beauty Parlour', 
    category: 'Beauty', 
    image: 'https://drive.google.com/thumbnail?id=1NkGWRTxN6QJC6xomFwuqJqBrYo2tx4qr&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=1QJb69gXrE4hRmTnwd3W4Lof_Y23VRrZw&sz=w500',
    director: {
      name: 'Aroma Management',
      image: '', // Not available
      role: 'Management'
    },
    review: "They understood our vision perfectly and executed it with flawless precision.",
    stats: ['Brand Refresh', 'Customer Loyalty', 'Elegant Design'],
    gallery: [
      'https://drive.google.com/thumbnail?id=1NkGWRTxN6QJC6xomFwuqJqBrYo2tx4qr&sz=w1000',
      'https://drive.google.com/thumbnail?id=135nKPZrtH6WWeIp57M7ZAkEiVt6xJd0f&sz=w1000',
      'https://drive.google.com/thumbnail?id=1Oqgis-w5Fdp9wYLFqC-5DbL3j1R9CK1V&sz=w1000',
      'https://drive.google.com/thumbnail?id=1Fs1_15pMNiZXzejpLbxpBkY-XQ509Tf2&sz=w1000',
      'https://drive.google.com/thumbnail?id=1BVnJGEMLYPa_R7Qj_zxK5SHU43U3mtwR&sz=w1000',
      'https://drive.google.com/thumbnail?id=16KJTii8Q01sJn4Pn-08MEWMjUKbw8ZVa&sz=w1000'
    ]
  },
  { 
    id: 5, 
    title: "Helen O'Grady International Preschool",
    category: 'Education', 
    image: 'https://drive.google.com/thumbnail?id=1YravZP9shbAQ-ALIY5jryBK02QWSjqvO&sz=w1000', 
    logo: '/preschool-logo.png',
    director: {
      name: 'Arpita Mittal',
      image: 'https://drive.google.com/thumbnail?id=11ukvWBrthmRZkLj4t9nQx4nPZNmRrTVS&sz=w500',
      role: 'Principal'
    },
    review: "A brilliant team that knows how to connect with the audience. The new website is a hit with parents.",
    stats: ['Global Standards', 'Parent Engagement', 'Playful Identity'],
    gallery: [
      'https://drive.google.com/thumbnail?id=1YravZP9shbAQ-ALIY5jryBK02QWSjqvO&sz=w1000',
      'https://drive.google.com/thumbnail?id=106xB92d4EGU0a5NVTLUKOkfW9fAhpklr&sz=w1000',
      'https://drive.google.com/thumbnail?id=1X4r4YMOaSpbIWh_AyIPlyLt1QzYUbGkJ&sz=w1000',
      'https://drive.google.com/thumbnail?id=1pUq0CeyWKz8KO2SDUYaVLf8jceM0Ik6y&sz=w1000',
      'https://drive.google.com/thumbnail?id=19k3NLIxKQnqZPVH__MJtN4EuSQod7P8l&sz=w1000',
      'https://drive.google.com/thumbnail?id=1HRVYCwBVwBqtcV5cNfTTb_7Dt4ROPVPw&sz=w1000',
      'https://drive.google.com/thumbnail?id=1nBiyfH110UskftAPKSwi5UeFtj9AZUPw&sz=w1000',
      'https://drive.google.com/thumbnail?id=1n1e_lFGD0iZpZRgWBae8w1XUCoq2RFsm&sz=w1000',
      'https://drive.google.com/thumbnail?id=1S_tj6oqtv8cearOv04siJHlvBYSfLjE5&sz=w1000'
    ]
  },
  { 
    id: 6, 
    title: 'Syamala Homoeopathy Hospital', 
    category: 'Healthcare', 
    image: 'https://drive.google.com/thumbnail?id=1nHSoc1BNbmaGZ0f04AXMLykpYIkCclVs&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=1nHSoc1BNbmaGZ0f04AXMLykpYIkCclVs&sz=w500',
    director: {
      name: 'Dr. Sudeepthi',
      image: 'https://drive.google.com/thumbnail?id=1RDENcloSgUITjJ3HOGEuzMbARm-8qlJl&sz=w500',
      role: 'Founder'
    },
    review: "Professional, creative, and highly effective. They elevated our clinic's digital identity.",
    stats: ['Clinical Excellence', 'Digital Transformation', 'Patient Care Focus'],
    gallery: ['https://drive.google.com/thumbnail?id=1nHSoc1BNbmaGZ0f04AXMLykpYIkCclVs&sz=w1000']
  },
  { 
    id: 7, 
    title: 'Nucleus International School', 
    category: 'Education', 
    image: 'https://drive.google.com/thumbnail?id=1owZZ2q_oSQlMV2rqkNe9XBMq7TCqZKaw&sz=w1000', 
    logo: 'https://drive.google.com/thumbnail?id=1owZZ2q_oSQlMV2rqkNe9XBMq7TCqZKaw&sz=w500',
    director: {
      name: 'Madhuri',
      image: '', // Not available
      role: 'Director'
    },
    review: "An absolute pleasure to work with. They delivered a world-class platform for our international audience.",
    stats: ['Academic Excellence', 'Global Reach', 'Modern Education'],
    gallery: ['https://drive.google.com/thumbnail?id=1owZZ2q_oSQlMV2rqkNe9XBMq7TCqZKaw&sz=w1000']
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: any) => {
    if (window.innerWidth < 768) {
      if (activeProjectId === project.id) {
        // If already active, open case study
        soundManager.play('tap');
        setSelectedProject(project);
        setCurrentGalleryIndex(0);
        setActiveProjectId(null);
      } else {
        // Just activate hover state
        soundManager.play('hover');
        setActiveProjectId(project.id);
      }
    } else {
      // Desktop behavior
      soundManager.play('tap');
      setSelectedProject(project);
      setCurrentGalleryIndex(0);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    setCurrentGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    setCurrentGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  return (
    <section id="work" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 light-rays-text">Selected Work</h2>
            <p className="text-white/50 max-w-md">
              A showcase of brands we've engineered for dominance.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onMouseEnter={() => soundManager.play('hover')}
                onClick={() => {
                  soundManager.play('tap');
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'platinum-btn' 
                    : 'glass border border-white/10 text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`group relative flex flex-col gap-6 cursor-pointer transition-all duration-300 ${activeProjectId === project.id ? 'scale-[1.02]' : ''}`}
                onClick={() => handleProjectClick(project)}
              >
                {/* Browser Mockup Frame */}
                <div className="relative rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl shadow-black/50">
                  {/* Browser Header */}
                  <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="mx-auto bg-black/30 rounded-md px-3 py-1 text-[10px] text-white/40 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
                      {project.title.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                  
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Logo Overlay */}
                    <div className="absolute top-4 left-4 bg-white rounded-xl p-2 shadow-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <img 
                        src={project.logo} 
                        alt={`${project.title} logo`} 
                        className="w-16 h-auto object-contain max-h-8" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent transition-opacity duration-500 flex flex-col justify-end p-8 ${activeProjectId === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <div className={`transition-transform duration-500 ${activeProjectId === project.id ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/80 mb-3 inline-block border border-white/10">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-heading font-bold text-white mb-4">{project.title}</h3>
                        <div className="px-6 py-2 rounded-full platinum-btn text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 w-fit">
                          View Case Study <span className="text-lg">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Section */}
                {project.director && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/40 to-transparent"></div>
                    <p className="text-white/80 italic text-sm md:text-base leading-relaxed mb-6">
                      "{project.review}"
                    </p>
                    <div className="flex items-center gap-4">
                      {project.director.image ? (
                        <img 
                          src={project.director.image} 
                          alt={project.director.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
                          <span className="text-white/20 text-xl">👤</span>
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium text-sm">{project.director.name}</p>
                        <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{project.director.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => {
                    soundManager.play('tap');
                    setSelectedProject(null);
                  }}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>

                {/* Gallery Section */}
                <div className="w-full md:w-3/5 h-[400px] md:h-auto relative bg-black flex items-center justify-center group/gallery">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentGalleryIndex}
                      src={selectedProject.gallery[currentGalleryIndex]} 
                      alt={`${selectedProject.title} gallery ${currentGalleryIndex + 1}`} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          soundManager.play('tap');
                          prevImage(e);
                        }}
                        className="absolute left-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => {
                          soundManager.play('tap');
                          nextImage(e);
                        }}
                        className="absolute right-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.gallery.map((_: any, i: number) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentGalleryIndex ? 'bg-white w-6' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto border-l border-white/5">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/60 mb-4 inline-block border border-white/10">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{selectedProject.title}</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Award size={14} /> Key Achievements
                      </h4>
                      <div className="grid gap-3">
                        {selectedProject.stats.map((stat: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 text-white/80">
                            <CheckCircle2 size={16} className="text-green-500/60" />
                            <span className="text-sm">{stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-white/5">
                      <p className="text-white/70 italic text-sm leading-relaxed mb-6">
                        "{selectedProject.review}"
                      </p>
                      <div className="flex items-center gap-4">
                        {selectedProject.director.image ? (
                          <img 
                            src={selectedProject.director.image} 
                            alt={selectedProject.director.name} 
                            className="w-10 h-10 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 text-sm">👤</span>
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium text-sm">{selectedProject.director.name}</p>
                          <p className="text-white/40 text-xs uppercase tracking-wider">{selectedProject.director.role}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onMouseEnter={() => soundManager.play('hover')}
                      onClick={(e) => {
                        soundManager.play('tap');
                        nextImage(e);
                      }}
                      className="w-full py-4 rounded-xl platinum-btn flex items-center justify-center gap-2"
                    >
                      Show Next Image <ImageIcon size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
