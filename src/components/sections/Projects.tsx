import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaPlay, FaInstagram } from "react-icons/fa";
import { usePortfolioConfig } from "../../hooks/usePortfolioConfig.tsx";
import { useState } from "react";

const Projects = () => {
  const { projects } = usePortfolioConfig();
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter projects based on showAll state
  const displayedProjects = showAll 
    ? projects 
    : projects.filter((project: any) => project.featured);

  const openGallery = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

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
            {showAll ? "All Projects" : "Featured Work"}
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-lg text-primary-600 text-center mb-12 max-w-2xl mx-auto"
          >
            {showAll 
              ? "A complete showcase of my photography, design, and event management work" 
              : "A curated selection of my best photography and creative projects"
            }
          </motion.p>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedProjects.map((project: any, index: number) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaStar size={12} />
                    Featured
                  </div>
                )}
                
                {/* Gallery/Reels Badge */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaImages size={12} />
                    {project.gallery.length} Photos
                  </div>
                )}
                {project.reels && project.reels.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaPlay size={12} />
                    {project.reels.length} Reels
                  </div>
                )}
                
                {/* Project Image - Adaptive Layout */}
                <div className="relative overflow-hidden cursor-pointer bg-gradient-to-br from-primary-50 to-primary-100 aspect-[4/3] flex items-center justify-center" onClick={() => openGallery(project)}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(project);
                      }}
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {project.reels ? <FaPlay size={20} /> : <FaImages size={20} />}
                    </motion.button>
                    {project.reels && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaInstagram size={20} />
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    {project.url && project.url !== "#" && !project.reels && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info - Flexible Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary-900 group-hover:text-primary-700 transition-colors duration-300 flex-1 pr-2">
                      {project.title}
                    </h3>
                    <span className="text-xs text-primary-500 font-medium whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>

                  {project.duration && (
                    <p className="text-sm text-primary-500 mb-3 font-medium">
                      {project.duration}
                    </p>
                  )}

                  <p className="text-primary-600 leading-relaxed mb-4 flex-1 text-sm line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 4).map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                        +{project.tags.length - 4} more
                      </span>
                    )}
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

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full max-w-7xl flex flex-col bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {/* Image/Reel Display - Full Screen */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                {selectedProject.reels && selectedProject.reels.length > 0 ? (
                  // Display Instagram Reels - Clean Gallery Style
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-full overflow-y-auto scrollbar-hide">
                      {selectedProject.reels.map((reelUrl: string, index: number) => (
                        <motion.a
                          key={index}
                          href={reelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] shadow-2xl"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {/* Instagram-style gradient border */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                          
                          {/* Content */}
                          <div className="relative z-10 flex flex-col items-center justify-center text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:bg-white/30 transition-colors">
                              <FaPlay size={28} />
                            </div>
                            
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-4 group-hover:bg-white/30 transition-colors">
                              <FaInstagram size={24} />
                            </div>
                            
                            <h4 className="font-bold text-lg mb-2">Reel {index + 1}</h4>
                            <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                              Click to watch on Instagram
                            </p>
                          </div>
                          
                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Display Regular Images
                  <img
                    src={selectedProject.gallery && selectedProject.gallery.length > 0 
                      ? selectedProject.gallery[currentImageIndex] 
                      : selectedProject.image}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                )}

                {/* Navigation Arrows - Only for image galleries */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && !selectedProject.reels && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors z-10"
                    >
                      <FaChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors z-10"
                    >
                      <FaChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter - Only for image galleries */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && !selectedProject.reels && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-10">
                    {currentImageIndex + 1} / {selectedProject.gallery.length}
                  </div>
                )}

                {/* Reels Counter */}
                {selectedProject.reels && selectedProject.reels.length > 0 && (
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm z-10 flex items-center gap-2 shadow-lg">
                    <FaPlay size={14} />
                    <span className="font-medium">{selectedProject.reels.length} Instagram Reels</span>
                  </div>
                )}
              </div>

              {/* Project Info - Bottom Panel */}
              <div className="bg-white p-6 max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-primary-900">
                    {selectedProject.title}
                  </h3>
                  <span className="text-sm text-primary-500 font-medium">
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-primary-600 leading-relaxed mb-4">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery - Bottom */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="bg-gray-100 p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                    <button
                      onClick={() => setCurrentImageIndex(-1)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center ${
                        currentImageIndex === -1 ? 'border-primary-500' : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={selectedProject.image}
                        alt="Cover"
                        className="max-w-full max-h-full object-contain"
                      />
                    </button>
                    {selectedProject.gallery.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center ${
                          currentImageIndex === index ? 'border-primary-500' : 'border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
