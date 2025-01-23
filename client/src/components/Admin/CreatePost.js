// import React, { useState } from 'react';
// import axios from 'axios';

// function CreatePost() {
//   const [post, setPost] = useState({
//     title: '',
//     content: '',
//     image_url: ''
//   });
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/blog', post, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setStatus('Post creado exitosamente');
//       setPost({ title: '', content: '', image_url: '' });
//     } catch (error) {
//       setStatus('Error al crear el post: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Crear Nueva Entrada</h2>
//       {status && (
//         <div className={`p-4 mb-4 rounded ${
//           status.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//         }`}>
//           {status}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Título
//           </label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             required
//             value={post.title}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700">
//             Contenido
//           </label>
//           <textarea
//             name="content"
//             id="content"
//             rows="6"
//             required
//             value={post.content}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
//             URL de la imagen
//           </label>
//           <input
//             type="url"
//             name="image_url"
//             id="image_url"
//             value={post.image_url}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Publicar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreatePost;
//Agregó funciones para texto enriquecido:

import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar estilos

function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image_url: ''
  });
  const [status, setStatus] = useState('');

  // Configuración de la barra de herramientas de Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'blockquote', 'code-block',
    'color', 'background'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/blog', post, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStatus('Post creado exitosamente');
      setPost({ title: '', content: '', image_url: '' });
    } catch (error) {
      setStatus('Error al crear el post: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleContentChange = (content) => {
    setPost({ ...post, content });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Crear Nueva Entrada</h2>
      {status && (
        <div className={`p-4 mb-4 rounded ${
          status.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido
          </label>
          <ReactQuill
            value={post.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="h-64 mb-12" // Espacio extra para el editor
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            URL de la imagen
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            value={post.image_url}
            onChange={(e) => setPost({ ...post, image_url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CreatePost;