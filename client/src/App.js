// import React from 'react';
// import './styles/globals.css'; // Importa primero los estilos
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Projects from './components/Projects';
// import Skills from './components/Skills';
// import Contact from './components/Contact';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main>
//         <Hero />
//         <Projects />
//         <Skills />
//         <Contact />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import Login from './components/Admin/Login';
import AdminPanel from './components/Admin/AdminPanel';
import PrivateRoute from './components/Admin/PrivateRoute';
import BlogPost from './components/BlogPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Projects />
              <Skills />
              <BlogList />
              <Contact />
            </main>
          } />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;