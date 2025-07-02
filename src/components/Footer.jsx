// src/components/Footer.jsx
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaTripadvisor, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Hotel Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Hotel Paraíso</h3>
            <p className="mb-6 leading-relaxed">
              Un refugio de lujo donde la elegancia se encuentra con la comodidad. 
              Experimente el más alto nivel de hospitalidad en el corazón de la ciudad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTripadvisor size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-indigo-400" />
                <span>Carrera 10 #25-35, Cartagena, Colombia</span>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-3 text-indigo-400" />
                <span>+57 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <FiMail className="mt-1 mr-3 text-indigo-400" />
                <span>reservas@hotelparaiso.com</span>
              </li>
              <li className="flex items-start">
                <FiClock className="mt-1 mr-3 text-indigo-400" />
                <span>Recepción 24/7</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Habitaciones & Suites</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restaurante & Bar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spa & Bienestar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eventos & Reuniones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Galería</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ofertas Especiales</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="mb-4">
              Suscríbase para recibir ofertas exclusivas y noticias sobre nuestros servicios.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Su correo electrónico" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2 px-6 rounded hover:from-indigo-700 hover:to-indigo-800 transition-all"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Hotel Paraíso. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Mapa del Sitio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;