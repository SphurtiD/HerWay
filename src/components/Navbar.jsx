import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  // State for controlling the visibility of the user dropdown menu
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // State for controlling the visibility of the main navigation menu on mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for detecting clicks outside the dropdowns to close them
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Effect to handle clicks outside the menus to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown if click is outside of it and its toggle button
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) &&
          userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      // Close mobile menu if click is outside of it and its toggle button
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
          mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Function to toggle user dropdown visibility
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prevState) => !prevState);
    // Ensure mobile menu is closed when user dropdown is opened
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    // Ensure user dropdown is closed when mobile menu is opened
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  };

  return (
    <nav
      // Initial translucent background: blue-200 with 70% opacity (a lighter, popping blue)
      // backdrop-blur-sm adds a subtle blur effect to content behind the nav
      // transition-all and duration-300 make hover effects smooth
      // hover:bg-pink-200/80 changes to a lighter, popping pink with 80% opacity on hover
      // grainy class (requires custom CSS) for the subtle noise effect
      className="bg-blue-200/70 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out hover:bg-pink-200/80 grainy"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Brand Name */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg" // Using original Flowbite logo URL
            className="h-8 rounded-md"
            alt="HerWay Logo"
          />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800 neueUB">
            HerWay
          </span>
        </a>

        {/* User Menu and Mobile Menu Toggle */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* User Profile Button */}
          <button
            ref={userButtonRef}
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleUserDropdown}
            aria-expanded={isUserDropdownOpen}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://placehold.co/128x128/FF69B4/FFFFFF?text=User" // Placeholder for user photo
              alt="User profile photo"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/CCCCCC/000000?text=Error"; }}
            />
          </button>

          {/* User Dropdown Menu */}
          <div
            ref={userDropdownRef}
            className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-16 md:top-auto md:relative ${
              isUserDropdownOpen ? 'block' : 'hidden'
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white font-medium">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-200 ease-in-out"
            onClick={toggleMobileMenu}
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation Menu (Collapsible on Mobile) */}
        <div
          ref={mobileMenuRef}
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-user"
        >
          {/* Removed specific mobile styling from <ul> element to remove the rectangular shape */}
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#"
                // Default text color: gray-700, Active/Current page: pink-600
                // Hover text color: pink-500
                className="text-lg block py-2 px-3 text-gray-700 rounded-sm md:bg-transparent md:p-0 transition-colors duration-200 ease-in-out hover:text-pink-500 algha"
                aria-current="page" // This will be handled by React Router in a full app
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 transition-colors duration-200 ease-in-out hover:text-pink-500 algha"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 transition-colors duration-200 ease-in-out hover:text-pink-500 algha"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 transition-colors duration-200 ease-in-out hover:text-pink-500 algha"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 transition-colors duration-200 ease-in-out hover:text-pink-500 algha"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
