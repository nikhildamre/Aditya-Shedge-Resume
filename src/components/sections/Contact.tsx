import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapPin, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { usePortfolioConfig } from '../../hooks/usePortfolioConfig';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../config/emailjs';

interface Social {
  platform: string;
  url: string;
}

const Contact: React.FC = () => {
  const { personal } = usePortfolioConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Social media icon mapping
  const socialIcons: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
    'GitHub': FaGithub,
    'LinkedIn': FaLinkedin,
    'Twitter': FaTwitter,
    'Instagram': FaInstagram,
    'Facebook': FaFacebook,
    'YouTube': FaYoutube,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Check if EmailJS is configured
    if (emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY') {
      // Fallback to mailto if not configured
      const subject = `Portfolio Contact: Message from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('success');
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: personal.email,
        message: formData.message,
        subject: `Message from ${formData.name}`,
      };

      await emailjs.send(
        emailjsConfig.serviceId, 
        emailjsConfig.templateId, 
        templateParams, 
        emailjsConfig.publicKey
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 bg-primary-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-title font-bold text-primary-800 mb-6 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-primary-600 text-center mb-16 max-w-2xl mx-auto"
          >
            I'm always open to discussing new opportunities and interesting projects. Let's connect!
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-primary-900 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <FaEnvelope className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="text-primary-500 text-sm">Email</p>
                      <a
                        href={`mailto:${personal.email}`}
                        className="text-primary-800 font-medium hover:text-primary-600 transition-colors"
                      >
                        {personal.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <FaMapPin className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="text-primary-500 text-sm">Location</p>
                      <p className="text-primary-800 font-medium">{personal.location}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-primary-200">
                  <h4 className="text-lg font-semibold text-primary-900 mb-4">
                    Connect with me
                  </h4>
                  <div className="flex space-x-4">
                    {personal.socials.slice(0, 4).map((social: Social) => {
                      const IconComponent = socialIcons[social.platform];
                      return (
                        <motion.a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-100 p-3 rounded-full hover:bg-primary-200 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {IconComponent ? (
                            <IconComponent className="text-primary-600" size={20} />
                          ) : (
                            <span className="text-primary-600 font-medium">
                              {social.platform[0]}
                            </span>
                          )}
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-primary-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-primary-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-primary-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isSubmitting 
                      ? 'bg-primary-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <FaPaperPlane size={16} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center font-medium"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center font-medium"
                  >
                    ❌ Failed to send message. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Setup Instructions */}
          {emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY' && (
            <motion.div
              variants={itemVariants}
              className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
            >
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                📧 Contact Form Status: Using Email Client
              </h4>
              <p className="text-blue-700 text-sm">
                The contact form currently opens your default email client. To enable direct email sending:
              </p>
              <div className="mt-3 text-blue-700 text-sm">
                <p className="font-medium">Quick Setup (5 minutes):</p>
                <ol className="ml-4 list-decimal space-y-1 mt-1">
                  <li>Visit <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">emailjs.com</a> and create a free account</li>
                  <li>Add Gmail service and connect nikhildamre17@gmail.com</li>
                  <li>Create a template with the provided template code</li>
                  <li>Update the values in <code className="bg-blue-100 px-1 rounded">src/config/emailjs.ts</code></li>
                </ol>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
