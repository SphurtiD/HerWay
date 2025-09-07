import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "../components/ProfileCard.css"; // Import the custom CSS for ProfileCard

// Constants and Helper Functions for ProfileCard (defined here for self-containment)
const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// ProfileCardComponent definition
const ProfileCardComponent = ({
  avatarUrl = "https://placehold.co/300x300/FFC0CB/FFFFFF?text=Avatar", // Default placeholder for avatar
  iconUrl = "https://placehold.co/50x50/ADD8E6/000000?text=Icon", // Default placeholder for icon
  grainUrl = "",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Developer Name",
  title = "Role",
  handle = "devhandle",
  status = "Online",
  contactText = "Connect",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (
      offsetX,
      offsetY,
      card,
      wrap
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration,
      startX,
      startY,
      card,
      wrap
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const { beta, gamma } = event;
      if (!beta || !gamma) return;

      animationHandlers.updateCardTransform(
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,
        card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceMotionEvent
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(err => console.error(err));
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);
    card.addEventListener("click", handleClick);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      card.removeEventListener("click", handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
    ({
      // Removed --icon variable assignment as it's no longer used for masking
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient
        ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
        : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                const target = e.target;
                // Fallback to a generic placeholder if image fails
                target.src = `https://via.placeholder.com/120x120/CCCCCC/000000?text=User`;
              }}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target;
                        target.style.opacity = "0.5";
                        target.src = `https://via.placeholder.com/40x40/CCCCCC/000000?text=M`; // Fallback for mini avatar
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: "auto" }}
                  type="button"
                  aria-label={`Contact ${name || "user"}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main About Component
const About = () => {
  // Data for your 4 developers
  const developersData = [
    {
      name: "Ayush Bhosale",
      title: "Backend & AI/ML Engineer",
      handle: "ayush_bhosale",
      status: "Coding",
      avatarUrl: "/images/Ayush.png", // Assuming this path is correct
      miniAvatarUrl: "/images/Ayush.png", // Assuming this path is correct
      linkedinUrl: 'https://www.linkedin.com/in/ayush-bhosale-207ba7250/',
    },
    {
      name: "Piyush Dokle",
      title: "AI/ML Engineer",
      handle: "piyush_dokle",
      status: "Debugging",
      avatarUrl: "/images/Piyush.png", // Assuming this path is correct
      miniAvatarUrl: "/images/Piyush.png", // Assuming this path is correct
      linkedinUrl: 'https://www.linkedin.com/in/ayush-bhosale-207ba7250/',
    },
    {
      name: "Yuvraj Chauhan",
      title: "Frontend Developer",
      handle: "yuvraj_chauhan",
      status: "Designing",
      avatarUrl: "/images/Yuvraj.png", // Assuming this path is correct
      miniAvatarUrl: "/images/Yuvraj.png", // Assuming this path is correct
      linkedinUrl: 'https://www.linkedin.com/in/ayush-bhosale-207ba7250/',
    },
    {
      name: "Sphurti Dixit",
      title: "Frontend Developer",
      handle: "sphurti_dixit",
      status: "Styling",
      avatarUrl: "/images/Sphur.png", // Assuming this path is correct
      miniAvatarUrl: "/images/Sphur.png", // Assuming this path is correct
      linkedinUrl: 'https://www.linkedin.com/in/sphurti-dixit-b430132b0/',
    },
  ];

  return (
    <section className="py-16 px-4 bg-pink-50 text-gray-800 flex justify-center items-center min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        {/* About Us Description */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-pink-600 neueR">
          About Us
        </h2>
        <p className="mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
          HerWay was founded with a singular mission: to empower women to explore the world with unparalleled confidence and peace of mind. We believe that every woman deserves the freedom to travel, discover, and experience new cultures without compromising her safety. Our innovative platform is built by a passionate team dedicated to leveraging technology for real-world impact.
        </p>

        {/* Meet the Devs Heading */}
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 text-purple-700 algha">
          Meet the Devs
        </h3>
        
        {/* Grid for Developer Profile Cards */}
        {/* Responsive grid: 1 column on small, 2 on medium, 4 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {developersData.map((dev, index) => (
            <ProfileCardComponent
              key={index}
              name={dev.name}
              title={dev.title}
              handle={dev.handle}
              status={dev.status}
              avatarUrl={dev.avatarUrl}
              miniAvatarUrl={dev.miniAvatarUrl}
              enableTilt={true}
              enableMobileTilt={false} // Keep disabled for now due to HTTPS requirement
              // Added responsive width for better spacing in the grid
              className="mx-auto w-full max-w-[280px]" // Limit max-width for 4 columns
              // You can customize default gradients for each card here if needed
              // behindGradient="radial-gradient(...)"
              // innerGradient="linear-gradient(...)"
              onContactClick={() => window.open(dev.linkedinUrl, "_blank")} // 👈 Open LinkedIn
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
