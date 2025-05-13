"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    id: 1,
    quote:
      "InnerHarmony gave me the tools to manage my anxiety. The guided sessions helped me understand my triggers and develop healthy coping mechanisms.",
    name: "Sarah Johnson",
    position: "Marketing Executive",
    avatar: "👩‍💼",
  },
  {
    id: 2,
    quote:
      "After my pregnancy, I struggled with postpartum depression. The specialized support I received here made all the difference in my recovery journey.",
    name: "Maya Patel",
    position: "New Mother",
    avatar: "👩‍👧",
  },
  {
    id: 3,
    quote:
      "The community aspect of InnerHarmony helped me realize I'm not alone in my struggles. Connecting with women who understand has been incredibly healing.",
    name: "Leila Washington",
    position: "Graduate Student",
    avatar: "👩‍🎓",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-lavender/5 to-pale-rose/10 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-20 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-20 w-64 h-64 bg-lavender/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-14"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1 bg-lavender/10 rounded-full text-lavender font-medium text-sm inline-block mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-serif font-bold mb-6"
          >
            Women <span className="text-lavender">Transforming</span> Their
            Lives
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Hear from women who have found hope, healing, and community through
            InnerHarmony&#39;s resources and support.
          </motion.p>
        </motion.div>

        <div className="relative h-[380px] md:h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="text-lavender mb-6">
                  <svg
                    className="w-12 h-12 opacity-30"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                  </svg>
                </div>
                <blockquote className="text-lg md:text-xl font-serif mb-6 text-gray-700">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender to-pale-rose rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">
                      {testimonials[currentIndex].avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold font-serif">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-lavender scale-125"
                  : "bg-lavender/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
