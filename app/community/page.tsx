"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [error, setError] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "experience",
  });

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "experience", label: "Personal Experiences" },
    { id: "advice", label: "Advice & Tips" },
    { id: "support", label: "Seeking Support" },
    { id: "success", label: "Success Stories" },
  ];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `/api/community?category=${selectedCategory}`
      );
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to share your story");
        return;
      }

      const response = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create post");
      }

      setShowNewPostModal(false);
      setNewPost({ title: "", content: "", category: "experience" });
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create post"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-lavender/10">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
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
              Community
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Share Your Journey
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with others who understand. Share your experiences, find
              support, and inspire others on their mental wellness journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNewPostModal(true)}
              className="btn-primary px-8 py-3"
            >
              Share Your Story
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-lavender text-white"
                    : "bg-lavender/10 text-lavender hover:bg-lavender/20"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-lavender/10 text-lavender rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center">
                          <span className="text-lavender font-medium">
                            {post.author.name[0]}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-lavender">
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-lavender">
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">
                Share Your Story
              </h2>
              <button
                onClick={() => {
                  setShowNewPostModal(false);
                  setError(""); // Clear error when closing modal
                }}
                className="text-gray-500 hover:text-gray-700"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lavender focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lavender focus:border-transparent"
                  required
                >
                  <option value="experience">Personal Experience</option>
                  <option value="advice">Advice & Tips</option>
                  <option value="support">Seeking Support</option>
                  <option value="success">Success Story</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Story
                </label>
                <textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lavender focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-6 py-2">
                  Share Story
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
