import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { soundManager } from '../lib/sounds';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Founder', href: '#founder' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'py-4 bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'py-6 bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home" 
          className="flex items-center gap-3 group"
          onClick={() => soundManager.play('tap')}
        >
          <div className="relative h-8 md:h-10 w-auto overflow-hidden transition-colors">
            <img 
              src="https://drive.google.com/thumbnail?id=1v1MwcKVris98yvhhS4SAoX3qDqckK47i&sz=w1000" 
              alt="LUME Logo" 
              className="h-full w-auto object-contain brightness-125"
              referrerPolicy="no-referrer"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => soundManager.play('hover')}
              onClick={() => soundManager.play('tap')}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                isScrolled ? 'text-white' : 'text-white/80'
              } hover:text-white`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            onMouseEnter={() => soundManager.play('hover')}
            onClick={() => soundManager.play('tap')}
            className="px-6 py-2.5 rounded-full platinum-btn transition-all duration-300 text-sm"
          >
            Start Project
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => {
            soundManager.play('tap');
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}