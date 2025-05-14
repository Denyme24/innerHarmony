"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TherapySession from './TherapySession';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
}

const TherapyDashboard = () => {
  const [viewType, setViewType] = useState<'grid' | 'dashboard'>('dashboard');
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Stress", icon: "😓", selected: false },
    { id: 2, name: "Anxiety", icon: "😰", selected: false },
    { id: 3, name: "Grief", icon: "😢", selected: false },
    { id: 6, name: "Work-life Balance", icon: "⚖️", selected: false },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  const handleSelectCategory = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, selected: !category.selected }
          : category
      )
    );
  };

  const selectedCategories = categories
    .filter((category) => category.selected)
    .map((category) => category.name);

  if (!isLoggedIn) {
    return (
      <section className="py-24 bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white/80 rounded-2xl shadow-lg p-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-lavender mb-4">Sign In Required</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">Please sign in to access our therapy sessions 💜</p>
          <Link href="/login" className="btn-primary px-8 py-3 text-lg">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Home Button */}
        <div className="mb-6 flex justify-start">
          <Link href="/" className="btn-secondary px-6 py-2 rounded-lg text-base font-semibold hover:bg-lavender/10 hover:text-lavender transition-colors">
            ← Home
          </Link>
        </div>
        <div className="mb-12">
          <h2 className="text-4xl font-serif font-bold mb-6 text-center">
            Therapy <span className="text-lavender">Library</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Explore our comprehensive collection of therapeutic sessions designed to support your mental well-being journey.
          </p>

          {/* View Toggle and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* View Toggle */}
            <div className="flex items-center space-x-4 bg-white rounded-lg p-2 shadow-sm">
              <button
                onClick={() => setViewType('grid')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewType === 'grid'
                    ? 'bg-lavender text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span>Grid</span>
                </div>
              </button>
              <button
                onClick={() => setViewType('dashboard')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewType === 'dashboard'
                    ? 'bg-lavender text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span>List</span>
                </div>
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectCategory(category.id)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    category.selected
                      ? 'bg-lavender text-white border-lavender'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-lavender'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Therapy Sessions */}
        <TherapySession
          selectedCategories={selectedCategories}
          viewType={viewType}
        />
      </div>
    </section>
  );
};

export default TherapyDashboard; 