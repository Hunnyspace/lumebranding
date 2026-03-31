import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, ChevronDown, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { soundManager } from '../lib/sounds';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      soundManager.play('tap');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase();
    
    // Intent recognition
    if (['creator', 'influencer', 'vlog', 'youtube', 'instagram', 'collab'].some(k => query.includes(k))) {
      navigate('/creators');
    } else if (['refer', 'earn', 'affiliate', 'partner'].some(k => query.includes(k))) {
      navigate('/refer');
    } else if (['job', 'career', 'work', 'hiring'].some(k => query.includes(k))) {
      navigate('/careers');
    } else if (['service', 'brand', 'marketing', 'design', 'web', 'app'].some(k => query.includes(k))) {
      navigate('/services');
    } else {
      navigate('/contact');
    }
    
    setSearchQuery('');
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    soundManager.play('success');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      subItems: [
        { name: 'Branding & Identity', href: '/services#branding-identity' },
        { name: 'Performance Marketing', href: '/services#performance-marketing' },
        { name: 'Web Design', href: '/services#website-design' }
      ]
    },
    { name: 'Work', href: '/work' },
    { 
      name: 'Community', 
      href: '#',
      subItems: [
        { name: 'Creators Network', href: '/creators' },
        { name: 'Refer & Earn', href: '/refer' },
        { name: 'Careers', href: '/careers' }
      ]
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen || isSearchOpen
          ? 'py-4 bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'py-6 bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative group"
              onMouseEnter={() => {
                soundManager.play('hover');
                if (link.subItems) setActiveDropdown(link.name);
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                onClick={() => soundManager.play('tap')}
                className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 ${
                  isScrolled ? 'text-white' : 'text-white/80'
                } hover:text-white`}
              >
                {link.name}
                {link.subItems && <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-transform group-hover:rotate-180" />}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Dropdown Menu */}
              {link.subItems && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                    >
                      {link.subItems.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => {
                            soundManager.play('tap');
                            setActiveDropdown(null);
                          }}
                          className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              soundManager.play('tap');
              setIsSearchOpen(!isSearchOpen);
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link
            to="/contact"
            onMouseEnter={() => soundManager.play('hover')}
            onClick={() => soundManager.play('tap')}
            className="px-6 py-2.5 rounded-full platinum-btn transition-all duration-300 text-sm"
          >
            Start Project
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => {
              soundManager.play('tap');
              setIsSearchOpen(!isSearchOpen);
              setMobileMenuOpen(false);
            }}
            className="text-white/80 hover:text-white"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <button 
            className="text-white"
            onClick={() => {
              soundManager.play('tap');
              setMobileMenuOpen(!mobileMenuOpen);
              setIsSearchOpen(false);
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl"
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search size={20} className="absolute left-4 text-white/40" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for? (e.g., 'marketing', 'creator', 'refer')"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 text-white focus:outline-none focus:border-white/30 transition-all"
                />
                <button 
                  type="button" 
                  onClick={startListening}
                  className={`absolute right-4 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-500' : 'text-white/40 hover:text-white'}`}
                >
                  <Mic size={20} className={isListening ? 'animate-pulse' : ''} />
                </button>
                <button type="submit" className="hidden">Search</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-b border-white/10 p-6 flex flex-col gap-4 md:hidden h-screen shadow-2xl pb-32 overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-2">
                <Link
                  to={link.href}
                  onClick={() => {
                    if (!link.subItems) {
                      soundManager.play('tap');
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-lg font-medium text-white/80 hover:text-white"
                >
                  {link.name}
                </Link>
                {link.subItems && (
                  <div className="pl-4 flex flex-col gap-3 mt-2 border-l border-white/10">
                    {link.subItems.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        onClick={() => {
                          soundManager.play('tap');
                          setMobileMenuOpen(false);
                        }}
                        className="text-sm text-white/50 hover:text-white"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                soundManager.play('tap');
                setMobileMenuOpen(false);
              }}
              className="mt-6 px-6 py-4 text-center rounded-full platinum-btn transition-all duration-300 text-base font-semibold"
            >
              Start Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
