import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreatePost from '../Post/CreatePost';
import { CircularProgress } from '@mui/material'; // Importing Material-UI's CircularProgress for loading spinner

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${Base_url}/fetch/post`);
        setPosts(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="text-center py-12 bg-primary text-white rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blogging Platform</h1>
        <p className="text-lg mb-6">
          Discover, create, and share your thoughts with the world!
        </p>
        <CreatePost />
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Posts</h2>
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <CircularProgress size={30} color="primary" /> {/* Displaying loading spinner */}
            <span>Loading posts...</span>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <div key={post._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{post.content}</p>
                <Link
                  className="inline-block mt-4 bg-teal-500 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-teal-600 transition"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No posts available. Be the first to create one!</p>
        )}
      </section>
    </div>
  );
}

export default Home;
