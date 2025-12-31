"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import StackIcon from "tech-stack-icons";

// Mapping for tech-stack-icons package (only icons that exist in the package)
const TechStackIconNames: Record<string, string> = {
  Python: "python",
  TypeScript: "typescript",
  JavaScript: "js",
  Rust: "rust",
  "Next.js": "nextjs2",
  TailwindCSS: "tailwindcss",
  "Node.js": "nodejs",
  PostgreSQL: "postgresql",
  PyTorch: "pytorch",
  Docker: "docker",
  Kubernetes: "kubernetes",
};

// Fallback URLs from techicons.dev (hosted on icon.icepanel.io)
const TechIconUrls: Record<string, string> = {
  Python: "https://icon.icepanel.io/Technology/svg/Python.svg",
  TypeScript: "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
  JavaScript: "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
  React: "https://icon.icepanel.io/Technology/svg/React.svg",
  "Next.js": "https://icon.icepanel.io/Technology/svg/Next.js.svg",
  TailwindCSS: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg",
  "Node.js": "https://icon.icepanel.io/Technology/svg/Node.js.svg",
  FastAPI: "https://icon.icepanel.io/Technology/svg/FastAPI.svg",
  PostgreSQL: "https://icon.icepanel.io/Technology/svg/PostgresSQL.svg",
  TensorFlow: "https://icon.icepanel.io/Technology/svg/TensorFlow.svg",
  PyTorch: "https://icon.icepanel.io/Technology/svg/PyTorch.svg",
  Docker: "https://icon.icepanel.io/Technology/svg/Docker.svg",
  Kubernetes: "https://icon.icepanel.io/Technology/svg/Kubernetes.svg",
  "Google Cloud": "https://icon.icepanel.io/Technology/svg/Google-Cloud.svg",
  Rust: "https://icon.icepanel.io/Technology/svg/Rust.svg",
};

// Set to true to use tech-stack-icons package, false to use URL-based icons
const USE_TECH_STACK_ICONS = true;

// Icon component that supports both sources
function TechIcon({ name }: { name: string }) {
  const stackIconName = TechStackIconNames[name];
  const iconUrl = TechIconUrls[name];

  if (USE_TECH_STACK_ICONS && stackIconName) {
    return <StackIcon name={stackIconName} className="w-8 h-8" />;
  }

  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt={name}
        width={32}
        height={32}
        className="w-8 h-8"
      />
    );
  }

  // Fallback to first letter if no icon found
  return (
    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white font-bold">
      {name.charAt(0)}
    </div>
  );
}

interface TechItem {
  name: string;
  category: string;
  level: number;
}

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

const techStack: TechItem[] = [
  { name: "Python", category: "Languages", level: 95 },
  { name: "TypeScript", category: "Languages", level: 90 },
  { name: "JavaScript", category: "Languages", level: 92 },
  { name: "Rust", category: "Languages", level: 75 },
  { name: "React", category: "Frontend", level: 90 },
  { name: "Next.js", category: "Frontend", level: 88 },
  { name: "TailwindCSS", category: "Frontend", level: 92 },
  { name: "Node.js", category: "Backend", level: 85 },
  { name: "FastAPI", category: "Backend", level: 88 },
  { name: "PostgreSQL", category: "Database", level: 82 },
  { name: "TensorFlow", category: "ML/AI", level: 90 },
  { name: "PyTorch", category: "ML/AI", level: 88 },
  { name: "Scikit-learn", category: "ML/AI", level: 80 },
  { name: "Docker", category: "DevOps", level: 80 },
  { name: "Kubernetes", category: "DevOps", level: 70 },
  { name: "Google Cloud", category: "DevOps", level: 75 },
];

const experiences: ExperienceItem[] = [
  {
    year: "2023-Now",
    title: "Freelance ML/AI Engineer",
    company: "Freelance",
    description:
      "Freelancing in various platform from developing AI solution and ML Model to delivering production-ready end-to-end product.",
    technologies: ["Python", "Scikit-learn", "Pytorch", "TensorFlow", "n8n", "Docker", "Google Cloud"],
  },
  {
    year: "2025-Now",
    title: "Research & Analyst",
    company: "KSPM FV ITS",
    description:
      "Conducting research on machine learning algorithms and data analysis to support academic projects and publications in Indonesia equity stock market.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    year: "2024-2025",
    title: "Founder & Tech Lead",
    company: "Prodigy",
    description:
      "Creating an AI-powered learning platform to provide personalized tutor experiences for SNBT university entrance exam for highschool student.",
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js", "Tensor Flow", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    year: "2024",
    title: "Software Engineer Intern",
    company: "Molca",
    description:
      "Contributed to frontend development and learned best practices in agile software development.",
    technologies: [ "Vue.Js", "TailwindCSS", "Firebase", "Git"],
  },
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  const categories = ["All", ...new Set(techStack.map((t) => t.category))];

  const filteredTech =
    activeCategory === "All"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section
      id="tech-stack"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900/50 to-black" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack & Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Tech Stack */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-white mb-8"
            >
              Technical Skills
            </motion.h3>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Tech Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {filteredTech.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="mb-2">
                    <TechIcon name={tech.name} />
                  </div>
                  <h4 className="text-white font-medium">{tech.name}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-white mb-8"
            >
              Professional Journey
            </motion.h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-blue-400 to-transparent" />

              {/* Experience items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredExp(index)}
                    onMouseLeave={() => setHoveredExp(null)}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      animate={{
                        scale: hoveredExp === index ? 1.5 : 1,
                        boxShadow:
                          hoveredExp === index
                            ? "0 0 20px rgba(59, 130, 246, 0.8)"
                            : "0 0 0px rgba(59, 130, 246, 0)",
                      }}
                      className="absolute left-2 top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"
                    />

                    {/* Content card */}
                    <motion.div
                      animate={{
                        borderColor:
                          hoveredExp === index
                            ? "rgba(59, 130, 246, 0.5)"
                            : "rgba(55, 65, 81, 0.5)",
                      }}
                      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-3">
                        {exp.year}
                      </span>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-blue-400 mb-3">{exp.company}</p>
                      <p className="text-gray-400 text-sm mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
