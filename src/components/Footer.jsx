import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-700 py-6 px-6 border-b border-pink-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Left Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="HerWay Logo" className="h-8 w-auto" />
          <p className="text-sm">
            © {new Date().getFullYear()} HerWay. All rights reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="text-sm text-center">
          Empowering women to travel safely and confidently.
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">

          {/* Twitter */}
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.86 9.86 0 01-3.127 1.195 4.92 4.92 0 00-8.38 4.482A13.97 13.97 0 011.671 3.149a4.92 4.92 0 001.523 6.573 4.9 4.9 0 01-2.229-.616v.061a4.93 4.93 0 003.95 4.827 4.9 4.9 0 01-2.224.085 4.93 4.93 0 004.6 3.417A9.87 9.87 0 010 19.54 13.94 13.94 0 007.548 22c9.142 0 14.307-7.721 13.995-14.646A9.94 9.94 0 0024 4.557z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="YouTube"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM10 15.993v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="hover:text-pink-600 transition"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;