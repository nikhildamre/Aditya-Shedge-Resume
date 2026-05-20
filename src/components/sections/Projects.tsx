import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { usePortfolioConfig } from "../../hooks/usePortfolioConfig.tsx";
import { useState } from "react";

const Projects = () => {
  const { projects } = usePortfolioConfig();
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on showAll state
  const displayedProjects = showAll 
    ? projects 
    : projects.filter((project: any) => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.8, 
      rotateX: 15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      } 
    },
    hover: {
      y: -10,
      scale: 1.02,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id={"projects"}
      className="min-h-screen py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-title font-bold text-primary-800 mb-6 text-center"
            whileHover={{ scale: 1.02 }}
          >
            {showAll ? "All Projects" : "Featured Projects"}
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-lg text-primary-600 text-center mb-12 max-w-2xl mx-auto"
          >
            {showAll 
              ? "A complete showcase of my work and personal projects" 
              : "A showcase of my recent work and personal projects"
            }
          </motion.p>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedProjects.map((project: any, index: number) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaStar size={12} />
                    Featured
                  </div>
                )}
                
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    {project.url && project.url !== "#" && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-primary-900 group-hover:text-primary-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-primary-500 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-primary-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More/Less Button */}
          <motion.div
            className="text-center mt-12"
            variants={cardVariants}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-800 text-white font-medium rounded-full hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? "Show Less" : `View All Projects (${projects.length})`}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
