import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../lib/config';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/tasks`, { withCredentials: true });
      setTasks(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, { title, description }, { withCredentials: true });
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to add task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/tasks/${task._id}`, { completed: !task.completed }, { withCredentials: true });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, { withCredentials: true });
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to delete task');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-slate-600 text-lg">Loading tasks...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">Tasks</h1>
          {error && <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 p-3 text-sm">{error}</div>}

          <form onSubmit={addTask} className="space-y-4 mb-8">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base"
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 text-base"
            />
            <button 
              type="submit" 
              className="px-4 py-2 rounded-md bg-green-500 font-medium text-white shadow-md hover:bg-green-600 hover:shadow-lg transition-all text-base"
            >
              Add Task +
            </button>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task._id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="h-5 w-5 mt-1 flex-shrink-0"
                  />
                  <div className={`flex-1 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                    <span className="font-medium text-base">{task.title}</span>
                    {task.description && (
                      <span className="text-slate-600 text-sm block mt-1">{task.description}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteTask(task._id)} 
                    className="px-3 py-2 font-medium rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-700 text-sm flex-shrink-0"
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

export default Tasks;

