import React from 'react'
import MagicBento from '../components/MagicBento'
import StarBorder from '../components/StarBorder'

const Community = () => {
  return (
    <>
      {/* Background Video Section */}
      <div className="relative h-dvh w-screen overflow-hidden">
        <video
          src="/videos/community.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay for Blur and Grainy Effect */}
        <div className="absolute top-0 left-0 w-full h-full z-0 grainy"></div>

        {/* ✅ Centered Heading + Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-5xl text-pink-600 algha font-bold">
            Check out our Community!
          </h1>
          <StarBorder
            as="button"
            className="custom-class"
            color="cyan"
            speed="5s"
          >
            <h2 className="flex items-center gap-2">Connect on WhatsApp <img src="/images/whatsapp.png" alt="wsp" width={25} height={25}/></h2>
          </StarBorder>
        </div>
      </div>

      {/* MagicBento Section */}
      <div className="h-dvh w-screen flex items-center justify-center bg-pink-100">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="244, 114, 182" // 🎨 pink-400 for nice glow
          className="h-full w-full bg-pink-200 rounded-2xl shadow-lg"
        />
      </div>
    </>
  )
}

export default Community
