import React, { useState } from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

   const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <nav className="bg-gray-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 text-xl font-bold">
            <Link to="/home">SlotSwapper</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {!token && (
              <>
              <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-5 py-2 border-2 rounded-full font-semibold transition
              ${
                isActive
              ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
              : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              }`
              }
              >
              Login
              </NavLink>

              <NavLink
                to="/signup"
              className={({ isActive }) =>
                `px-5 py-2 border-2 rounded-full font-semibold transition
              ${
                   isActive
              ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
              : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                }`}
              >
              SignUp
              </NavLink>
                
              </>
            )}
            {token && (
              <>
              <NavLink
              to="/dashboard"
              className={({ isActive }) =>
              isActive
              ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
              : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              }
                >
              Dashboard
              </NavLink>
                <NavLink 
                to="/events"
                className={({ isActive }) =>
                isActive
                ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
                : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              }
                >
              EventList
              </NavLink>
                <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                isActive
                ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
                : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              }
                >
             Swap Zone
              </NavLink>
                <NavLink 
                to="/swap/incoming" 
               className={({ isActive }) =>
                isActive
                ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
                : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              }
                >
             InComing Request
              </NavLink>
                <NavLink 
                to="/swap/outgoing" 
                className={({ isActive }) =>
                isActive
                ? "px-3 py-1 rounded border border-gray-300 bg-gray-800 text-white transition-colors duration-200"
                : "px-3 py-1 rounded border border-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                }
                >
             OutGoing Request
              </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded hover:cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex flex-col justify-center items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className={`w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-400   shadow-lg px-2 pt-2 pb-3 space-y-1">
          {!token ? (
            <>
              <button
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate('/signup');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
            <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black"
              >
               Dashboard
              </Link>
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black"
              >
                EventList
              </Link>

              <Link
              to="/marketplace"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black"
              >
              Swap Zone
              </Link>
              <Link
               to="/swap/incoming"
               onClick={()=> setIsOpen(false)}
               className=" block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black">Incoming Requests</Link>
                <Link
                 to="/swap/outgoing"
                  onClick={()=> setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black">Outgoing Requests</Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full    px-3 py-2 rounded-md text-base font-medium bg-red-500 hover:bg-red-600  text-center"
              >
                Logout
              </button>
            </>
          )}
         
        </div>
      )}
    </nav>
  )
}
