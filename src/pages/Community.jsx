import React, { useState } from "react";

const places = [
  "Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
  "Chandigarh","Chhattisgarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand",
  "Karnataka","Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal"
].sort();

const sampleThreads = [
  {
    title: "Is it safe to travel alone here at night?",
    author: "solo_nomad",
    upvotes: 42,
    time: "3h ago",
    comments: [
      {
        author: "local_helper",
        text: "Stick to crowded areas and avoid poorly lit streets.",
        replies: [
          { author: "travelbug", text: "Ride-sharing apps help a lot too." }
        ]
      },
      {
        author: "wander_woman",
        text: "I travelled solo here last year and felt comfortable.",
        replies: []
      }
    ]
  },
  {
    title: "Best hostels for solo female travelers?",
    author: "backpackqueen",
    upvotes: 28,
    time: "6h ago",
    comments: [
      {
        author: "hostelhopper",
        text: "Look for hostels with female dorms and good ratings.",
        replies: [
          { author: "safe_travels", text: "Zostel is usually reliable." }
        ]
      }
    ]
  },
  {
    title: "Emergency numbers travelers should know?",
    author: "firsttrip",
    upvotes: 51,
    time: "1h ago",
    comments: [
      {
        author: "safety_first",
        text: "Women helpline 1091 works in many states.",
        replies: []
      }
    ]
  }
];

function Community() {

  const [activeSub, setActiveSub] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const scrollToCommunity = () => {
    const section = document.getElementById("community-feed");
    const nav = document.querySelector("nav");

    if (!section) return;

    const offset = nav ? nav.offsetHeight : 0;
    const y = section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const selectCommunity = (place) => {
    setActiveSub(place);
    setMenuOpen(false);
    setJoined(false);
  };

  return (
    <>
      {/* HERO */}
      <div className="relative h-dvh w-full overflow-hidden">

        <video
          src="/videos/community.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 grainy"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-6">

          <h1 className="text-4xl md:text-5xl text-pink-600 font-bold">
            Check out our Community!
          </h1>

          <p className="text-pink-200 text-lg max-w-xl">
            Empower women. Share experiences. Be "Her" guide.
          </p>

          <button
            onClick={scrollToCommunity}
            className="bg-pink-600 px-6 py-3 rounded-lg text-white hover:bg-pink-700 transition"
          >
            Explore Community
          </button>

        </div>
      </div>

      {/* COMMUNITY */}
      <section
        id="community-feed"
        className="min-h-screen bg-pink-100 flex flex-col md:flex-row"
      >

        {/* MOBILE HEADER */}
        <div className="md:hidden sticky top-0 z-30 bg-pink-100 border-b border-pink-300 p-4">

          <button
            onClick={() => setMenuOpen(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            ☰ {activeSub ? `r/${activeSub.replace(/\s+/g,"").toLowerCase()}` : "Communities"}
          </button>

        </div>


        {/* MOBILE OVERLAY */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
          />
        )}


        {/* SIDEBAR */}
        <div
          className={`fixed md:static top-0 left-0 h-full w-72 bg-pink-100 border-r border-pink-600 overflow-y-auto transform transition-transform duration-300 z-30
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
        >

          <div className="p-4 border-b border-pink-600 font-semibold text-pink-600 flex justify-between">
            Communities
            <button className="md:hidden" onClick={()=>setMenuOpen(false)}>✕</button>
          </div>

          {places.map((place) => (

            <button
              key={place}
              onClick={() => selectCommunity(place)}
              className={`w-full text-left px-4 py-3 transition
              ${
                activeSub === place
                  ? "bg-pink-600 text-white"
                  : "hover:bg-pink-300 text-pink-500"
              }`}
            >
              r/{place.replace(/\s+/g,"").toLowerCase()}
            </button>

          ))}

        </div>


        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">

          {!activeSub ? (

            <div className="flex flex-col items-center justify-center h-full text-pink-500 gap-4">

              <h2 className="text-2xl font-semibold">
                Welcome to HerWay Community
              </h2>

              <p>Select a community to start exploring discussions.</p>

            </div>

          ) : (

            <>
              {/* SUB HEADER */}
              <div className="flex items-center justify-between border-b border-pink-600 pb-6 mb-6">

                <div className="flex gap-4 items-center">

                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white">
                    🌍
                  </div>

                  <div>

                    <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
                      r/{activeSub.replace(/\s+/g,"").toLowerCase()}
                    </h2>

                    <p className="text-pink-500 text-sm">
                      Discussions about safe travel in {activeSub}
                    </p>

                    <p className="text-pink-400 text-xs">
                      {(Math.floor(Math.random()*8000)+1000).toLocaleString()} members
                    </p>

                  </div>

                </div>

                <button
                  onClick={()=>setJoined(!joined)}
                  className={`px-4 py-2 rounded-lg text-white
                  ${joined ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"}`}
                >
                  {joined ? "Joined" : "Join"}
                </button>

              </div>


              {/* THREADS */}
              <div className="space-y-6">

                {sampleThreads.map((thread, index) => (

                  <div key={index} className="bg-pink-500 p-5 rounded-lg">

                    <div className="flex justify-between mb-2">

                      <h3 className="font-semibold text-lg text-white">
                        {thread.title}
                      </h3>

                      <span className="text-white text-sm">
                        ▲ {thread.upvotes}
                      </span>

                    </div>

                    <p className="text-sm text-white opacity-80 mb-3">
                      posted by u/{thread.author} • {thread.time}
                    </p>


                    {/* COMMENTS */}
                    <div className="space-y-3 border-l border-pink-300 pl-3">

                      {thread.comments.map((comment, cIndex) => (

                        <div key={cIndex} className="bg-pink-400 p-3 rounded-md">

                          <p className="text-sm font-semibold text-white">
                            u/{comment.author}
                          </p>

                          <p className="text-sm text-white">
                            {comment.text}
                          </p>


                          {/* REPLIES */}
                          {comment.replies.length > 0 && (

                            <div className="mt-2 ml-4 space-y-2 border-l border-pink-200 pl-3">

                              {comment.replies.map((reply, rIndex) => (

                                <div key={rIndex} className="bg-pink-300 p-2 rounded-md">

                                  <p className="text-xs font-semibold text-white">
                                    u/{reply.author}
                                  </p>

                                  <p className="text-xs text-white">
                                    {reply.text}
                                  </p>

                                </div>

                              ))}

                            </div>

                          )}

                        </div>

                      ))}

                    </div>

                  </div>

                ))}

              </div>
            </>
          )}

        </div>

      </section>
    </>
  );
}

export default Community;
