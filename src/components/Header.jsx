// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { FaTripadvisor, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      label: 'Inicio', 
      href: '#home',
    },
    { 
      label: 'Habitaciones', 
      href: '#rooms',
      submenu: [
        { label: 'Habitación Deluxe', href: '#deluxe' },
        { label: 'Suite Ejecutiva', href: '#executive' },
        { label: 'Suite Presidencial', href: '#presidential' }
      ]
    },
    { 
      label: 'Servicios', 
      href: '#services',
      submenu: [
        { label: 'Spa & Bienestar', href: '#spa' },
        { label: 'Restaurante Gourmet', href: '#restaurant' },
        { label: 'Salón de Eventos', href: '#events' }
      ]
    },
    { 
      label: 'Experiencias', 
      href: '#experiences' 
    },
    { 
      label: 'Galería', 
      href: '#gallery' 
    },
    { 
      label: 'Contacto', 
      href: '#contact' 
    }
  ];

  return (
    <>
      {/* Top info bar */}

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-xl' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a 
              href="/" 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-3xl font-serif font-bold text-indigo-900 tracking-tight">PARAÍSO</span>
              <span className="ml-2 text-xs font-light text-indigo-600 hidden md:block mt-1">MAICAO HOTEL & RESORT</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <a 
                    href={item.href} 
                    className={`flex items-center px-5 py-2 text-gray-800 hover:text-indigo-700 font-medium transition-colors ${hoveredNav === item.label ? 'text-indigo-700' : ''}`}
                  >
                    {item.label}
                    {item.submenu && <FiChevronDown className="ml-1" />}
                  </a>

                  {item.submenu && (
                    <AnimatePresence>
                      {hoveredNav === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full pt-2 w-56"
                        >
                          <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                            {item.submenu.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
            <motion.button 
              onClick={() => navigate('/historial')}
              className="ml-4 bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition"
            >
              Ver Historial
            </motion.button>


            {/* Mobile menu button */}
            <button 
              className="xl:hidden text-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-white shadow-xl overflow-hidden"
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <a 
                      href={item.href} 
                      className="block py-3 text-lg text-gray-800 hover:text-indigo-700 font-medium border-b border-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    {item.submenu && (
                      <div className="pl-4 mt-1 space-y-2">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block py-2 text-gray-600 hover:text-indigo-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  className="w-full mt-4 bg-gradient-to-r from-indigo-700 to-indigo-800 text-white px-8 py-3 rounded-full font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reservar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;