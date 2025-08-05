import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      const { access_token, role, id } = data;
      if (!access_token || !id) throw new Error('Missing token or user ID');
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('role', role);
      await fetch(`/api/users/changeLogin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ time: new Date().toISOString() }),
      });
      setStatusMessage('Login successful');
      setStatusType('success');
      console.log(role);
      setTimeout(() => {
        navigate(role === 'admin' ? '/users' : '/info');
      }, 300);
    } catch (err) {
      setStatusMessage(err.message);
      setStatusType('error');
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Clear all user-related items from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    // Navigate back to the login page
    navigate('/login');
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  // Check if a user is currently logged in
  const isLoggedIn = localStorage.getItem('access_token');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105 border border-gray-700">
        <div className="flex justify-center mb-6">
          <FaSignInAlt className="text-7xl text-blue-400 animate-bounce-slow" />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {isLoggedIn ? 'Welcome' : 'Login'}
        </h2>
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="text-center">
            <p className="mb-4 text-xl font-medium">You are already logged in!</p>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-lg hover:from-red-700 hover:to-rose-700 focus:ring-2 focus:ring-red-500 text-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
                >
                  {passwordVisible ? <MdVisibility className="text-xl" /> : <AiFillEyeInvisible className="text-xl" />}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 text-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              {statusMessage && (
                <div
                  className={`mt-4 text-center font-medium text-sm ${statusType === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
            <div className="text-center mt-6 text-gray-400">
              Don't have an account?
              <Link to="/register" className="text-blue-400 hover:underline ml-1 font-semibold">
                Register now
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
