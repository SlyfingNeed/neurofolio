"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  caption: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Agentic Web Scraper",
    caption: "An advanced web scraping tool that utilizes autonomous agents to intelligently navigate and extract data from complex websites with dynamic content using Google Gemini, FastAPI, PlayWright.",
    description:
      ".",
    thumbnail: "/projects/neural-vision.jpg",
    technologies: ["Python", "FastAPI", "RestAPI","PlayWright"],
    link: "https://github.com/SlyfingNeed/Agentic-Web-Scraper",
    github: "https://github.com/SlyfingNeed/Agentic-Web-Scraper",
  },
  {
    id: 2,
    title: "Regime-adaptive Mean Reversion Transformer Portfolio Model",
    caption: "Predictive stock portfolio modeling using Transformer architecture with volatility regime adaptation and mean reversion. ",
    description:
      "A comprehensive transformer model investment strategy.",
    thumbnail: "/projects/analytics.jpg",
    technologies: ["Python", "Scikit-learn", "Tensorflow"],
    link: "https://github.com/SlyfingNeed/transformer-mr-model",
    github: "https://github.com/SlyfingNeed/transformer-mr-model",
  },
  {
    id: 3,
    title: "Social Media AI Automation Workflow",
    caption: "AI-driven social media content generation and post-scheduling through Instagram, Facebook, Tiktok using n8n and DALL-E.",
    description:
      "An experimental framework exploring the intersection of quantum computing and machine learning for solving complex optimization problems.",
    thumbnail: "/projects/quantum.jpg",
    technologies: ["n8n", "Meta Graph API", "DALL-E", "OpenAI API"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Filmo AI: Smart Movie & TV Series Search Engine",
    caption: "AI-powered search engine for searching movies, TV series, docummentation, just from the description or actor/producer involved.",
    description:
      "A sophisticated chatbot engine using transformer models for natural, context-aware conversations with multi-language support.",
    thumbnail: "/projects/chatbot.jpg",
    technologies: ["Next.Js", "Gemini API", "Redis", "Supabase"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Smart Operation & Finance Manager Chatbot Workflow",
    caption: "AI assistant for automating operation and finance management tasks such as data entry, record, analytics, through speech recognition in WhatsApp & Telegram.",
    description:
      "A platform that automates the entire ML pipeline from data preprocessing to model deployment, reducing development time by 70%.",
    thumbnail: "/projects/automl.jpg",
    technologies: ["TTSAPI", "n8n", "Meta Graph API", "Google Cloud API"],
    link: "https://sevajaya.app.n8n.cloud/workflow/gr2QCSPsKWDAtrXk",
    github: "https://sevajaya.app.n8n.cloud/workflow/gr2QCSPsKWDAtrXk",
  },
  {
    id: 6,
    title: "Prodigy: SNBT AI Learning Platform",
    caption: "AI-powered personalized learning platform for SNBT exam preparation with adaptive quizzes, progress tracking, Smart Tutor, and IRT Analysis. All in which deployed microservice on Kubernetes Cluster.",
    description:
      "A toolkit for optimizing and deploying machine learning models on edge devices with minimal latency and resource usage.",
    thumbnail: "/projects/edge-ai.jpg",
    technologies: ["Scikit-learn", "Next.Js", "Redis", "FastAPI", "Docker", "Kubernetes", "FireDB"],
    link: "#",
    github: "#",
  },
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-gray-900/30 to-black" />

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
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in machine learning,
            web development, and system design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="project-card group"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {/* Project 1 uses emoji, others use actual images */}
                  {project.id === 1 ? (
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30 flex items-center justify-center">
                      <span className="text-6xl">👁️</span>
                    </div>
                  ) : (
                    <Image
                      src={`/projectThumbnail/id${project.id}.png`}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                    />
                  )}
                  
                  {/* Animated overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
                  >
                    <div className="flex gap-4">
                      {project.link && (
                        <motion.a
                          href={project.link}
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ delay: 0.1 }}
                          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          href={project.github}
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ delay: 0.2 }}
                          className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>

                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.caption}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs border border-gray-600/50 hover:border-blue-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-transparent border border-gray-600 text-white rounded-full hover:bg-blue-500 hover:border-blue-500 transition-all duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
