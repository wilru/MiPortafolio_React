import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>Email: wilru25@gmail.com</li>
              <li>Teléfono: +57 3206835182</li>
              <li>Ubicación: Palmira, Valle del Cauca, Colombia</li>
            </ul>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="hover:text-blue-200 transition duration-300">Inicio</a></li>
              <li><a href="#proyectos" className="hover:text-blue-200 transition duration-300">Proyectos</a></li>
              <li><a href="#habilidades" className="hover:text-blue-200 transition duration-300">Habilidades</a></li>
              <li><a href="#blog" className="hover:text-blue-200 transition duration-300">Blog</a></li>
              <li><a href="#contacto" className="hover:text-blue-200 transition duration-300">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sígueme</h3>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/wilru25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/wilru25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition duration-300"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/wilru25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-500/30 text-center">
          <p>&copy; {currentYear} Wilmar Ruiz. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;