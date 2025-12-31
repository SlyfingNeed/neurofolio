"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-center items-center space-x-12">
          <Link
            href="#home"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm tracking-widest"
          >
            HOME
          </Link>
          <Link
            href="#tech-stack"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm tracking-widest"
          >
            TECH STACK
          </Link>
          <Link
            href="#projects"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm tracking-widest"
          >
            PROJECTS
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
