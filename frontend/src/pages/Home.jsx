import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/config";

const Home = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(res.data);
        console.log(user);
      } catch (e) {
        setUser(null);
      }
    };
    loadUser();
    
  }, []);

  return user ? (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 border-b border-gray-300 pb-2">Dashboard</h1>
         
          {user && (
            <>
              <div className="space-y-2 sm:space-y-1 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-lg sm:text-xl">
                  Hello, <span className="font-medium text-gray-900">{user.username}</span>
                </h2>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>
              <p className="text-xl text-black font-bold mt-4">
                Happy to see you again!
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-yellow-300 shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-bold capitalize mb-2">Notes</h3>
            <p className="text-sm text-slate-700 mb-2">Write your notes here.</p>
            <p className="text-sm text-slate-700 mb-4">
              Write and see your beautiful notes and memories...
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/notes"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                Create +
              </Link>
              <Link
                to="/notes"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                See All
              </Link>
            </div>
          </div>

          <div className="bg-green-100 shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-bold capitalize mb-2">Tasks</h3>
            <p className="text-sm text-slate-700 mb-2">
              Write your daily tasks here.
            </p>
            <p className="text-sm text-slate-700 mb-4">
              Write and complete your beautiful daily tasks and be disciplined...
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/tasks"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                Create +
              </Link>
              <Link
                to="/tasks"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                See All
              </Link>
            </div>
          </div>

          <div className="bg-blue-100 shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-bold capitalize mb-2">Posts</h3>
            <p className="text-sm text-slate-700 mb-2">Make posts here.</p>
            <p className="text-sm text-slate-700 mb-4">
              Write and see your beautiful posts and memories...
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/posts"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                Create +
              </Link>
              <Link
                to="/posts"
                className="cursor-pointer px-3 py-2 shadow-md font-medium capitalize rounded-md bg-slate-800 text-white hover:bg-slate-900 text-center text-sm"
              >
                See All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Welcome to TaskManager</h1>
          <p className="text-slate-600 text-lg">Please login or register to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
