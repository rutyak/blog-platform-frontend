import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Dashboard() {
  const { userData } = useAuth(); 
  console.log("userData:::::: ",userData);
  console.log("userData from context: ",userData);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${Base_url}/fetch/post/${userData._id}`);
        console.log("datadatadata: ",data);
        setPosts(data);
      } catch (error) {
        toast.error("Failed to fetch posts. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    };
    if (userData?._id) fetchPosts();
  }, [userData]);

  // Confirm delete post
  const confirmDelete = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  // Handle delete post
  const deletePost = async () => {
    try {
      await axios.delete(`${Base_url}/api/posts/${selectedPost._id}`);
      setPosts(posts.filter((post) => post._id !== selectedPost._id));
      toast.success(`${selectedPost.title} has been deleted.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setIsOpen(false);
      setSelectedPost(null);
    } catch (error) {
      toast.error("Error deleting post. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">My Posts</h2>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold text-teal-600">{post.title}</h3>
            <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
            <div className="border-t border-gray-200 my-3"></div>
            <button
              className="text-red-600 text-sm font-semibold"
              onClick={() => confirmDelete(post)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold">Delete Post</h3>
            <p className="mt-2">
              Are you sure you want to delete "{selectedPost?.title}"? This
              action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
