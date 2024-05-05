import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Welcome Aboard!</h2>
        <p className="mb-4">Please select what you'd like to see:</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
          <Link to="/counter">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Counter
            </button>
          </Link>
          <Link to="/sphere">
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              Sphere
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
