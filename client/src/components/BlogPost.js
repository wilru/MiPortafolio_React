import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const response = await axios.get(`${API_URL}/api/blog/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl text-gray-600">Post no encontrado</h2>
      </div>
    );
  }

  return (
    <article className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {post.image_url && (
          <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
          <span>Por {post.author_name}</span>
          <span>•</span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        <div 
            className="prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}

export default BlogPost;