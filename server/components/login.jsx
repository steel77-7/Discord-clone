import React from 'react';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome back!</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Need an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
