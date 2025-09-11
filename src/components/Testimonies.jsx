import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Helper function for spring values, used by the motion library.
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// Main App component that contains all logic and sub-components.
// All code is contained in this single file as required.
export default function App() {
  
  // TiltedCard Component
  // This component now accepts a 'testimonialContent' prop to display the text.
  const TiltedCard = ({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    testimonialContent,
    imageHeight = "250px",
    imageWidth = "250px",
    scaleOnHover = 1.05,
    rotateAmplitude = 10,
    showMobileWarning = true,
    showTooltip = true,
    className = "",
  }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
      stiffness: 350,
      damping: 30,
      mass: 1,
    });
  
    const [lastY, setLastY] = useState(0);
  
    function handleMouse(e) {
      if (!ref.current) return;
  
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
  
      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
  
      rotateX.set(rotationX);
      rotateY.set(rotationY);
  
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
  
      const velocityY = offsetY - lastY;
      rotateFigcaption.set(-velocityY * 0.6);
      setLastY(offsetY);
    }
  
    function handleMouseEnter() {
      scale.set(scaleOnHover);
      opacity.set(1);
    }
  
    function handleMouseLeave() {
      opacity.set(0);
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
      rotateFigcaption.set(0);
    }
  
    return (
      <figure
        ref={ref}
        className={`relative w-full min-h-[400px] bg-white/80 rounded-xl border border-pink-100 shadow-lg p-4 flex flex-col items-center justify-between overflow-hidden ${className}`}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showMobileWarning && (
          <div className="absolute top-4 text-center text-sm block sm:hidden z-10 bg-yellow-100 p-1 rounded">
            Effect not optimized for mobile.
          </div>
        )}
  
        <motion.div
          className="relative [transform-style:preserve-3d] flex-shrink-0"
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX,
            rotateY,
            scale,
          }}
        >
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/${imageWidth.replace('px','')}/${imageHeight.replace('px','')}/CCCCCC/000000?text=Image+Error`;
            }}
          />
        </motion.div>
  
        {testimonialContent && (
          <div className="mt-4 text-center flex-grow flex flex-col justify-end">
            {testimonialContent}
          </div>
        )}
  
        {showTooltip && (
          <motion.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption,
            }}
          >
            {captionText}
          </motion.figcaption>
        )}
      </figure>
    );
  };
  
  // Data for the made-up testimonials
  const testimonialsData = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      image: '/images/woman4.jpg',
      quote: "HerWay gave me the confidence to explore India solo. The real-time alerts and community support made me feel truly safe. Highly recommend!",
      caption: "Confident Explorer"
    },
    {
      name: 'Aisha Khan',
      location: 'Dubai, UAE',
      image: '/images/woman5.jpg',
      quote: "The fake call feature saved me from an awkward situation. It's a brilliant tool for solo female travelers. Thank you, HerWay!",
      caption: "Smart & Secure"
    },
    {
      name: 'Sophie Lee',
      location: 'London, UK',
      image: '/images/woman2.jpg',
      quote: "Connecting with other women through HerWay's community made my trip so much richer. It's more than an app; it's a sisterhood.",
      caption: "Connected Traveler"
    },
    {
      name: 'Mei Ling',
      location: 'Singapore',
      image: '/images/woman1.jpg',
      quote: "The location-based safety zones are incredibly accurate. I felt informed and protected throughout my journey in unfamiliar cities.",
      caption: "Informed & Protected"
    },
      {
      name: 'Elena Petrova',
      location: 'Berlin, Germany',
      image: '/images/woman3.jpg',
      quote: "Finally, an app that understands the unique needs of women travelers. The emergency assistance gives me true peace of mind.",
      caption: "Peace of Mind"
    },
    {
      name: 'Fatima Al-Farsi',
      location: 'Riyadh, Saudi Arabia',
      image: '/images/woman6.jpg',
      quote: "HerWay is an essential companion for any woman venturing out alone. It's intuitive, reliable, and genuinely empowering.",
      caption: "Empowered Journey"
    },
  ];

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800 font-sans p-8">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 algha">Hear From Our Travelers</h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto neueL">
          Our community's stories of confidence and safety speak for themselves.
        </p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <TiltedCard
            key={index}
            imageSrc={testimonial.image}
            altText={testimonial.name}
            captionText={testimonial.caption}
            // Pass the testimonial content as a prop
            testimonialContent={
              <>
                <p className="text-lg italic text-gray-700 mb-2">"{testimonial.quote}"</p>
                <p className="font-semibold text-pink-500">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </>
            }
          />
        ))}
      </main>
    </div>
  );
}
