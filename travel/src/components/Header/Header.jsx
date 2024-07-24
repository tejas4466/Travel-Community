import React, { useState } from 'react';
import Contain from '../container/Contain';
import Logout from './Logout';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Community', slug: '/community', active: true },
    { name: 'Chat', slug: '/chat', active: true },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Profile', slug: '/profile', active: authStatus },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="text-gray-200 bg-gray-900 shadow-md">
      <Contain>
        <nav className="relative flex items-center justify-between py-2">
          <div className="flex items-center">
            <Link to="/">
              <Logo className="w-auto h-10" />
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-200">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul
            className={`fixed top-0 right-0 w-36 bg-gray-900 text-gray-200 md:static md:flex md:flex-row md:items-center md:w-auto ${
              isOpen ? 'flex' : 'hidden'
            } z-50 lg:z-0 md:z-0`}
          >
            {isOpen && (
              <li className="absolute top-3 right-3">
                <button onClick={toggleMenu} className="text-gray-200">
                  <FaTimes size={24} />
                </button>
              </li>
            )}
            <div className={`flex flex-col md:flex-row ${isOpen ? 'mt-12' : 'mt-0'} md:mt-0 md:flex md:items-center md:ml-auto`}>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(item.slug);
                        }}
                        className="block px-4 py-2 mt-2 text-sm transition duration-300 ease-in-out bg-transparent rounded-xl md:mt-0 md:ml-4 hover:bg-gray-800 hover:rounded-2xl"
                        >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="mt-2 md:ml-4 md:mt-0">
                  <Logout />
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Contain>
    </header>
  );
}

export default Header;
