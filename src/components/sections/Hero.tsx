import { motion } from "framer-motion";
import { usePortfolioConfig } from "../../hooks/usePortfolioConfig";
import {
  FaFile,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaMapPin,
  FaCode,
  FaRocket,
  FaLightbulb,
  FaInstagram,
} from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
import ParallaxBackground from "../ui/ParallaxBackground.tsx";
import { useState, useEffect } from "react";

const Hero = () => {
  const { personal, about } = usePortfolioConfig();
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Photographer",
    "Graphic Designer", 
    "Event Manager",
    "Visual Storyteller"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentRole.length) {
          setDisplayedText(currentRole.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayedText(currentRole.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentRoleIndex, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  
  const stats = [
    { number: "2+", label: "Years Experience", icon: FaCode },
    { number: "50+", label: "Events Captured", icon: FaRocket },
    { number: "15+", label: "Happy Clients", icon: FaLightbulb },
  ];

  return (
    <section
      id={"hero"}
      className="min-h-screen flex items-center justify-center bg-primary-100 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <ParallaxBackground />
      <motion.div
        className="w-full pt-16 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 max-w-7xl relative z-10 place-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center sm:text-left relative">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 blur-xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
          
          {/* Greeting with wave animation */}
          <motion.div
            className="mb-4 flex items-center justify-center sm:justify-start"
            variants={itemVariants}
          >
            <motion.span
              className="text-2xl mr-2"
              animate={{
                rotate: [0, 20, 0],
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                },
              }}
            >
              👋
            </motion.span>
            <span className="text-lg text-primary-600 font-medium">Hey, I'm</span>
          </motion.div>
          
          {/* Name with enhanced styling */}
          <motion.h1
            className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-7xl mb-6 font-bold text-primary-900 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            {personal.name}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </motion.h1>
          
          {/* Animated typing role */}
          <motion.div
            className="mb-6 h-8 flex items-center justify-center sm:justify-start"
            variants={itemVariants}
          >
            <span className="text-xl sm:text-2xl text-primary-600 font-medium">
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-6 bg-primary-600 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>
          
          {/* Enhanced description */}
          <motion.p
            className="body-text text-base sm:text-lg text-primary-700 mb-8 max-w-2xl mx-auto sm:mx-0 leading-relaxed"
            variants={itemVariants}
          >
            {personal.description}
          </motion.p>
          
          {/* Stats section */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto sm:mx-0"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-primary-200 hover:border-primary-300 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
              >
                <stat.icon className="text-primary-600 mx-auto mb-2" size={20} />
                <div className="text-xl font-bold text-primary-900">{stat.number}</div>
                <div className="text-xs text-primary-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 items-center sm:items-start"
            variants={itemVariants}
          >
            <motion.a
              href={about.resume}
              className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFile size={16} />
              Download Resume
            </motion.a>
            
            <motion.a
              href={`mailto:${personal.email}`}
              className="px-6 py-3 bg-transparent border-2 border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope size={16} />
              Let's Talk
            </motion.a>
          </motion.div>
          
          {/* Enhanced Social Icons */}
          <motion.div
            className="flex justify-center sm:justify-start space-x-4 mb-8"
            variants={itemVariants}
          >
            {personal.socials.slice(0, 4).map((social, index) => (
              <motion.div
                key={social.platform}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary-100 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                  {social.platform.toLowerCase() === "github" && (
                    <FaGithub
                      className="text-primary-600 group-hover:text-primary-800 transition-colors duration-300 relative z-10"
                      size={20}
                    />
                  )}
                  {social.platform.toLowerCase() === "linkedin" && (
                    <FaLinkedin
                      className="text-primary-600 group-hover:text-primary-800 transition-colors duration-300 relative z-10"
                      size={20}
                    />
                  )}
                  {social.platform.toLowerCase() === "twitter" && (
                    <FaXTwitter
                      className="text-primary-600 group-hover:text-primary-800 transition-colors duration-300 relative z-10"
                      size={20}
                    />
                  )}
                  {social.platform.toLowerCase() === "instagram" && (
                    <FaInstagram
                      className="text-primary-600 group-hover:text-primary-800 transition-colors duration-300 relative z-10"
                      size={20}
                    />
                  )}
                  {![
                    "github",
                    "linkedin",
                    "twitter",
                    "instagram",
                  ].includes(social.platform.toLowerCase()) && (
                    <FaGlobe
                      className="text-primary-600 group-hover:text-primary-800 transition-colors duration-300 relative z-10"
                      size={20}
                    />
                  )}
                </motion.a>
                
                {/* Enhanced Tooltip */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-primary-900 text-white px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ y: -10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {social.platform}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-900 rotate-45" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Column - Enhanced About Section */}
        <motion.div
          className="flex flex-col justify-center items-center relative"
          variants={itemVariants}
        >
          <motion.div
            className="relative bg-white p-8 rounded-2xl shadow-xl border border-primary-200 hover:border-primary-300 transition-all duration-300 max-w-md w-full"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Floating elements around the card */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-80"
              animate={{
                scale: [1, 1.3, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            <div className="text-center">
              <motion.h3
                className="text-2xl font-bold text-primary-900 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {about.title}
              </motion.h3>
              
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center space-x-3 text-primary-600">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <FaEnvelope size={16} />
                  </div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="hover:text-primary-800 transition-colors font-medium"
                  >
                    {personal.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 text-primary-600">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <FaMapPin size={16} />
                  </div>
                  <span className="font-medium">{personal.location}</span>
                </div>
              </motion.div>
              
              <motion.p
                className="text-primary-700 text-base leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                {about.description}
              </motion.p>
              
              {/* Availability Status */}
              <motion.div
                className="flex items-center justify-center space-x-2 text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span>Available for opportunities</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="hidden absolute bottom-8 lg:flex justify-center w-full z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-primary-600 text-sm font-medium group-hover:text-primary-800 transition-colors">
            Scroll to explore
          </span>
          <motion.div
            className="w-8 h-8 border-2 border-primary-600 rounded-full flex items-center justify-center group-hover:border-primary-800 transition-colors"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IoIosArrowDown size={16} className="text-primary-600 group-hover:text-primary-800 transition-colors" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

