"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
    title: "Neural Vision AI",
    caption: "Real-time object detection and tracking system",
    description:
      "An advanced computer vision system using deep learning for real-time object detection, tracking, and classification with 98% accuracy.",
    thumbnail: "/projects/neural-vision.jpg",
    technologies: ["Python", "TensorFlow", "OpenCV", "CUDA"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Smart Analytics Dashboard",
    caption: "Business intelligence platform with ML insights",
    description:
      "A comprehensive analytics platform that processes large datasets and provides actionable insights using machine learning algorithms.",
    thumbnail: "/projects/analytics.jpg",
    technologies: ["React", "Node.js", "Python", "PostgreSQL"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Quantum ML Framework",
    caption: "Quantum computing meets machine learning",
    description:
      "An experimental framework exploring the intersection of quantum computing and machine learning for solving complex optimization problems.",
    thumbnail: "/projects/quantum.jpg",
    technologies: ["Python", "Qiskit", "PyTorch", "NumPy"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "NLP Chatbot Engine",
    caption: "Context-aware conversational AI system",
    description:
      "A sophisticated chatbot engine using transformer models for natural, context-aware conversations with multi-language support.",
    thumbnail: "/projects/chatbot.jpg",
    technologies: ["Python", "Transformers", "FastAPI", "Redis"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "AutoML Platform",
    caption: "Automated machine learning pipeline builder",
    description:
      "A platform that automates the entire ML pipeline from data preprocessing to model deployment, reducing development time by 70%.",
    thumbnail: "/projects/automl.jpg",
    technologies: ["Python", "Scikit-learn", "Docker", "Kubernetes"],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Edge AI Deployment",
    caption: "ML models optimized for edge devices",
    description:
      "A toolkit for optimizing and deploying machine learning models on edge devices with minimal latency and resource usage.",
    thumbnail: "/projects/edge-ai.jpg",
    technologies: ["TensorFlow Lite", "ONNX", "C++", "Rust"],
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
                  <div
                    className="absolute inset-0 bg-linear-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  
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

                  {/* Project icon/visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: hoveredProject === project.id ? 0.8 : 1,
                        opacity: hoveredProject === project.id ? 0.3 : 1,
                      }}
                      className="text-6xl"
                    >
                      {project.id === 1 && "👁️"}
                      {project.id === 2 && "📊"}
                      {project.id === 3 && "⚛️"}
                      {project.id === 4 && "💬"}
                      {project.id === 5 && "🤖"}
                      {project.id === 6 && "📱"}
                    </motion.div>
                  </div>
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
