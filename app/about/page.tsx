"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [teamRef, teamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-lavender/10 to-white">
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-mint/20 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pale-rose/20 rounded-full blur-3xl z-0"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="px-4 py-1 bg-lavender/20 rounded-full text-lavender font-medium text-sm inline-block mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              About InnerHarmony
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              A dedicated platform envisioning mental well-being for every
              woman, regardless of her background or circumstances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-serif font-bold mb-6">
                Our <span className="text-lavender">Mission</span>
              </h2>
              <p className="text-gray-700 mb-4">
                InnerHarmony was founded with a clear purpose: to make mental
                health support accessible, affordable, and stigma-free for women
                everywhere.
              </p>
              <p className="text-gray-700 mb-4">
                We recognize the unique challenges women face in today&apos;s
                world – from societal pressures and gender biases to the
                delicate balance of professional and personal responsibilities.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform combines advanced technology with compassionate
                care to create a safe haven where women can access therapeutic
                resources, connect with like-minded individuals, and embark on a
                journey of emotional growth.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-lavender/30 to-mint/30 flex items-center justify-center relative z-10 overflow-hidden">
                  <div className="text-center p-8">
                    <span className="text-5xl block mb-4">💭</span>
                    <h3 className="font-serif text-2xl font-semibold mb-2">
                      Our Philosophy
                    </h3>
                    <p className="text-gray-700">
                      &quot;Mental wellness is not a destination but a journey.
                      We believe in empowering each woman to navigate this
                      journey with confidence and support.&quot;
                    </p>
                  </div>
                </div>
                <div className="absolute top-6 -right-6 w-32 h-32 bg-pale-rose/40 rounded-full blur-xl z-0"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-lavender/40 rounded-full blur-xl z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className="py-20 bg-gradient-to-b from-white to-lavender/5"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={teamInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="px-4 py-1 bg-lavender/20 rounded-full text-lavender font-medium text-sm inline-block mb-4"
            >
              Our Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-serif font-bold mb-6"
            >
              Meet The <span className="text-lavender">Visionaries</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-700 max-w-2xl mx-auto mb-12"
            >
              Our diverse team brings together expertise in psychology,
              technology, and women&apos;s health to create a comprehensive
              approach to mental well-being.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Emma Roberts",
                  role: "Clinical Psychologist, Founder",
                  avatar: "👩‍⚕️",
                  description:
                    "With over 15 years of experience in women's mental health, Dr. Roberts founded InnerHarmony to bridge the gap between traditional therapy and digital accessibility.",
                },
                {
                  name: "Sofia Chen",
                  role: "Technology Director",
                  avatar: "👩‍💻",
                  description:
                    "Sofia leads our technical innovations, ensuring that our AI-driven solutions are both cutting-edge and deeply empathetic to user needs.",
                },
                {
                  name: "Ava Johnson",
                  role: "Community Manager",
                  avatar: "👩‍🦱",
                  description:
                    "Ava cultivates our supportive community, creating safe spaces for women to share, learn, and grow together on their mental wellness journeys.",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="card p-8 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lavender to-pale-rose mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lavender mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="px-4 py-1 bg-lavender/20 rounded-full text-lavender font-medium text-sm inline-block mb-4">
              Our Values
            </span>
            <h2 className="text-3xl font-serif font-bold mb-6">
              What Guides <span className="text-lavender">Our Work</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-12">
              Our core values shape every aspect of InnerHarmony, from our
              platform design to our support approach.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Accessibility",
                  description:
                    "Mental health support should be available to all women, regardless of geographical location or financial constraints.",
                  icon: "🌍",
                },
                {
                  title: "Empathy",
                  description:
                    "We approach every interaction with understanding, compassion, and respect for individual experiences.",
                  icon: "💗",
                },
                {
                  title: "Innovation",
                  description:
                    "We continuously evolve our platform with cutting-edge technology to better serve women's mental health needs.",
                  icon: "💡",
                },
                {
                  title: "Community",
                  description:
                    "We believe in the healing power of connection and foster supportive relationships among our users.",
                  icon: "🤝",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start p-6 bg-lavender/5 rounded-xl"
                >
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-serif font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
