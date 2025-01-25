import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        //const response = await axios.post('http://localhost:5000/api/contact', formData);
        const response = await axios.get(`${API_URL}/api/contact`,formData);
        if (response.data) {
          setStatus('¡Mensaje enviado con éxito!');
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (error) {
        console.error('Error:', error);
        setStatus('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Contacto
        </h2>

        {/* Usamos la clase contact-form que definimos en globals.css */}
        <form onSubmit={handleSubmit} className="contact-form">
          {/* Grupo de campos del formulario */}
          <div className="form-group">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input" // Clase definida en globals.css
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input" // Clase definida en globals.css
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label 
              htmlFor="message" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-input" // Clase definida en globals.css
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Enviar Mensaje
          </button>

          {/* Mensaje de estado */}
          {status && (
            <div className={`mt-4 text-center text-sm ${
              status.includes('éxito') ? 'text-green-600' : 'text-red-600'
            }`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;