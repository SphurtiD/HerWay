import React, { useRef, useState } from "react";

// SpotlightCard Component (included directly for self-containment)
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 105, 180, 0.25)" }) => { // Default spotlight to a soft pink
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Card background: very light white with slight translucency
      // Border: a very subtle, light pink
      // Changed shadow-sm to shadow-lg for a more prominent shadow
      className={`relative rounded-xl border border-pink-100 bg-white/80 overflow-hidden p-6 shadow-lg transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// Features Component
const Features = () => {
  // Data for your feature cards, based on the provided flowchart
  const featuresData = [
    {
      icon: '🎙️', // Microphone for recording
      title: 'Real-time Audio Recording & Analysis',
      description: 'Start recording instantly. Our system includes real-time translation and cuss word detection for immediate insights.',
      spotlightColor: 'rgba(255, 105, 180, 0.25)' // Pink spotlight
    },
    {
      icon: '🚨', // Siren for notifications
      title: 'Threat Detection & Smart Notifications',
      description: 'If unsafe conditions are confirmed, direct notifications are sent with timestamp, location, and threat level to close contacts.',
      spotlightColor: 'rgba(255, 99, 71, 0.25)' // Tomato red spotlight
    },
    {
      icon: '📞', // Phone for calls
      title: 'Fake Voice Calls & Previews',
      description: 'Generate realistic fake voice calls with real-time chat line previews to deter unwanted attention.',
      spotlightColor: 'rgba(173, 216, 230, 0.25)' // Light blue spotlight
    },
    {
      icon: '🌐', // Globe for community
      title: 'Community Connect & Subreddits',
      description: 'Connect with a supportive community and access state-wise subreddits for localized advice and shared experiences.',
      spotlightColor: 'rgba(147, 112, 219, 0.25)' // Medium purple spotlight
    },
    {
      icon: '🗺️', // Map for location
      title: 'Location-Based Safety Zones',
      description: 'Utilize geo-fencing to view the real-time safety status of marked areas and receive notifications on nearby police presence.',
      spotlightColor: 'rgba(60, 179, 113, 0.25)' // Medium sea green spotlight
    },
    {
      icon: '📝', // Clipboard for survey
      title: 'Post-Trip Safety Feedback',
      description: 'Take a final survey to collect information on your safety experience and how HerWay helped you.',
      spotlightColor: 'rgba(255, 215, 0, 0.25)' // Gold spotlight
    },
  ];

  return (
    <section 
      // Section background: very light pastel pink
      // Overall text color changed to a darker gray for contrast on light background
      className="py-16 px-4 bg-pink-50 text-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        {/* Main title in a clear, visible pink */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-pink-600 neueL">
          Why Choose HerWay?
        </h2>

        {/* Grid for Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <SpotlightCard key={index} spotlightColor={feature.spotlightColor}>
              <div className="flex flex-col items-center text-center">
                {/* Feature Icon */}
                <span className="text-5xl mb-4">{feature.icon}</span>
                {/* Feature Title */}
                {/* Title text color in a dark purple for good contrast */}
                <h3 className="text-2xl font-bold mb-2 text-purple-700 algha">
                  {feature.title}
                </h3>
                {/* Feature Description */}
                {/* Description text color in dark gray for readability */}
                <p className="text-base text-gray-700">
                  {feature.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
