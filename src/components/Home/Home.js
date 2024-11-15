import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatePost from '../Post/CreatePost';

function Home() {
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'Exploring JavaScript ES6 Features',
      content: 'Learn about the new features introduced in JavaScript ES6 including arrow functions, promises, destructuring, and more...',
    },
    {
      _id: '2',
      title: 'Understanding React Hooks',
      content: 'React Hooks introduced a powerful way to work with state and lifecycle features in functional components...',
    },
    {
      _id: '3',
      title: 'Introduction to Node.js and Express',
      content: 'Node.js is a popular server-side framework that allows developers to write server logic in JavaScript...',
    }
  ]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const { data } = await axios.get('/api/posts');
  //       setPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Hero Section */}
      <div className="text-center py-12 bg-primary text-white rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blogging Platform</h1>
        <p className="text-lg mb-6">
          Discover, create, and share your thoughts with the world!
        </p>
        <CreatePost />
      </div>

      {/* Recent Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Posts</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <div key={post._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{post.content}</p>
                <Link
                  to={`/posts/${post._id}`}
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

      {/* Call to Action for Non-Authenticated Users */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-gray-700">
          New here?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Sign up
          </Link>{' '}
          to start blogging!
        </p>
        <p className="text-lg font-medium text-gray-700 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log in
          </Link>{' '}
          to view your posts.
        </p>
      </div>
    </div>
  );
}

export default Home;
