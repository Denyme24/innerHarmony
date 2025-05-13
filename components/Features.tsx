"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Guided Therapy Sessions",
    description:
      "Personalized sessions designed specifically for women's unique mental health challenges and experiences.",
    icon: "🧠",
    color: "from-lavender to-soft-lilac",
  },
  {
    title: "AI Counseling Videos",
    description:
      "Access to AI-driven therapeutic content that adapts to your emotional needs and progress.",
    icon: "🎬",
    color: "from-sky-blue to-mint",
  },
  {
    title: "Safe Community Space",
    description:
      "Connect with women who understand your journey in a judgment-free, supportive environment.",
    icon: "👭",
    color: "from-pale-rose to-soft-lilac",
  },
  {
    title: "Self-Care Tools",
    description:
      "Practical resources to build resilience and develop healthy emotional habits in your daily life.",
    icon: "🌱",
    color: "from-mint to-sky-blue",
  },
];

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-lavender/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1 bg-lavender/10 rounded-full text-lavender font-medium text-sm inline-block mb-4"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold mb-6"
          >
            Features Designed For{" "}
            <span className="text-lavender">Your Wellbeing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            InnerHarmony provides a comprehensive approach to women&apos;s
            mental health with tools and resources tailored to your journey.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="card group"
            >
              <div
                className={`h-full p-8 bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl`}
              >
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:animate-breathe`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 font-serif">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
