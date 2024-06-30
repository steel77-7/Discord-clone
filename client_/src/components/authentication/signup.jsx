// src/Register.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Create an account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="dob"
              name="dob"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account? {/* <a href="/signin" className="text-blue-500 hover:underline">Sign In</a> */}
          <Link to={`/login`} className="text-blue-500 hover:underline">Sign in </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
