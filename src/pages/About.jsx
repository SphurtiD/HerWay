import React from "react";

const About = () => {
  return (
    <section className="py-20 px-6 bg-pink-50 text-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-pink-600 neueR">
          About Us
        </h2>

        <p className="text-lg md:text-xl leading-relaxed">
          HerWay was founded with a singular mission: to empower women to explore 
          the world with confidence and peace of mind. We believe that every woman 
          deserves the freedom to travel, discover, and experience new cultures 
          without compromising her safety. 

          <br /><br />

          Our platform is built with care, combining thoughtful design and 
          practical safety tools to support solo female travelers at every step 
          of their journey. From real-time alerts to smart safety features, 
          HerWay stands with you — wherever you go.
        </p>

      </div>
    </section>
  );
};

export default About;