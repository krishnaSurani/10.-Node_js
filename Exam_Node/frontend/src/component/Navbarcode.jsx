import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbarcode() {
     const [isOpen, setIsOpen] = useState(false);
      const toggleMenu = () => setIsOpen(!isOpen);
  return (
        <nav className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 text-xl font-bold text-blue-400">
              MyApp
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
              <Link to="/form" className="hover:text-blue-400">Form</Link>
              <Link to="/showproduct" className="hover:text-blue-400">Product</Link>
              
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link>
            <Link to="" className="block hover:text-blue-400">From</Link>
            <button className="block hover:text-red-400">Logout</button>
          </div>
        )}
      </nav>

  )
}

export default Navbarcode