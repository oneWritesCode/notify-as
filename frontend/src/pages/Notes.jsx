import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotes = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/notes`, { withCredentials: true });
      setNotes(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/notes`, { title, content }, { withCredentials: true });
      setNotes([res.data, ...notes]);
      setTitle('');
      setContent('');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to add note');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${noteId}`, { withCredentials: true });
      setNotes(notes.filter(n => n._id !== noteId));
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to delete note');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-slate-600 text-lg">Loading notes...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">Notes</h1>
          {error && <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3 text-sm">{error}</div>}

          <form onSubmit={addNote} className="space-y-4 mb-8">
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
              className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-24 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 resize-none text-base"
            />
            <button 
              type="submit" 
              className="px-4 py-2 rounded-md bg-yellow-200 text-black font-medium shadow-md hover:bg-yellow-300 hover:shadow-lg transition-all text-base"
            >
              Add Note +
            </button>
          </form>

          <div className="space-y-4">
            {notes.map(note => (
              <div key={note._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium text-lg mb-2">{note.title}</div>
                    <p className="text-slate-700 whitespace-pre-wrap text-sm sm:text-base">{note.content}</p>
                  </div>
                  <button 
                    onClick={() => deleteNote(note._id)} 
                    className="px-3 py-2 font-medium rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-700 text-sm sm:text-base self-start sm:self-auto"
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

export default Notes;

