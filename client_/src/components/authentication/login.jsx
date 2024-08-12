import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../../redux/reducer/userReducer';

function Login() {
  const user = useSelector((state)=>state.user);
 
  const userDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful login (e.g., redirect to another page or save token)
        console.log("Login successful", data);
        localStorage.setItem('authtoken', data.authtoken);
       
        userDispatch(setUser(data.userObject))
        console.log("user is : " ,data )
        navigate('/app');
      } else {
        
        console.log("Login failed", data);

         await alert(data.message|| 'Provided credential are wrong');
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome back!</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Need an account?{" "}
          <Link to={`/`} className="text-blue-500 hover:underline">
            Sign in{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
