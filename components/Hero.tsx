"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Category = {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
};

const Hero = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Stress", icon: "😓", selected: false },
    { id: 2, name: "Anxiety", icon: "😰", selected: false },
    { id: 3, name: "Grief", icon: "😢", selected: false },
    { id: 4, name: "Postpartum", icon: "👶", selected: false },
    { id: 5, name: "Self-esteem", icon: "💖", selected: false },
    { id: 6, name: "Work-life Balance", icon: "⚖️", selected: false },
  ]);

  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSelectCategory = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, selected: !category.selected }
          : category
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      ref={ref}
      className="pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-lavender/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-sky-blue/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-mint/30 rounded-full blur-3xl z-0"></div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-1/4 hidden md:block"
      >
        <div className="w-6 h-6 rounded-full bg-pale-rose"></div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute bottom-40 left-1/4 hidden md:block"
      >
        <div className="w-4 h-4 rounded-full bg-lavender"></div>
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-1 mb-6 bg-lavender/20 rounded-full"
            >
              <span className="text-lavender font-medium text-sm">
                Your Mental Health Matters
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
            >
              Nurture Your <span className="text-lavender">Mind</span> &<br />
              Embrace Your <span className="text-lavender">Wellbeing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0"
            >
              A safe and supportive space dedicated to women&apos;s mental
              health, offering guided therapy and a community that understands.
            </motion.p>

            {/* Categories */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h3 className="text-soft-black font-medium mb-4 text-left">
                Select what you&apos;re feeling:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCategory(category.id)}
                    className={`${
                      category.selected
                        ? "bg-lavender text-white border-lavender"
                        : "bg-white/70 border-gray-200 hover:border-lavender"
                    } cursor-pointer border rounded-xl p-3 transition-all duration-300 flex items-center space-x-2`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button className="btn-primary">Start Therapy Session</button>
              <p className="text-xs text-gray-500 mt-3">
                Your journey to inner peace begins with a single step
              </p>
            </motion.div>
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
