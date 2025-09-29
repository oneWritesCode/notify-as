import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/posts`, { withCredentials: true });
      setPosts(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/posts`, { title, content }, { withCredentials: true });
      setPosts([res.data, ...posts]);
      setTitle('');
      setContent('');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to add post');
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`, { withCredentials: true });
      setPosts(posts.filter(p => p._id !== postId));
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to delete post');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-slate-600 text-lg">Loading posts...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">Posts</h1>
          {error && <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3 text-sm">{error}</div>}

          <form onSubmit={addPost} className="space-y-4 mb-8">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 resize-none rounded-md py-2 px-3 min-h-24 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base"
            />
            <button 
              type="submit" 
              className="px-4 py-2 rounded-md bg-blue-500 font-medium shadow-md text-white hover:bg-blue-600 hover:shadow-lg transition-all text-base"
            >
              Add Post +
            </button>
          </form>

          <div className="space-y-4">
            {posts.map(post => (
              <div key={post._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium text-lg mb-2">{post.title}</div>
                    <p className="text-slate-700 whitespace-pre-wrap text-sm sm:text-base">{post.content}</p>
                  </div>
                  <button 
                    onClick={() => deletePost(post._id)} 
                    className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm sm:text-base self-start sm:self-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

