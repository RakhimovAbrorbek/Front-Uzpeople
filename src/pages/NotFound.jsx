
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 p-4">
      <div className="text-center">
        <div className="relative font-extrabold text-9xl md:text-[200px] leading-none mb-4 animate-pulse">
          <span className="text-blue-600">4</span>
          <span className="text-gray-800">0</span>
          <span className="text-blue-600">4</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <a
          href="/login"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg 
                     shadow-lg hover:bg-blue-700 transition-all duration-300 transform 
                     hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;

