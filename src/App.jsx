import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // 👈 import useLocation
import Home from "./pages/Home";
import About from "./pages/About";
import PillNav from "./components/PillNav";
import LogoLoop from './components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/github.png", alt: "GitHub", href: "https://github.com" },
  { src: "/logos/insta.png", alt: "Instagram", href: "https://instagram.com" },
  { src: "/logos/linkedin.png", alt: "LinkedIn", href: "https://linkedin.com" },
  { src: "/logos/yt.png", alt: "YouTube", href: "https://youtube.com" },
  { src: "/logos/twitter.png", alt: "Twitter", href: "https://twitter.com" },
];

// ✅ Import your logo
import logo from "./assets/logo.png"; // adjust path to where your logo actually is

const App = () => {
  const location = useLocation(); // 👈 get current path

  return (
    <>
      {/* ✅ Navbar centered */}
      <div className="flex justify-center items-center">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" }, // 👈 lowercase path to match Route
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ]}
          activeHref={location.pathname} // 👈 dynamic instead of "/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#F9A8D4"
          pillColor="#93C5FD"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* 👈 route enabled */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>

      <div style={{ height: '60px', position: 'relative', overflow: 'hidden'}} className="bg-pink-200">
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
    </>
  );
};

export default App;
