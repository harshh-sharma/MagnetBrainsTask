import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { login } from '../redux/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login({ email, password }));
    if (response?.payload?.success) {
      navigate('/product');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-indigo-100 to-black min-h-screen flex items-center justify-center">
      <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h1>
        <p className="text-indigo-500 text-center mb-6">Please login to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full  focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg  placeholder-gray-400 transition-all text-indigo-600 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
              placeholder="Password"
              className="w-full text-indigo-600 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 rounded-lg  placeholder-gray-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-indigo-500 text-sm">
          <p className="hover:text-white">Forgot Password?</p>
          <Link to={'/register'}  className="hover:text-indigo-500">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
