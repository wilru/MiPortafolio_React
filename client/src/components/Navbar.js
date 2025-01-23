import React from 'react';

function Navbar() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Mi Portafolio</h1>
          <div className="hidden md:flex space-x-8">
            {['inicio', 'proyectos', 'habilidades', 'blog', 'contacto'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-white hover:text-blue-200 transition duration-300 capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;