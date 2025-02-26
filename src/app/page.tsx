'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { MatrixBackground } from "@/components/MatrixBackground";
import { WaveBackground } from "@/components/WaveBackground";
import { WalletDefault } from '@coinbase/onchainkit/wallet';


export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  // const fadeInUp = {
  //   initial: { opacity: 0, y: 20 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.6 }
  // };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-x-hidden custom-scrollbar snap-scroll relative">
      {/* Background Effects */}
      <WaveBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117] z-[1] pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-[2]">
        {/* Navigation */}
        <nav className="fixed w-full bg-[#0d1117]/90 backdrop-blur-sm z-50 flex items-center justify-between p-6  border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Image
              src="/bb-logo.jpg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">BountyBase</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[#8b949e]">
            <button 
              onClick={() => scrollToSection(aboutRef as React.RefObject<HTMLDivElement>)}
              className="hover:text-[#c9d1d9] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection(featuresRef as React.RefObject<HTMLDivElement>)}
              className="hover:text-[#c9d1d9] transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection(contactRef as React.RefObject<HTMLDivElement>)}
              className="hover:text-[#c9d1d9] transition-colors"
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative min-h-screen flex flex-col md:flex-row items-center pt-10 px-4 md:px-8">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto md:mx-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Fix Bugs, Contribute to Open Source, and Earn Crypto
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-[#8b949e] mb-8 md:mb-12 leading-relaxed">
                Get rewarded in crypto for solving open-source issues and bug bounties.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="[&_button]:!bg-[#238636] [&_button]:!hover:bg-[#2ea043] [&_button]:!text-white [&_button]:!w-full sm:[&_button]:!w-auto">
                  <WalletDefault />
                </div>
                <button className="w-full sm:w-auto border border-[#30363d] hover:border-[#58a6ff] text-[#c9d1d9] px-6 py-3 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Only show on medium screens and up */}
          <div className="hidden md:block w-full md:w-1/2 h-[50vh] md:h-screen relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-[80%] h-[70%]">
                <Image
                  src="/bb-logo.jpg"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(35, 134, 54, 0.2))'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </main>

        {/* About Section */}
        <section ref={aboutRef} className="min-h-screen py-12 md:py-16 px-4 md:px-8">
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
            >
              About
            </motion.h2>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  ),
                  title: "Our Platform",
                  description: "A decentralized marketplace connecting developers with open-source projects and bug bounties."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Our Mission",
                  description: "Making open-source contributions sustainable by ensuring developers get fairly compensated for their work."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  title: "How It Works",
                  description: "Projects post bounties for issues or features, developers submit solutions, and get paid in crypto upon completion."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Community Driven",
                  description: "Built by developers, for developers, fostering a collaborative ecosystem for open-source growth."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center group"
                >
                  <motion.div 
                    className="w-16 h-16 bg-[#1A2421] rounded-full border-2 border-emerald-500 flex items-center justify-center mb-4 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.div 
                    className="bg-[#1A2421] border border-emerald-500/20 rounded-xl p-5 w-full hover:border-emerald-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
                    variants={{
                      hidden: { scale: 0.8 },
                      visible: { 
                        scale: 1,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }
                    }}
                  >
                    <h3 className="text-lg font-bold text-emerald-500 mb-2 text-center">{item.title}</h3>
                    <p className="text-gray-300 text-center text-sm">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="min-h-screen py-12 md:py-16 px-4 md:px-8">
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
              How It Could Work
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "1. Post a Bounty",
                  description: "Devs or companies post an issue with a reward."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "2. Submit PRs",
                  description: "Contributors submit pull requests as solutions."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "3. Get Paid",
                  description: "Best solution gets merged and rewarded."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.2
                      }
                    }
                  }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center group"
                >
                  <motion.div 
                    className="w-16 h-16 bg-[#1A2421] rounded-full border-2 border-emerald-500 flex items-center justify-center mb-4 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="bg-[#1A2421] border border-emerald-500/20 rounded-xl p-5 w-full hover:border-emerald-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                    <h3 className="text-lg font-bold text-emerald-500 mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-300 text-center text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reputation System */}
            <motion.div variants={itemVariants} className="mt-8 md:mt-12 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-16 h-16 bg-[#1A2421] rounded-full border-2 border-emerald-500 flex items-center justify-center mb-4 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </motion.div>
                <div className="bg-[#1A2421] border border-emerald-500/20 rounded-xl p-5 w-full hover:border-emerald-500/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                  <h3 className="text-lg font-bold text-emerald-500 mb-2 text-center">Reputation System</h3>
                  <p className="text-gray-300 text-center text-sm">Devs build credibility through completed bounties.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="min-h-screen py-12 md:py-16 px-4 md:px-8">
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Partners */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Our Partners</h2>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  {Array(4).fill(0).map((_, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="bg-[#0d1117] p-6 rounded-lg"
                    >
                      <Image src={`/partner${i + 1}.png`} alt={`Partner ${i + 1}`} width={120} height={40} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Get in Touch</h2>
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your message"
                      rows={4}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-3 rounded-md font-medium w-full transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/bb-logo.jpg"
                  alt="Logo"
                  width={24}
                  height={24}
                  />
                <span className="text-lg font-bold">BountyBase</span>
              </div>
              <p className="text-[#8b949e]">Decentralized bug bounty platform for web3 projects.</p>
            </div>
            
            {[
              {
                title: "Platform",
                links: ["About", "Features", "Security", "Roadmap"]
              },
              {
                title: "Resources",
                links: ["Documentation", "API", "Status", "Blog"]
              },
              {
                title: "Connect",
                links: ["Twitter", "Discord", "GitHub", "LinkedIn"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-white font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-[#8b949e] hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>

        {/* Scroll Controls - Updated z-index */}
        <motion.div
          className="fixed bottom-8 right-8 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#238636] hover:bg-[#2ea043] text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </button>
        </motion.div>

        <motion.div
          className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-[60] flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[aboutRef, featuresRef, contactRef].map((ref, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(ref as React.RefObject<HTMLDivElement>)}
              className="w-2 h-2 rounded-full bg-[#238636] hover:bg-[#2ea043] transition-colors"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
