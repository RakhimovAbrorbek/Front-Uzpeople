import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import { FaUserPlus } from 'react-icons/fa';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    try {
      setPasswordError('');
      setServerResponse('Submitting...');
      const { data } = await axios.post('http://185.191.141.200:7000/api/session/register', formData);
      setServerResponse(`${data.message || "Successfully registered!"}`);
      setTimeout(() => {
        navigate("/login")
      }, 1000);

    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'An error occurred during registration.';
      setServerResponse(errorMsg);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105 border border-gray-700">
        <div className="flex justify-center mb-6">
          <FaUserPlus className="text-7xl text-blue-400 animate-bounce-slow" />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
            required
          />
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              {passwordVisible ? <MdVisibility className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
              required
            />
          </div>
          {passwordError && (
            <p className="text-red-400 text-sm mt-2">{passwordError}</p>
          )}
          {serverResponse && (
            <p className={`text-sm mt-2 font-medium ${serverResponse.includes("User registered successfully") ? "text-green-400" : "text-red-400"}`}>
              {serverResponse}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 text-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline font-semibold transition-colors duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;