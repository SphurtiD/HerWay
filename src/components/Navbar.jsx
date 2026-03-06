import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Community", path: "/community" },
    { label: "FAQs", path: "/faqs" },
    { label: "Contact Us", path: "/contactus" },
    { label: "Map", path: "/map" },
    { label: "Start Recording", path: "/startrecording" },
    { label: "Fake Calls", path: "/fakecalls" },
  ];

  return (
    <nav className="bg-pink-100 fixed top-0 left-0 w-full z-[1000] border-b border-pink-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8 w-auto" alt="HerWay Logo" />
          <span className="text-xl font-semibold text-black whitespace-nowrap">
            HerWay
          </span>
        </Link>

        {/* Desktop Nav - centered properly */}
        <ul className="hidden md:flex gap-x-8 font-medium ml-16">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-pink-500 text-white px-3 py-2 rounded-md"
                    : "text-black hover:bg-pink-200 px-3 py-2 rounded-md"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center ml-auto space-x-4">

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setIsUserOpen(!isUserOpen)}
              className="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-pink-300"
            >
              <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            </button>

            {isUserOpen && (
              <div className="absolute right-0 mt-3 z-50 bg-white border border-pink-200 rounded-lg shadow-lg w-48">
                <div className="px-4 py-3 text-sm border-b border-pink-200">
                  <span className="block font-medium text-gray-900">
                    User Name
                  </span>
                  <span className="block text-gray-500 truncate">
                    user@email.com
                  </span>
                </div>

                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      to="/about"
                      className="block px-4 py-2 hover:bg-pink-50"
                      onClick={() => setIsUserOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-50">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-100 px-6 pb-4">
          <ul className="space-y-3 font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block ${
                    isActive(item.path)
                      ? "text-pink-600"
                      : "text-black"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;