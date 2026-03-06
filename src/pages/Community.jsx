import React from 'react'
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
          <p className='text-pink-200 text-lg text-bold'>Empower women. Share experiences. Be "Her" guide.</p>
        </div>
      </div>

      {/* MagicBento Section */}
      <div className="h-dvh w-screen flex items-center justify-center bg-pink-50">
      </div>
    </>
  )
}

export default Community
