import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook,
  Youtube,
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Globe, 
  ChevronDown,
  Menu,
  X,
  MapPin,
  Heart,
  Video,
  Camera,
  Film,
  Share2
} from 'lucide-react';
import { translations, Language } from './translations';

const DRIVE_IMAGE_URL = (id: string) => `https://lh3.googleusercontent.com/u/0/d/${id}`;

const SECTIONS = {
  capa: '10GfI8PzCZdSloNSwjC-2aSgQMgguH3oT',
  sobre: '1aLuSCYAoEaugTXkYe8uTocgLK6zGKfbM',
  sobreBg: '1bLFm3ODzMqF1oG9Rkb5p00OLjBye9fSs',
  proposta: '1qYP4h-p3jpwHxgKEKCC0roLWONNDFMLj',
  referencias: '1c_WCYhebQN2m4S4se5ojrCLb3z7XzElm',
  contato: '1vghgJiUG7Xz4V4gC5RONSku_auQ1hKgM',
  instagram: '1te3q1O-10qU6z3RzdXrsENx9iPvoBeEe',
  facebook: '1zvCOxRhZv7qouFLHCzPCWufGozwmX2fg',
  tiktok: '1Lu1lXRzTaCoMgnz2KQM8TsKJ5QBm3yvK',
  youtube: '1hjIvGwCh6rrTXcsBCZMALz6gDaIQwX_c'
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = (newLang: Language) => {
    setLang(newLang);
    setIsMenuOpen(false);
  };

  const SectionTitle = ({ children, light = false, centered = false }: { children: React.ReactNode, light?: boolean, centered?: boolean }) => (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-6xl font-serif mb-8 ${centered ? 'text-center' : 'text-center md:text-left'} ${light ? 'text-white' : 'text-cancun-blue'}`}
    >
      {children}
    </motion.h2>
  );

  return (
    <div className="font-sans selection:bg-cancun-blue selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-2xl font-serif font-bold ${scrolled || isMenuOpen ? 'text-cancun-blue' : 'text-white'}`}
          >
            J&H
          </motion.div>

          {/* Mobile Language Selector (Centered) */}
          <div className="flex lg:hidden items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {(['pt', 'en', 'es'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => toggleLang(l)}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${lang === l ? 'bg-cancun-blue text-white' : scrolled || isMenuOpen ? 'text-gray-500' : 'text-white/70'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <a 
                key={key} 
                href={`#${key}`} 
                className={`text-sm uppercase tracking-widest font-display hover:text-cancun-blue transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {label}
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2 border-l pl-6 border-gray-400/30">
              {(['pt', 'en', 'es'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs font-bold px-2 py-1 rounded transition-all ${lang === l ? 'bg-cancun-blue text-white' : scrolled ? 'text-gray-500 hover:text-cancun-blue' : 'text-white/70 hover:text-white'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled || isMenuOpen ? 'text-gray-800' : 'text-white'} /> : <Menu className={scrolled || isMenuOpen ? 'text-gray-800' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40 lg:hidden"
            />
            {/* Floating Menu Card */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="fixed top-20 left-6 right-6 bg-white/70 backdrop-blur-2xl z-40 flex flex-col items-center py-10 space-y-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 lg:hidden"
            >
              {Object.entries(t.nav).map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-serif text-cancun-blue hover:scale-105 transition-transform"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center md:bg-[10%_center] lg:bg-center bg-no-repeat scale-105 max-md:bg-[15%_center]"
          style={{ backgroundImage: `url(${DRIVE_IMAGE_URL(SECTIONS.capa)})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif text-white mb-4 tracking-tighter">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-display uppercase tracking-[0.3em] mb-12">
              {t.hero.subtitle}
            </p>
            <a 
              href="#proposal"
              className="inline-block bg-white text-cancun-blue px-10 py-4 rounded-full font-display font-bold uppercase tracking-widest hover:bg-cancun-blue hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t.hero.cta}
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative min-h-screen py-16 lg:py-24 flex items-center bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 blur-sm scale-105"
          style={{ backgroundImage: `url(${DRIVE_IMAGE_URL(SECTIONS.sobreBg)})` }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Title & Text Container */}
            <div className="order-1 md:col-span-7 lg:col-span-7 flex flex-col">
              <SectionTitle light>{t.about.title}</SectionTitle>
              
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-light">
                {t.about.text.split('\n\n').map((paragraph, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 md:mt-12 flex items-center justify-center md:justify-start space-x-6"
              >
                <div className="flex">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <img src={DRIVE_IMAGE_URL('110funnA4T6m88uE3kUteyxY5LxA9Vasm')} alt="A Casa do Ju" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">@ACasaDoJu</p>
                  <p className="text-[10px] md:text-sm text-white/60">+350k {t.about.followers}</p>
                </div>
              </motion.div>
            </div>

            {/* Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl order-2 md:col-span-5 lg:col-span-5 w-full max-w-sm md:max-w-none mx-auto"
            >
              <img 
                src={DRIVE_IMAGE_URL(SECTIONS.sobre)} 
                alt="Junior & Hebert" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 glass-card rounded-xl text-white">
                <div className="flex items-center space-x-2">
                  <Heart className="text-red-400 fill-red-400" size={16} md:size={20} />
                  <span className="font-display font-bold uppercase tracking-widest text-[10px] md:text-sm">{t.about.badge}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proposal Section */}
      <section id="proposal" className="relative py-16 lg:py-24 bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${DRIVE_IMAGE_URL(SECTIONS.proposta)})` }}
        />
        <div className="absolute inset-0 bg-cancun-blue/30" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <SectionTitle light centered>{t.proposal.title}</SectionTitle>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-8">
              <div className="flex items-center space-x-3 bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm">
                <Calendar size={20} />
                <span className="font-display text-sm uppercase tracking-wider">{t.proposal.period}</span>
              </div>
              <div className="flex items-center space-x-3 bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm">
                <MapPin size={20} />
                <span className="font-display text-sm uppercase tracking-wider">{t.proposal.duration}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Video Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-cancun-gold/50 transition-colors"
            >
              <div className="w-12 h-12 bg-cancun-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Video className="text-cancun-gold" size={24} />
              </div>
              <h3 className="text-xl font-serif mb-6 text-cancun-gold">{t.proposal.deliverables.videoTitle}</h3>
              <ul className="space-y-4">
                {t.proposal.deliverables.video.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm opacity-90">
                    <CheckCircle2 className="text-cancun-gold shrink-0 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stories Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-cancun-gold/50 transition-colors"
            >
              <div className="w-12 h-12 bg-cancun-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Instagram className="text-cancun-gold" size={24} />
              </div>
              <h3 className="text-xl font-serif mb-6 text-cancun-gold">{t.proposal.deliverables.storiesTitle}</h3>
              <ul className="space-y-4">
                {t.proposal.deliverables.stories.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm opacity-90">
                    <CheckCircle2 className="text-cancun-gold shrink-0 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Assets Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-cancun-gold/50 transition-colors"
            >
              <div className="w-12 h-12 bg-cancun-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Camera className="text-cancun-gold" size={24} />
              </div>
              <h3 className="text-xl font-serif mb-6 text-cancun-gold">{t.proposal.deliverables.assetsTitle}</h3>
              <ul className="space-y-4">
                {t.proposal.deliverables.assets.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm opacity-90">
                    <CheckCircle2 className="text-cancun-gold shrink-0 mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 bg-black/40 rounded-2xl border border-cancun-gold/30 backdrop-blur-sm"
          >
            <p className="text-center italic text-lg opacity-90">
              "{t.proposal.goal}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-16 lg:py-24 bg-cancun-sand overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <SectionTitle centered>{t.references.title}</SectionTitle>
            <p className="text-gray-500 font-display uppercase tracking-widest text-sm">{t.references.subtitle}</p>
          </div>

          {/* Desktop Grid / Mobile Slider */}
          <div className="relative">
            <motion.div 
              className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide"
              initial={false}
              animate={{ x: [0, -20, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                repeatDelay: 2
              }}
            >
              {t.references.items.map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="min-w-[80%] md:min-w-0 aspect-[9/16] bg-gray-200 rounded-2xl overflow-hidden relative group snap-center block"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all duration-500 z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="text-white" />
                    </div>
                  </div>
                  <img 
                    src={item.thumbnail} 
                    alt={item.category} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white z-20">
                    <p className="text-xs uppercase tracking-widest font-bold mb-1 text-cancun-gold">{item.category}</p>
                    <p className="text-sm opacity-90 leading-snug">{item.description}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            {/* Mobile Scroll Hint */}
            <div className="md:hidden flex justify-center mt-4 space-x-2">
              <div className="w-8 h-1 bg-cancun-blue/30 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: [-32, 32] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full bg-cancun-blue"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Casa do Ju Section */}
      <section id="acasadoju" className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-cancun-blue/10 text-cancun-blue text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
              @ACasaDoJu
            </div>
            <SectionTitle centered={true}>{t.acasadoju.title}</SectionTitle>
            <div className="flex flex-col gap-8 items-center">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light w-full">
                {t.acasadoju.text}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://instagram.com/ACasaDoJu" target="_blank" className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-cancun-blue hover:text-white transition-all group">
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
                </a>
                <a href="https://tiktok.com/@ACasaDoJu" target="_blank" className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-cancun-blue hover:text-white transition-all group">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                  <span className="text-xs font-bold uppercase tracking-widest">TikTok</span>
                </a>
                <a href="https://facebook.com/ACasaDoJu" target="_blank" className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-cancun-blue hover:text-white transition-all group">
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
                </a>
                <a href="https://www.youtube.com/@juniorlaunther" target="_blank" className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-cancun-blue hover:text-white transition-all group">
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
              {[
                { id: SECTIONS.instagram, label: 'Instagram' },
                { id: SECTIONS.tiktok, label: 'TikTok' },
                { id: SECTIONS.facebook, label: 'Facebook' },
                { id: SECTIONS.youtube, label: 'YouTube' }
              ].map((social, index) => (
                <motion.div 
                  key={social.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[200px] md:w-[240px] lg:w-[calc(25%-12px)] snap-center"
                >
                  <div className="relative group rounded-2xl overflow-hidden shadow-xl aspect-[9/16] bg-gray-100">
                    <img 
                      src={DRIVE_IMAGE_URL(social.id)} 
                      alt={social.label} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-[10px] uppercase tracking-widest font-bold">{social.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Scroll Hint */}
            <div className="lg:hidden flex justify-center mt-2 space-x-2">
              <div className="w-8 h-1 bg-cancun-blue/30 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: [-32, 32] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full bg-cancun-blue"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 lg:py-32 flex items-center justify-center text-white text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${DRIVE_IMAGE_URL(SECTIONS.contato)})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <SectionTitle light centered>{t.contact.title}</SectionTitle>
            <p className="text-xl text-white/80 mb-12 font-light">
              {t.contact.subtitle}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <a 
                href="mailto:contato@juniorlaunther.com" 
                className="flex flex-col items-center p-8 glass-card rounded-3xl hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-cancun-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60 mb-2">{t.contact.email}</span>
                <span className="text-lg font-medium">contato@juniorlaunther.com</span>
              </a>
              
              <a 
                href="tel:+5519983255410" 
                className="flex flex-col items-center p-8 glass-card rounded-3xl hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-cancun-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60 mb-2">{t.contact.phone}</span>
                <span className="text-lg font-medium">+55 19 98325-5410</span>
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-6">
              <a href="https://instagram.com/ACasaDoJu" target="_blank" className="text-white/50 hover:text-white transition-colors flex flex-col items-center">
                <Instagram size={28} />
                <span className="text-[10px] uppercase tracking-widest mt-2">Instagram</span>
              </a>
              <a href="https://www.youtube.com/juniorlaunther" target="_blank" className="text-white/50 hover:text-white transition-colors flex flex-col items-center">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                <span className="text-[10px] uppercase tracking-widest mt-2">YouTube</span>
              </a>
              <a href="https://tiktok.com/@ACasaDoJu" target="_blank" className="text-white/50 hover:text-white transition-colors flex flex-col items-center">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                <span className="text-[10px] uppercase tracking-widest mt-2">TikTok</span>
              </a>
              <a href="https://facebook.com/ACasaDoJu" target="_blank" className="text-white/50 hover:text-white transition-colors flex flex-col items-center">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span className="text-[10px] uppercase tracking-widest mt-2">Facebook</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white text-center border-t border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">
          &copy; 2026 Junior & Hebert | {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}
