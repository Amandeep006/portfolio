/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Database, 
  BarChart3, 
  Code2, 
  Cpu, 
  Send,
  Menu,
  X,
  Search,
  Globe,
  PieChart,
  Terminal,
  Settings,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db, auth } from './lib/firebase';
import { 
  collection, addDoc, serverTimestamp, 
  doc, setDoc, onSnapshot 
} from 'firebase/firestore';
import { 
  signInWithPopup, GoogleAuthProvider, 
  onAuthStateChanged, User 
} from 'firebase/auth';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          AMANDEEP<span className="text-accent-purple">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-600"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-bold tracking-widest text-accent-purple uppercase mb-2 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold tracking-tight"
    >
      {children}
    </motion.h2>
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="pt-32 pb-20 px-6 min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-6">
          Amandeep <br />
          <span className="neon-text-gradient">Saini</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-light mb-8 max-w-md">
          Digital Marketing & Data Analytics Enthusiast. Turning insights into growth.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all group"
          >
            View Projects
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-gray-200 rounded-full font-medium hover:border-black transition-all"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative aspect-square max-w-md mx-auto md:ml-auto"
      >
        <div className="absolute inset-0 neon-gradient rounded-3xl rotate-6 opacity-20 blur-2xl"></div>
        <div className="relative z-10 w-full h-full bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
          <img 
            src="https://i.ibb.co/G4JcTLkw/PKT-2628.jpg" 
            alt="Amandeep Saini" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/amandeep/800/800";
            }}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 px-6 bg-black text-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading subtitle="About Me">Results-driven & Analytical.</SectionHeading>
          <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">
            I am a Digital Marketing and Data Analytics enthusiast with hands-on experience in SEO optimization, website performance improvement, and social media management. I leverage tools like SQL, Excel, Python, and Power BI to generate actionable insights that drive business growth.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-3xl font-bold mb-1">SEO</h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Optimization Expert</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold mb-1">Data</h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Analytics Specialist</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Search />, title: 'SEO Strategy', desc: 'Keyword research and on-page optimization.' },
            { icon: <PieChart />, title: 'Data Analytics', desc: 'Visualizing trends with Power BI & Excel.' },
            { icon: <Globe />, title: 'Digital Marketing', desc: 'Managing social media and campaigns.' },
            { icon: <Terminal />, title: 'Technical Skills', desc: 'Proficient in SQL and Python.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-accent-purple/50 transition-colors"
            >
              <div className="text-accent-purple mb-4">{item.icon}</div>
              <h5 className="font-bold mb-2">{item.title}</h5>
              <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skills = [
    { name: 'SEO Optimization', level: 95 },
    { name: 'SQL', level: 90 },
    { name: 'Python', level: 85 },
    { name: 'Power BI', level: 88 },
    { name: 'Advanced Excel', level: 95 },
    { name: 'Google Analytics', level: 90 },
    { name: 'Social Media Mgmt', level: 85 },
    { name: 'Data Visualization', level: 92 },
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Expertise">Skills & Tools</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:neon-gradient group-hover:text-white transition-all">
                <Code2 size={24} />
              </div>
              <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
              <div className="w-full bg-gray-200 h-1 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full neon-gradient"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Website SEO Optimization',
      category: 'SEO Project',
      image: 'https://picsum.photos/seed/seo1/600/400',
      desc: 'Conducted keyword research and optimized on-page SEO for Oneness Solar Power.'
    },
    {
      title: 'Pizza Hut Sales Analysis',
      category: 'SQL Project',
      image: 'https://picsum.photos/seed/sql1/600/400',
      desc: 'Analyzed sales datasets using SQL queries to identify customer trends and business insights.'
    },
    {
      title: 'Hotel Booking Analysis',
      category: 'Excel Project',
      image: 'https://picsum.photos/seed/excel1/600/400',
      desc: 'Created interactive dashboards using Pivot Tables to analyze booking trends and behavior.'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading subtitle="Portfolio">Featured Projects</SectionHeading>
          <a href="#" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-accent-purple transition-colors mb-12 md:mb-0">
            View All Projects <ChevronRight size={16} />
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-purple transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{project.desc}</p>
                <button className="flex items-center gap-2 text-sm font-bold group/btn">
                  View Case Study 
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: 'Digital Marketing Associate',
      company: 'Crew Techventure',
      period: '2025 - Present',
      desc: 'Managing complete website SEO, social media accounts, and analyzing campaign performance.'
    },
    {
      role: 'Data Entry Operator',
      company: 'Sirohi Scan Center',
      period: 'Jul 2025 - Oct 2025',
      desc: 'Maintained accurate digital records, verified data integrity, and supported reporting workflows.'
    },
    {
      role: 'B.Tech in Computer Science',
      company: 'Vidya College of Engineering',
      period: '2023 - 2027',
      desc: 'Pursuing Bachelor of Technology. Focused on technical foundations and data systems.'
    }
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading subtitle="Career & Education">Experience Timeline</SectionHeading>
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 border-l border-gray-100"
            >
              <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-black" />
              <span className="text-xs font-bold text-accent-purple uppercase tracking-widest mb-2 block">{exp.period}</span>
              <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
              <p className="text-gray-400 font-medium mb-4">{exp.company}</p>
              <p className="text-gray-500 font-light leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'amandeepsaini951@gmail.com');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && isAdmin) {
        const tokens = event.data.tokens;
        try {
          await setDoc(doc(db, 'configs', 'google-drive'), {
            googleTokens: tokens,
            updatedAt: serverTimestamp()
          }, { merge: true });
          alert('Google Drive tokens saved successfully!');
        } catch (error) {
          console.error('Error saving tokens:', error);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleConnectDrive = async () => {
    try {
      const res = await fetch('/api/auth/url');
      const { url } = await res.json();
      window.open(url, 'google_auth', 'width=600,height=700');
    } catch (error) {
      console.error('Error getting auth URL:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp(),
      uid: auth.currentUser?.uid || null
    };

    try {
      await addDoc(collection(db, 'submissions'), data);
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading subtitle="Contact">Let's connect.</SectionHeading>
            <p className="text-gray-400 mb-12 max-w-sm">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="font-medium">amandeepsaini951@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/amandeep-saini-5bb3842b7</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">GitHub</p>
                  <p className="font-medium">github.com/Amandeep006</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we work together?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-purple outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-500"
                >
                  <CheckCircle2 size={20} />
                  <p className="text-sm font-medium">Message sent successfully! It's being saved to Google Drive.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500"
                >
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">Something went wrong. Please try again.</p>
                </motion.div>
              )}
            </form>

            {isAdmin && (
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings size={20} className="text-purple-500" />
                    Admin Controls
                  </h3>
                  {!user ? (
                    <button 
                      onClick={handleLogin}
                      className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors"
                    >
                      Admin Login
                    </button>
                  ) : (
                    <button 
                      onClick={handleConnectDrive}
                      className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Link Google Drive
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Link your Google Drive to automatically save form submissions to a spreadsheet.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-sm text-gray-500">
        © 2026 Amandeep Saini. All rights reserved.
      </p>
      <div className="flex items-center gap-6">
        <a href="https://github.com/Amandeep006" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors"><Github size={20} /></a>
        <a href="https://linkedin.com/in/amandeep-saini-5bb3842b7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors"><Linkedin size={20} /></a>
        <a href="mailto:amandeepsaini951@gmail.com" className="text-gray-400 hover:text-black transition-colors"><Mail size={20} /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
