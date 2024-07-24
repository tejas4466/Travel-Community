import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../Logo';

const Foot = () => {
  const authStatus = useSelector((state) => state.auth.status); 

  return (
    <footer className="text-white bg-gray-900">
      <div className="container py-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center justify-center md:col-span-1">
            {/* Your logo or footer branding */}
            <Link to="/" className="text-xl text-white">
              <Logo />
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-wrap justify-end mr-12 space-x-2 md:space-x-4">
              <Link to="/" className="text-gray-300 transition duration-300 hover:text-gray-100">
                Home
              </Link>
              <Link to="/community" className="text-gray-300 transition duration-300 hover:text-gray-100">
                Community
              </Link>
              <Link to="/chat" className="text-gray-300 transition duration-300 hover:text-gray-100">
                Chat
              </Link>
              <Link to="/signup" className="text-gray-300 transition duration-300 hover:text-gray-100">
                Signup
              </Link>
              <Link to="/login" className="text-gray-300 transition duration-300 hover:text-gray-100">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/tejas-pokale-5047061b3/" target="_blank" rel="noopener noreferrer" className="p-2 transition-transform duration-300 bg-blue-700 rounded-full hover:scale-110">
            <img src="/src/assets/linkedin.png" alt="linkedin" className="w-8 h-8" />
          </a>

          {/* GitHub Icon */}
          <a href="https://github.com/tejas4466" target="_blank" rel="noopener noreferrer" className="p-2 transition-transform duration-300 bg-gray-300 rounded-full hover:scale-110">
            <img src="/src/assets/github.png" alt="github" className="w-8 h-8" />
          </a>

          {/* Twitter Icon */}
          <a href="https://x.com/tejaspokale4466" target="_blank" rel="noopener noreferrer" className="p-2 transition-transform duration-300 bg-gray-200 rounded-full hover:scale-110">
            <img src="/src/assets/twitter.png" alt="twitter" className="w-8 h-8" />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com/tejaspokale22/" target="_blank" rel="noopener noreferrer" className="p-2 transition-transform duration-300 bg-pink-600 rounded-full hover:scale-110">
            <img src="/src/assets/instagram.png" alt="instagram" className="w-8 h-8" />
          </a>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} travelers.comm All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Foot;
