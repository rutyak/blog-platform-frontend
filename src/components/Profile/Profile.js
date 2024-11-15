import React, { useState } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the drawer visibility
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    // Your logout logic goes here
    alert("Logging out...");
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <img
          src="https://bit.ly/dan-abramov"
          alt="User Avatar"
          className="w-12 h-12 rounded-full cursor-pointer hover:ring-4 ring-teal-500 transition-all duration-300"
          onClick={toggleDrawer}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end">
          <div className="relative h-full w-80 bg-black text-white shadow-lg transition-transform transform">
            <div className="flex justify-between items-center p-4 bg-teal-600 rounded-t-xl">
              <img
                src="https://bit.ly/dan-abramov"
                alt="User Avatar"
                className="w-20 h-20 rounded-full ring-4 ring-white mb-4"
              />
              <button
                onClick={toggleDrawer}
                className="text-white text-2xl hover:text-gray-300"
              >
                ×
              </button>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-xl text-gray-300">User Name</h2>
              <p className="text-gray-500 text-lg mt-2">user@example.com</p>
            </div>

            <div className="p-6 text-gray-300">
              <p className="mb-4">
                Here, you can manage your settings, view notifications, and more.
              </p>
            </div>

            <div className="p-4 border-t border-gray-700 mt-auto">
              <button
                onClick={logout}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
