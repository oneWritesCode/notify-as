import React from "react";
import axios from "axios";
import { API_BASE_URL } from '../lib/config';

const Profile = () => {
  const [user, setUser] = React.useState(null);

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      await axios.delete(`${API_BASE_URL}/users/me`, {
        withCredentials: true,
      });
      setUser(null);
    }
  };

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (e) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  if (!user) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-slate-600 text-lg">Loading profile...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 border-b border-gray-200 pb-2">
            User Profile
          </h1>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700 mb-1 sm:mb-0">Username:</span>
              <span className="text-gray-900 text-lg">{user.username}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700 mb-1 sm:mb-0">Email:</span>
              <span className="text-gray-900 text-lg break-all">{user.email}</span>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end mt-8">
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium text-base"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
