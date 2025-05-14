"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Hero = () => {
  const router = useRouter();
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCommunityMessage, setShowCommunityMessage] = useState(false);
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  const handleStartSession = () => {
    router.push('/therapy');
  };

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowCommunityMessage(true);
    } else {
      router.push('/community');
    }
  };

  if (showCommunityMessage) {
    return (
      <section className="py-24 bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white/80 rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-lavender mb-4">Sign In Required</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">Please sign in to join the community 💜</p>
          <button onClick={() => router.push('/login')} className="btn-primary px-8 py-3 text-lg">Sign In</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section ref={ref} className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-lavender/10 to-pale-rose/10">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-mint/20 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pale-rose/20 rounded-full blur-3xl z-0"></div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-4 leading-tight"
              >
                Empower Your <span className="text-lavender">Mind</span>,
                <br />
                Transform Your <span className="text-lavender">Life</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-700 text-xl mb-6 max-w-lg mx-auto lg:mx-0"
              >
                InnerHarmony is your safe, supportive space for women to access expert therapy, community, and self-care tools—anytime, anywhere.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-500 text-base mb-8 max-w-md mx-auto lg:mx-0"
              >
                Join thousands of women on their journey to resilience, confidence, and inner peace.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button 
                  className="btn-primary px-8 py-3 text-lg"
                  onClick={handleStartSession}
                >
                  Start Therapy Session
                </button>
                <a
                  href="#community"
                  className="btn-secondary px-8 py-3 text-lg"
                  onClick={handleCommunityClick}
                >
                  Join the Community
                </a>
              </motion.div>
              <p className="text-xs text-gray-500 mt-3">
                Your journey to inner peace begins with a single step
              </p>
              {/* Trust badge */}
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-lavender rounded-full flex items-center justify-center text-white text-lg">★</span>
                <span className="text-sm text-gray-600">Trusted by 10,000+ women</span>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="w-full lg:w-1/2 relative lg:pl-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-10"
              >
                <div className="relative">
                  <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gradient-to-br from-lavender/30 to-sky-blue/30 rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/80 flex items-center justify-center">
                        <span className="text-4xl">🧘‍♀️</span>
                      </div>
                      <h3 className="font-serif text-2xl font-semibold mb-2">
                        Find Your Peace
                      </h3>
                      <p className="text-gray-600">
                        &quot;The quieter you become, the more you can hear.&quot;
                        – Ram Dass
                      </p>
                    </div>
                  </div>
                  {/* Floating cards */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -top-10 -right-4 w-36 p-3 bg-white rounded-lg shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center">
                        <span className="text-sm">🌿</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Daily Calm</p>
                        <p className="text-xs text-gray-500">15 min</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                    className="absolute -bottom-8 -left-6 w-40 p-3 bg-white rounded-lg shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-pale-rose flex items-center justify-center">
                        <span className="text-sm">💗</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Self-Compassion</p>
                        <p className="text-xs text-gray-500">10 min session</p>
                        
                      </div>
                    </div>
                  </motion.div>
                  {/* New: badge or secondary illustration */}
                  
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
