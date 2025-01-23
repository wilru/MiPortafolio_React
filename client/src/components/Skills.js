import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="habilidades" className="skills py-20"> {/* Usando la clase CSS que definimos */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Mis Habilidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card"> {/* Usando la clase CSS que definimos */}
              <img 
                src={skill.icon_url} 
                alt={skill.name} 
                className="skill-card-image" /* Usando la clase CSS que definimos */
              />
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;