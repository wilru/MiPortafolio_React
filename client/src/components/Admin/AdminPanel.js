import React from 'react';
import CreatePost from './CreatePost';

function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="border-b border-gray-200 pb-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Panel de Administración
            </h3>
          </div>
          <div className="mt-6">
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;