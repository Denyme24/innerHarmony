"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Guided Therapy",
    description: "Personalized sessions for women's mental health.",
    icon: "🧠",
    color: "from-lavender to-soft-lilac",
  },
 
  {
    title: "Mindfulness Library",
    description: "Meditations and exercises for daily calm.",
    icon: "🧘‍♀️",
    color: "from-mint to-soft-lilac",
  },
  {
    title: "Progress Tracking",
    description: "Track your journey and celebrate milestones.",
    icon: "📈",
    color: "from-sky-blue to-lavender",
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-14 bg-white/70 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-lavender/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-10">
          <span className="px-4 py-1 bg-lavender/10 rounded-full text-lavender font-medium text-base inline-block mb-4">
            Our Offerings
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Features Designed For <span className="text-lavender">Your Wellbeing</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Tools and support for every step of your mental wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="h-full min-h-[300px] p-10 bg-white rounded-3xl shadow-md shadow-gray-200 border border-gray-100 transition-all duration-300 hover:shadow-2xl flex flex-col items-center"
            >
              <div
                className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
              >
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4 font-serif text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg text-center flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
