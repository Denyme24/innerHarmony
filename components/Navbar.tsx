"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
// import Image from 'next/image';

interface User {
  name: string;
  email: string;
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  const handleCommunityClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('Please sign in to access the community!');
      router.push('/login');
    } else {
      router.push('/community');
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/therapy", label: "Therapy" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/community", label: "Community", auth: true },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/70 shadow-lg ${
        isScrolled ? "py-3" : "py-4"
      }`}
      style={{
        borderBottom: "1px solid rgba(200,200,255,0.08)",
        boxShadow: isScrolled
          ? "0 4px 24px 0 rgba(180,180,220,0.08)"
          : "0 2px 8px 0 rgba(180,180,220,0.04)",
      }}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          
          <span className="font-serif text-2xl font-bold text-soft-black tracking-tight group-hover:text-lavender transition-colors">
            InnerHarmony
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => {
            if (link.href === '/community') {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleCommunityClick}
                  className={`nav-link px-2 py-1 rounded-lg transition-colors duration-200 font-medium hover:bg-lavender/10 hover:text-lavender focus:outline-none ${
                    pathname === link.href ? "text-lavender font-bold" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </a>
              );
            }
            if (link.auth && !isLoggedIn) return null;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-2 py-1 rounded-lg transition-colors duration-200 font-medium hover:bg-lavender/10 hover:text-lavender focus:outline-none ${
                  pathname === link.href ? "text-lavender font-bold" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {(user?.name && user.name.split(' ')[0]) || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary py-2 px-6 text-base font-semibold hover:bg-lavender/10 hover:text-lavender"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-secondary py-2 px-6 text-base font-semibold">
                Login
              </Link>
              <Link href="/signup" className="btn-primary py-2 px-6 text-base font-semibold">
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
            className="w-7 h-7"
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
          className="md:hidden bg-white/95 shadow-2xl rounded-b-2xl mt-2 px-4 py-6"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              if (link.href === '/community') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleCommunityClick}
                    className="nav-link text-lg py-2 px-2 rounded-lg hover:bg-lavender/10 hover:text-lavender transition-colors"
                  >
                    {link.label}
                  </a>
                );
              }
              if (link.auth && !isLoggedIn) return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-lg py-2 px-2 rounded-lg hover:bg-lavender/10 hover:text-lavender transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-gray-200 my-2"></div>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-gray-700 font-medium">
                  {(user?.name && user.name.split(' ')[0]) || "User"}
                </span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="btn-secondary py-2 px-4 text-base font-semibold hover:bg-lavender/10 hover:text-lavender"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-2">
                <Link href="/login" className="btn-secondary py-2 px-4 text-base font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/signup" className="btn-primary py-2 px-4 text-base font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
