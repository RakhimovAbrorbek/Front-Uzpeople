import React from 'react';
import { FaWrench, FaCogs } from 'react-icons/fa';


function Info() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105 border border-gray-700">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <FaCogs className="text-6xl text-blue-400 animate-spin-slow" />
          <FaWrench className="text-6xl text-purple-400 -rotate-12 animate-bounce-slow" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Under Construction
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
          We're working hard to bring you a new and improved experience. Please check back soon!
        </p>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
            style={{ width: '65%' }}
          ></div>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Info;