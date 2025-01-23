// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function BlogList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/blog');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching blog posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <section id="blog" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-12 text-primary">Blog</h2>
//         <div className="grid grid-cols-1 gap-12">
//           {posts.map((post) => (
//             <article 
//               key={post.id} 
//               className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
//             >
//               {post.image_url && (
//                 <div className="relative h-[400px] w-full">
//                   <img 
//                     src={post.image_url} 
//                     alt={post.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold mb-4 text-gray-800">
//                   {post.title}
//                 </h3>
//                 <div className="prose max-w-none mb-6 text-gray-600">
//                   {post.content}
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
//                   <div className="flex items-center space-x-2">
//                     <span className="font-medium">Por:</span>
//                     <span>{post.author_name}</span>
//                   </div>
//                   <time dateTime={post.created_at}>
//                     {new Date(post.created_at).toLocaleDateString('es-ES', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </time>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default BlogList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Importa Link para la navegación
import axios from 'axios';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // Número de posts por página

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Cálculos para la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Blog</h2>
        <div className="grid grid-cols-1 gap-12">
          {currentPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              {post.image_url && (
                <div className="relative h-[400px] w-full">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {post.title}
                </h3>
                <div className="prose max-w-none mb-6 text-gray-600">
                  {post.content.substring(0, 300)}... {/* Limitamos el contenido */}
                </div>
                <div className="flex items-center justify-between mt-6 border-t pt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Por: {post.author_name}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogList;