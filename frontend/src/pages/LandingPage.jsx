import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Background from '../components/Background';

export default function LandingPage() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: '📱',
      title: 'Daily ID Scan',
      description: 'Scan your college ID to earn tokens and mark attendance automatically.'
    },
    {
      icon: '📝',
      title: 'Quizzes & Challenges',
      description: 'Test your knowledge with subject‑based quizzes and coding challenges.'
    },
    {
      icon: '📚',
      title: 'E‑Library',
      description: 'Upload and access study materials (PDFs) shared by classmates.'
    },
    {
      icon: '🎥',
      title: 'Video Lectures',
      description: 'Watch professor‑approved lecture videos, filtered by your college and course.'
    },
    {
      icon: '👥',
      title: 'Connect',
      description: 'Find classmates by username, send connection requests, and chat in real time.'
    },
    {
      icon: '👥',
      title: 'Study Groups',
      description: 'Create or join groups to collaborate on projects and share notes.'
    }
  ];

  const steps = [
    { step: 1, title: 'Sign Up / Login', description: 'Use your mobile number and a one‑time OTP (demo: 123456).' },
    { step: 2, title: 'Complete Your Profile', description: 'Choose your college and course to get started.' },
    { step: 3, title: 'Scan Your ID', description: 'Earn your first tokens and unlock features.' },
    { step: 4, title: 'Explore & Earn', description: 'Take quizzes, upload materials, and connect with peers.' }
  ];

  return (
    <Background>
      {/* Navbar */}
      <nav className="glass text-white fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex space-x-6 text-white/80">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
              <a href="#footer" className="hover:text-white transition">About Us</a>
            </div>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition transform"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center px-4"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Study<span className="text-purple-400">Snap</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            Connect with classmates, access study materials, earn tokens, and make learning fun.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition transform"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Everything You Need in One Place
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass p-6 rounded-xl hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with team information */}
      <footer id="footer" className="border-t border-white/10 py-8 text-center text-white/70 text-sm">
        <p className="mb-2">
          <span className="text-white/50">Designed by: </span>
          <span className="font-medium text-white">Batch-9 (A Secion)</span>
          <span className="text-white/50"> Under The Guidance of </span>
          <span className="font-medium text-white">Mr.N.Raghu, M.Tech(Ph.D)</span>
        </p>
        <p>
          <span className="text-white/50">Project Team: </span>
          <span className="font-medium text-white">MD. Waseem Siddique</span>
          <span className="text-white/70"> (24285A0501), </span>
          <span className="font-medium text-white">S. Sriram</span>
          <span className="text-white/70"> (23281A0503), </span>
          <span className="font-medium text-white">S. Balwinder Singh</span>
          <span className="text-white/70"> (23281A0545), </span>
          <span className="font-medium text-white">K. Harish</span>
          <span className="text-white/70"> (23281A0536).</span>
        </p>
        <p className="mt-4 text-white/40 text-xs">
          © {new Date().getFullYear()} StudySnap. All rights reserved.
        </p>
      </footer>
    </Background>
  );
}