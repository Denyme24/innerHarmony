"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We&#39;re here to listen, support, and answer any questions you
              might have about your mental well-being journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-lavender/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3"
            >
              <h2 className="text-2xl font-serif font-bold mb-6">
                How Can We <span className="text-lavender">Help You?</span>
              </h2>
              <p className="text-gray-600 mb-10">
                Have questions about our services or need guidance? Our
                supportive team is ready to assist you on your mental wellness
                journey.
              </p>

              <div className="space-y-8">
                {/* Email Contact */}
                <div className="flex items-start">
                  <div className="bg-lavender/10 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-lavender"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-1">For general inquiries:</p>
                    <a
                      href="mailto:hello@innerharmony.com"
                      className="text-lavender hover:underline"
                    >
                      hello@innerharmony.com
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">For support:</p>
                    <a
                      href="mailto:support@innerharmony.com"
                      className="text-lavender hover:underline"
                    >
                      support@innerharmony.com
                    </a>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="flex items-start">
                  <div className="bg-lavender/10 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-lavender"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Call Us</h3>
                    <p className="text-gray-600 mb-1">Main Office:</p>
                    <a
                      href="tel:+1234567890"
                      className="text-lavender hover:underline"
                    >
                      +1 (234) 567-890
                    </a>
                    <p className="text-gray-600 mt-2 mb-1">
                      Mental Health Support Line:
                    </p>
                    <a
                      href="tel:+1800123456"
                      className="text-lavender hover:underline"
                    >
                      +1 (800) 123-456
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                      (Available 24/7 for emergencies)
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="bg-lavender/10 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-lavender"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      InnerHarmony Wellness Center
                      <br />
                      123 Serenity Lane
                      <br />
                      Mindful City, MC 98765
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <h3 className="text-lg font-medium mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-lavender/10 hover:bg-lavender/20 flex items-center justify-center text-lavender transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-lavender/10 hover:bg-lavender/20 flex items-center justify-center text-lavender transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-lavender/10 hover:bg-lavender/20 flex items-center justify-center text-lavender transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-lavender/10 hover:bg-lavender/20 flex items-center justify-center text-lavender transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/3"
            >
              <div className="bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-lavender/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative">
                  <h3 className="text-2xl font-serif font-bold mb-6">
                    Send Us a Message
                  </h3>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <h4 className="text-xl font-medium mb-2">
                        Message Sent Successfully!
                      </h4>
                      <p>
                        Thank you for reaching out. Our team will get back to
                        you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender transition-all"
                            placeholder="Jane Doe"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender transition-all"
                            placeholder="jane@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender transition-all"
                          required
                        >
                          <option value="">Please select a subject</option>
                          <option value="General Inquiry">
                            General Inquiry
                          </option>
                          <option value="Therapy Services">
                            Therapy Services
                          </option>
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Partnership Opportunities">
                            Partnership Opportunities
                          </option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-lavender focus:ring-1 focus:ring-lavender transition-all"
                          placeholder="How can we help you?"
                          required
                        ></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full btn-primary flex items-center justify-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-lavender/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="px-4 py-1 bg-lavender/20 rounded-full text-lavender font-medium text-sm inline-block mb-4">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-serif font-bold mb-6">
              Common <span className="text-lavender">Questions</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Find answers to questions we often receive from women seeking
              mental wellness support.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How does online therapy work through InnerHarmony?",
                answer:
                  "Our online therapy services connect you with licensed professionals through secure video sessions. After signing up, you'll complete an assessment that helps match you with a therapist specializing in your needs. Sessions can be scheduled at your convenience, and all communications are confidential and HIPAA-compliant.",
              },
              {
                question: "Is InnerHarmony covered by insurance?",
                answer:
                  "Many insurance providers cover our therapy services. We accept major insurance plans and can verify your coverage before your first session. For those without insurance coverage, we offer affordable payment plans and sliding scale fees based on financial need.",
              },
              {
                question: "How quickly can I start my therapy sessions?",
                answer:
                  "Most new members can schedule their first session within 24-48 hours of completing their initial assessment. Our large network of therapists means you won't have to wait weeks or months to begin your mental wellness journey.",
              },
              {
                question:
                  "Can I switch therapists if I don't feel the right connection?",
                answer:
                  "Absolutely! The therapeutic relationship is crucial for successful outcomes. If you don't feel compatible with your assigned therapist, you can request a change at any time through your account settings or by contacting our support team.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6"
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">
                Don&#39;t see your question here?
              </p>
              <a href="#contact-form" className="btn-secondary">
                Ask Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
