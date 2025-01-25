import React from 'react';

function Hero() {
  return (
    <section className="hero relative overflow-hidden min-h-screen flex items-center justify-center" id="inicio">
      {/* Fondo con patrón geométrico */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.514 8.485 20.93 9.9l8.485-8.485h-1.414zM32.658 0l-8.485 8.485L25.587 9.9l8.485-8.485h-1.414zm5.656 0l-8.485 8.485L31.243 9.9l8.485-8.485h-1.414zm5.656 0l-8.485 8.485L36.9 9.9l8.484-8.485h-1.414zm5.657 0l-8.485 8.485L42.556 9.9 51.04 1.414 49.627 0zm5.657 0l-8.485 8.485L48.213 9.9l8.485-8.485h-1.414zM0 5.373l.828-.828L2.243 5.96 0 8.2V5.374zm0 5.656l.828-.828L2.243 11.62 0 13.86V11.03zm0 5.657l.828-.828L2.243 17.277 0 19.517v-2.827zm0 5.657l.828-.828L2.243 22.934 0 25.174v-2.827zm0 5.657l.828-.828L2.243 28.59 0 30.83v-2.827zm0 5.657l.828-.828L2.243 34.248 0 36.488v-2.827zm0 5.657l.828-.828L2.243 39.905 0 42.145v-2.827zm0 5.657l.828-.828L2.243 45.562 0 47.802v-2.827zm0 5.657l.828-.828L2.243 51.22 0 53.46v-2.827zM0 0h60v60H0V0z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Gradiente superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90" />
      
      <div className="hero-content relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight">
          WILMAR RUIZ
        </h1>
        <p className="text-xl md:text-3xl mb-8 text-blue-100">
          Ingeniero de Sistemas, Desarrollador Web Full Stack
        </p>
        <button 
          onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        >
          Contáctame
        </button>
      </div>
    </section>
  );
}

export default Hero;