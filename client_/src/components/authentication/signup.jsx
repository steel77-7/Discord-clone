import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../../redux/reducer/userReducer';

const Register = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state)=>state.user);
  const userDispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    console.log( email, username, password, dob );
    try {
      const send = await fetch(import.meta.env.VITE_SERVER_API +'/auth/register',{
        method:"POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({email,username,password,imageUrl})
      } )
      if(send.ok){
        const data = await send.json();
        localStorage.setItem('authtoken', data.authtoken);
        console.log('res user',data)
        userDispatch(setUser(data.userObject))
        console.log("user is : " ,user )
        navigate('/app'); 
      }
      
    } catch (error) {
       console.log(error)
    }
  };

  /* const uploadPic = async (file) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'dsicord images'); 
      formData.append('cloud_name', 'dtmqwo4sq'); 

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dtmqwo4sq/image/upload', 
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadPic(file);
    }
  }; */
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Create an account
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          Already have an account?{" "}
          <Link to={`/login`} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
