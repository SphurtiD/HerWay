import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import PillNav from "./components/PillNav";
import LogoLoop from './components/LogoLoop';
import ClickSpark from './components/ClickSpark';
import Community from "./pages/Community";
import FAQs from "./pages/FAQs";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import logo from "./assets/logo.png";

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

const App = () => {
  const location = useLocation();

  return (
    <>
      <ClickSpark
        sparkColor='#d946ef'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="flex justify-center items-center neueL">
          <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Community", href: "/community" },
              { label: "FAQs", href: "/faqs" },
              { label: "Contact Us", href: "/contactus" },
            ]}
            activeHref={location.pathname}
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
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contactus" element={<ContactUs />} />
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
      </ClickSpark>
    </>
  );
};

export default App;
