"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import Image from 'next/image';

interface User {
  name: string;
  email: string;
}

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Decode JWT token to get user info
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const userData = JSON.parse(jsonPayload);
        setUser(userData);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lavender to-mint flex items-center justify-center">
            <span className="font-serif text-lavender/80 text-xl font-bold">
              IH
            </span>
          </div>
          <span className="font-serif text-xl font-semibold text-soft-black">
            InnerHarmony
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="nav-link nav-link-active">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          {isLoggedIn && (
            <Link href="/community" className="nav-link">
              Community
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hello, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary py-1.5 px-5"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-secondary py-1.5 px-5">
                Login
              </Link>
              <Link href="/signup" className="btn-primary py-1.5 px-5">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-soft-black focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg rounded-b-2xl mt-2"
        >
          <div className="flex flex-col space-y-4 p-6">
            <Link
              href="/"
              className="nav-link py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="nav-link py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="nav-link py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {isLoggedIn && (
              <Link
                href="/community"
                className="nav-link py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
            )}
            <div className="flex flex-col space-y-3 pt-3">
              {isLoggedIn ? (
                <>
                  <div className="text-center text-gray-700 mb-2">
                    Hello, {user?.name || "User"}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-secondary w-full text-center border-lavender/80 hover:bg-lavender/80"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn-secondary w-full text-center border-lavender/80 hover:bg-lavender/80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary w-full text-center bg-lavender/80 hover:bg-lavender"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
