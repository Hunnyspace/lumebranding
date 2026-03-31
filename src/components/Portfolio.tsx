import React, { useState, useEffect } from 'react';
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
    website: 'https://pranavadvancedhomeopathy.com/',
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
    logo: '/preschool-logo.jpg',
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
  { 
    id: 8, 
    title: 'The Skin 1st Clinic', 
    category: 'Healthcare', 
    image: '/skinfirst1.png', 
    logo: 'https://drive.google.com/thumbnail?id=1J00Npebg84oTa9Ut8Vk-h_4ATaBs03_n&sz=w1000',
    logoBg: 'bg-black',
    website: 'https://theskin1stclinic.netlify.app/',
    director: {
      name: 'Dr. Sharmila Nayak',
      image: 'https://drive.google.com/thumbnail?id=1XixmewHFIKaRHVwDOE-BaBjfSoUev_VR&sz=w500',
      role: 'Cosmetic Dermatologist'
    },
    review: "Dr. Sharmila Nayak is a Cosmetic Dermatologist specializing in facial sculpting, injectables, and regenerative treatments.",
    stats: ['Facial Sculpting', 'Injectables', 'Regenerative Treatments'],
    gallery: [
      '/skinfirst1.png',
      '/skinfirst2.png.png',
      '/skinfirst3.png.png',
      '/skinfirst4.png.png',
      '/skinfirst5.png.png',
      '/skinfirst6.png.png'
    ],
    igEmbed: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DWhk5Z4k9sV/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DWhk5Z4k9sV/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DWhk5Z4k9sV/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by LUME BRANDING (@lume.vizag)</a></p></div></blockquote>`
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProject?.igEmbed) {
      if (!document.getElementById('ig-embed-script')) {
        const script = document.createElement('script');
        script.id = 'ig-embed-script';
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      } else if ((window as any).instgrm) {
        setTimeout(() => {
          (window as any).instgrm.Embeds.process();
        }, 100);
      }
    }
  }, [selectedProject]);

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
                    <div className={`absolute top-4 left-4 rounded-xl p-2 shadow-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 ${project.logoBg || 'bg-white'}`}>
                      {project.logo && (
                        <img 
                          src={project.logo} 
                          alt={`${project.title} logo`} 
                          className="w-16 h-auto object-contain max-h-8" 
                          referrerPolicy="no-referrer"
                        />
                      )}
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
                className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[80vh]"
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
                <div className="w-full md:w-3/5 h-[40vh] md:h-full min-h-[300px] relative bg-black flex items-center justify-center group/gallery">
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
                <div className="w-full md:w-2/5 flex-1 p-8 md:p-12 overflow-y-auto border-l border-white/5">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/60 mb-4 inline-block border border-white/10">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{selectedProject.title}</h3>
                  
                  <div className="space-y-8">
                    {selectedProject.website && (
                      <a 
                        href={selectedProject.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                      >
                        Visit Website <span className="text-lg">↗</span>
                      </a>
                    )}
                    
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

                    {selectedProject.igEmbed && (
                      <div 
                        className="w-full flex justify-center bg-white/5 rounded-2xl p-4"
                        dangerouslySetInnerHTML={{ __html: selectedProject.igEmbed }}
                      />
                    )}

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
