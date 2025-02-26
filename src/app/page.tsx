'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-x-hidden custom-scrollbar snap-scroll relative">
      {/* Background Effects */}
      <WaveBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117] z-[1] pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-[2]">
        {/* Navigation */}
        <nav className="fixed w-full bg-[#0d1117]/90 backdrop-blur-sm z-50 flex items-center justify-between p-4 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="filter brightness-0 sepia-100 hue-rotate-100 saturate-[400%]"
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
              Features
            </button>
            <button 
              onClick={() => scrollToSection(contactRef as React.RefObject<HTMLDivElement>)}
              className="hover:text-[#c9d1d9] transition-colors"
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Updated Hero Section */}
        <main className="relative flex min-h-screen items-center pt-16">
          {/* Left Content */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Become a Bug Bounty Hunter.
              </h1>
              
              <p className="text-xl md:text-2xl text-[#8b949e] mb-12 leading-relaxed">
                Find and fix bugs, earn crypto rewards, and build your reputation in the decentralized bug bounty marketplace.
              </p>

              <div className="flex gap-4">
                <div className="[&_button]:!bg-[#238636] [&_button]:!hover:bg-[#2ea043] [&_button]:!text-white">
                  <WalletDefault />
                </div>
                <button className="border border-[#30363d] hover:border-[#58a6ff] text-[#c9d1d9] px-6 py-3 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
              
              <p className="mt-4 text-sm text-[#8b949e]">
                Connect your wallet to start hunting for bugs and earning rewards
              </p>
            </motion.div>
          </div>

          {/* Right Content - Programmer Image */}
          <div className="hidden md:block relative w-1/2 h-screen">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-[90%] h-[90%]">
                <Image
                  src="/bountybase.png"
                  alt="Programmer"
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
        <section 
          ref={aboutRef} 
          className="min-h-screen py-20 px-8 flex items-center backdrop-blur-sm bg-[#161b22]/80"
        >
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Find Bugs",
                  description: "Browse through open bounties and find security vulnerabilities in smart contracts and web3 applications.",
                  icon: "🔍"
                },
                {
                  title: "Fix Issues",
                  description: "Submit your solutions and collaborate with project maintainers to resolve security concerns.",
                  icon: "🛠️"
                },
                {
                  title: "Earn Rewards",
                  description: "Get paid in cryptocurrency for your contributions and build your reputation in the ecosystem.",
                  icon: "💎"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-[#0d1117] p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-[#8b949e]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section 
          ref={featuresRef} 
          className="min-h-screen py-20 px-8 flex items-center backdrop-blur-sm"
        >
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Platform Features</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Smart Contract Integration",
                  description: "Automated payments and escrow system ensures secure and transparent transactions.",
                  image: "/feature1.png"
                },
                {
                  title: "Developer Chat Rooms",
                  description: "Collaborate with other developers in topic-based and private chat rooms.",
                  image: "/feature2.png"
                },
                {
                  title: "Reputation System",
                  description: "Build your profile and earn reputation points for successful bug fixes.",
                  image: "/feature3.png"
                },
                {
                  title: "Real-time Updates",
                  description: "Get notified instantly about new bounties and updates on your submissions.",
                  image: "/feature4.png"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-[#238636] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image src={feature.image} alt={feature.title} width={32} height={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-[#8b949e]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact & Partners Section */}
        <section 
          ref={contactRef} 
          className="min-h-screen py-20 px-8 flex items-center backdrop-blur-sm bg-[#161b22]/80"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Partners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Our Partners</h2>
                <div className="grid grid-cols-2 gap-8">
                  {/* Add partner logos here */}
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-[#0d1117] p-6 rounded-lg">
                      <Image src={`/partner${i + 1}.png`} alt={`Partner ${i + 1}`} width={120} height={40} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <form className="space-y-6">
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
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0d1117]/90 backdrop-blur-sm border-t border-[#30363d] py-12 px-8 relative z-[2]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="filter brightness-0 sepia-100 hue-rotate-100 saturate-[400%]"
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
