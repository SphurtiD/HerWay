import React, { useState } from 'react'

// ── Mock Data ────────────────────────────────────────────────────────────────

const FORUM_POSTS = [
  {
    id: 1,
    author: "Priya S.",
    avatar: "P",
    avatarColor: "#f472b6",
    tag: "Safety Tips",
    tagColor: "#fce7f3",
    tagText: "#be185d",
    title: "How I stay safe during late-night commutes 🌙",
    body: "After years of navigating the city after dark, I've built a little toolkit — sharing locations with trusted friends, keeping my earphones out on quiet streets, and using HerWay's map to spot well-lit routes. What are your go-to habits?",
    likes: 48,
    comments: 12,
    time: "2h ago",
    liked: false,
    thread: [
      {
        id: 1, author: "Riya D.", avatar: "R", avatarColor: "#fb7185",
        text: "This is so helpful! I also keep a fully charged power bank at all times — dead phone = no location sharing 😬",
        time: "1h ago", likes: 14, liked: false,
        replies: [
          { id: 11, author: "Fatima K.", avatar: "F", avatarColor: "#a78bfa", replyTo: "Riya D.", text: "Same!! I bought a mini power bank that clips to my bag. Never leaving home without it 🔋", time: "55m ago", likes: 6, liked: false },
          { id: 12, author: "Priya S.", avatar: "P", avatarColor: "#f472b6", isOP: true, replyTo: "Riya D.", text: "Yes the power bank tip is SO underrated. Adding this to the list!", time: "50m ago", likes: 4, liked: false },
        ]
      },
      {
        id: 2, author: "Fatima K.", avatar: "F", avatarColor: "#a78bfa",
        text: "I started using HerWay's map to check which routes have more street lights. Total game changer for my 11pm walks to the bus stop.",
        time: "45m ago", likes: 9, liked: false,
        replies: [
          { id: 21, author: "Simran T.", avatar: "S", avatarColor: "#34d399", replyTo: "Fatima K.", text: "Which layer do you use on the map for that? I didn't know that feature existed!", time: "40m ago", likes: 3, liked: false },
          { id: 22, author: "Fatima K.", avatar: "F", avatarColor: "#a78bfa", replyTo: "Simran T.", text: "It's under safety layers! Toggle on 'lighting' and it highlights well-lit paths in yellow 💡", time: "35m ago", likes: 7, liked: false },
        ]
      },
      {
        id: 3, author: "Simran T.", avatar: "S", avatarColor: "#34d399",
        text: "I wear one earbud only after 9pm so I can always hear my surroundings. Small habit but it makes a huge difference.",
        time: "20m ago", likes: 11, liked: false,
        replies: []
      },
    ],
  },
  {
    id: 2,
    author: "Aisha M.",
    avatar: "A",
    avatarColor: "#a78bfa",
    tag: "Support",
    tagColor: "#ede9fe",
    tagText: "#6d28d9",
    title: "Feeling anxious about solo travel — any advice?",
    body: "Planning my first solo trip next month and honestly my nerves are getting the best of me. Would love to hear from women who've done it and how you mentally prepared yourselves. Every bit of encouragement helps 💛",
    likes: 73,
    comments: 29,
    time: "5h ago",
    liked: false,
    thread: [
      {
        id: 1, author: "Neha V.", avatar: "N", avatarColor: "#f59e0b",
        text: "I felt the exact same way before my first solo trip to Rishikesh! The anxiety melts away the moment you step off that train. You've got this 🙌",
        time: "4h ago", likes: 23, liked: false,
        replies: [
          { id: 11, author: "Aisha M.", avatar: "A", avatarColor: "#a78bfa", isOP: true, replyTo: "Neha V.", text: "Omg this is exactly what I needed to hear 🥺 Rishikesh is actually on my list!", time: "3h ago", likes: 9, liked: false },
          { id: 12, author: "Neha V.", avatar: "N", avatarColor: "#f59e0b", replyTo: "Aisha M.", text: "Then you HAVE to go! DM me and I'll share my full itinerary with you 💛", time: "2h ago", likes: 14, liked: false },
        ]
      },
      {
        id: 2, author: "Preethi R.", avatar: "P", avatarColor: "#ec4899",
        text: "Book your first night's accommodation in advance — having a confirmed place to go makes arrival 10x less stressful. Everything else can be figured out as you go.",
        time: "3h ago", likes: 18, liked: false,
        replies: [
          { id: 21, author: "Kavita J.", avatar: "K", avatarColor: "#0ea5e9", replyTo: "Preethi R.", text: "Also research the area around your hotel beforehand! Google Street View is great for this.", time: "2h ago", likes: 5, liked: false },
        ]
      },
      {
        id: 3, author: "Shreya B.", avatar: "S", avatarColor: "#10b981",
        text: "Don't over-plan! Leave room for spontaneity. Some of my best travel memories were completely unplanned. Trust your instincts 💛",
        time: "1h ago", likes: 9, liked: false,
        replies: []
      },
    ],
  },
  {
    id: 3,
    author: "Meera R.",
    avatar: "M",
    avatarColor: "#34d399",
    tag: "Resources",
    tagColor: "#d1fae5",
    tagText: "#065f46",
    title: "Free self-defence workshops in Pune this weekend!",
    body: "Found a great free workshop by SheSafe NGO — open to all women, no experience needed. Covers basic moves, situational awareness, and de-escalation. DM me for details or check their Instagram page.",
    likes: 121,
    comments: 44,
    time: "1d ago",
    liked: false,
    thread: [
      {
        id: 1, author: "Ananya P.", avatar: "A", avatarColor: "#f472b6",
        text: "I attended their last workshop in December! The instructors are so patient with beginners. Highly recommend 🙏",
        time: "22h ago", likes: 31, liked: false,
        replies: [
          { id: 11, author: "Divya S.", avatar: "D", avatarColor: "#fb923c", replyTo: "Ananya P.", text: "Is this open to women of all ages? Asking for my mom 🙏", time: "21h ago", likes: 4, liked: false },
          { id: 12, author: "Meera R.", avatar: "M", avatarColor: "#34d399", isOP: true, replyTo: "Divya S.", text: "Yes!! The oldest participant last time was 58. Your mom will love it 🌸", time: "20h ago", likes: 17, liked: false },
          { id: 13, author: "Divya S.", avatar: "D", avatarColor: "#fb923c", replyTo: "Meera R.", text: "That's amazing, registering her right now! Thank you both 💕", time: "19h ago", likes: 8, liked: false },
        ]
      },
      {
        id: 2, author: "Zara M.", avatar: "Z", avatarColor: "#8b5cf6",
        text: "Just registered! Thank you so much for sharing this Meera. These kinds of resources are why I love this community 💕",
        time: "10h ago", likes: 14, liked: false,
        replies: []
      },
    ],
  },
  {
    id: 4,
    author: "Tanvi K.",
    avatar: "T",
    avatarColor: "#fb923c",
    tag: "Discussion",
    tagColor: "#ffedd5",
    tagText: "#9a3412",
    title: "Should public transport have women-only coaches?",
    body: "Mixed feelings on this. On one hand it feels like a band-aid solution; on the other it genuinely makes me feel safer during rush hour. Curious what this community thinks — is it empowerment or segregation?",
    likes: 95,
    comments: 67,
    time: "2d ago",
    liked: false,
    thread: [
      {
        id: 1, author: "Rhea G.", avatar: "R", avatarColor: "#ec4899",
        text: "Honestly? Both can be true. It's a band-aid AND it gives me breathing room right now. I'll take safety over ideological purity any day.",
        time: "1d ago", likes: 44, liked: false,
        replies: [
          { id: 11, author: "Lina V.", avatar: "L", avatarColor: "#0ea5e9", replyTo: "Rhea G.", text: "Fair point but the 'band-aid' normalises the idea that women are responsible for avoiding harm rather than fixing the system.", time: "23h ago", likes: 19, liked: false },
          { id: 12, author: "Rhea G.", avatar: "R", avatarColor: "#ec4899", replyTo: "Lina V.", text: "I agree 100% on root causes. But I need to get home safe tonight AND fix the system — those aren't mutually exclusive.", time: "22h ago", likes: 31, liked: false },
        ]
      },
      {
        id: 2, author: "Pooja N.", avatar: "P", avatarColor: "#a78bfa",
        text: "I travel from Noida to Delhi daily. The women's coach in the metro is the only reason I can read a book in peace instead of being on high alert the whole time.",
        time: "20h ago", likes: 52, liked: false,
        replies: [
          { id: 21, author: "Tanvi K.", avatar: "T", avatarColor: "#fb923c", isOP: true, replyTo: "Pooja N.", text: "This is exactly the everyday reality I was thinking about when I posted. Thank you for sharing 💙", time: "18h ago", likes: 22, liked: false },
        ]
      },
      {
        id: 3, author: "Shreya A.", avatar: "S", avatarColor: "#34d399",
        text: "This discussion is exactly why spaces like HerWay matter. We can have nuanced conversations without being dismissed 💙",
        time: "8h ago", likes: 21, liked: false,
        replies: []
      },
    ],
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    author: "Ritu B.",
    avatar: "R",
    avatarColor: "#f43f5e",
    location: "Mumbai",
    quote: "HerWay's fake call feature saved me from a really uncomfortable situation on the metro. I can't thank this community enough for being so real and supportive.",
    stars: 5,
  },
  {
    id: 2,
    author: "Sneha P.",
    avatar: "S",
    avatarColor: "#8b5cf6",
    location: "Bengaluru",
    quote: "I was hesitant to travel alone but after reading stories here I felt like I had a thousand sisters with me. Took my first solo trip last month. Best decision ever.",
    stars: 5,
  },
  {
    id: 3,
    author: "Divya T.",
    avatar: "D",
    avatarColor: "#0ea5e9",
    location: "Delhi",
    quote: "The map feature and this forum together — that's the combo. I use the map to plan and the forum to feel less alone. This app gets it.",
    stars: 5,
  },
]

const ALL_TAGS = ["All", "Safety Tips", "Support", "Resources", "Discussion"]

const INDIAN_STATES = [
  { code: "MH", name: "Maharashtra", emoji: "🏙️", color: "#f472b6", light: "#fce7f3", posts: 142, members: 890 },
  { code: "DL", name: "Delhi", emoji: "🕌", color: "#a78bfa", light: "#ede9fe", posts: 198, members: 1240 },
  { code: "KA", name: "Karnataka", emoji: "🌿", color: "#34d399", light: "#d1fae5", posts: 113, members: 720 },
  { code: "TN", name: "Tamil Nadu", emoji: "🪔", color: "#fb923c", light: "#ffedd5", posts: 97, members: 610 },
  { code: "WB", name: "West Bengal", emoji: "🎨", color: "#f59e0b", light: "#fef3c7", posts: 84, members: 530 },
  { code: "RJ", name: "Rajasthan", emoji: "🏜️", color: "#ec4899", light: "#fce7f3", posts: 76, members: 480 },
  { code: "UP", name: "Uttar Pradesh", emoji: "🕍", color: "#0ea5e9", light: "#e0f2fe", posts: 165, members: 1050 },
  { code: "KL", name: "Kerala", emoji: "🌴", color: "#10b981", light: "#d1fae5", posts: 88, members: 560 },
  { code: "GJ", name: "Gujarat", emoji: "🎡", color: "#8b5cf6", light: "#ede9fe", posts: 102, members: 640 },
  { code: "TS", name: "Telangana", emoji: "💎", color: "#f43f5e", light: "#ffe4e6", posts: 79, members: 495 },
  { code: "AP", name: "Andhra Pradesh", emoji: "🌾", color: "#06b6d4", light: "#cffafe", posts: 68, members: 430 },
  { code: "MP", name: "Madhya Pradesh", emoji: "🐯", color: "#d97706", light: "#fef3c7", posts: 71, members: 445 },
]

const STATE_POSTS = {
  MH: [
    { id: 101, author: "Shreya N.", avatar: "S", avatarColor: "#f472b6", tag: "Safety Tips", tagColor: "#fce7f3", tagText: "#be185d", title: "Best safe zones near Dadar station 🚉", body: "Compiled a list of well-lit cafes and shops near Dadar where you can wait safely late at night. Especially useful for women catching late locals!", likes: 64, comments: 18, time: "3h ago", liked: false,
      thread: [
        { id: 1, author: "Riya K.", avatar: "R", avatarColor: "#fb7185", text: "The Starbucks near Dadar West is open till midnight and well-lit! Saved me so many times 🙌", time: "2h ago", likes: 12, liked: false, replies: [
          { id: 11, author: "Pooja M.", avatar: "P", avatarColor: "#a78bfa", replyTo: "Riya K.", text: "Seconded! The staff there is also really understanding if you just want to sit and wait.", time: "1h ago", likes: 5, liked: false },
          { id: 12, author: "Shreya N.", avatar: "S", avatarColor: "#f472b6", isOP: true, replyTo: "Riya K.", text: "Adding this to the list! Keep them coming 💕", time: "45m ago", likes: 4, liked: false },
        ]},
        { id: 2, author: "Meena T.", avatar: "M", avatarColor: "#34d399", text: "Does anyone have suggestions for the Andheri area? I get off really late from work near the station.", time: "1h ago", likes: 8, liked: false, replies: [
          { id: 21, author: "Shreya N.", avatar: "S", avatarColor: "#f472b6", isOP: true, replyTo: "Meena T.", text: "I'll do a separate post for Andheri! For now, the McDonald's near the East exit is open 24/7 🌙", time: "50m ago", likes: 9, liked: false },
        ]},
      ]
    },
    { id: 102, author: "Pooja M.", avatar: "P", avatarColor: "#a78bfa", tag: "Discussion", tagColor: "#ede9fe", tagText: "#6d28d9", title: "Auto-rickshaw safety in Mumbai — your experiences?", body: "Had a weird experience last week with an auto driver who kept taking detours. Sharing apps with family helped. What do you all do?", likes: 89, comments: 31, time: "1d ago", liked: false,
      thread: [
        { id: 1, author: "Fatima A.", avatar: "F", avatarColor: "#0ea5e9", text: "I always share the auto number plate on our family WhatsApp group before starting the ride. Takes 10 seconds and gives so much peace of mind.", time: "22h ago", likes: 34, liked: false, replies: [
          { id: 11, author: "Pooja M.", avatar: "P", avatarColor: "#a78bfa", isOP: true, replyTo: "Fatima A.", text: "This is exactly what I do now! Also screenshot the Rapido/Ola booking details.", time: "20h ago", likes: 11, liked: false },
        ]},
        { id: 2, author: "Sunita R.", avatar: "S", avatarColor: "#f59e0b", text: "Honestly I just call someone the moment I get in and stay on the call for at least 5 minutes. Visible deterrent.", time: "18h ago", likes: 21, liked: false, replies: [] },
      ]
    },
  ],
  DL: [
    { id: 201, author: "Nisha K.", avatar: "N", avatarColor: "#a78bfa", tag: "Support", tagColor: "#ede9fe", tagText: "#6d28d9", title: "Delhi Metro women's coach — tips & experiences", body: "The women's coach has been a lifesaver for me during peak hours. But I've noticed some issues at certain stations. Let's discuss!", likes: 112, comments: 47, time: "2h ago", liked: false,
      thread: [
        { id: 1, author: "Ritika S.", avatar: "R", avatarColor: "#f43f5e", text: "Rajiv Chowk during evening rush is where enforcement completely breaks down. Men just walk in and nobody says anything.", time: "1h ago", likes: 29, liked: false, replies: [
          { id: 11, author: "Nisha K.", avatar: "N", avatarColor: "#a78bfa", isOP: true, replyTo: "Ritika S.", text: "YES. I've complained to staff twice and nothing changes. We need to collectively report this.", time: "55m ago", likes: 18, liked: false },
          { id: 12, author: "Priya D.", avatar: "P", avatarColor: "#34d399", replyTo: "Nisha K.", text: "There's a DMRC feedback app — if enough of us report the same stations it might actually escalate!", time: "40m ago", likes: 12, liked: false },
        ]},
        { id: 2, author: "Ananya B.", avatar: "A", avatarColor: "#10b981", text: "The coaches at terminal stations are always much better. I try to board at the start of the line whenever I can.", time: "30m ago", likes: 7, liked: false, replies: [] },
      ]
    },
    { id: 202, author: "Ritika S.", avatar: "R", avatarColor: "#f43f5e", tag: "Resources", tagColor: "#ffe4e6", tagText: "#9f1239", title: "Delhi Police helpline numbers every woman should save 📞", body: "Beyond 100, there's PCR, women helpline 181, and the iSafe Delhi app. Sharing a quick reference guide I made for all of us.", likes: 156, comments: 52, time: "4h ago", liked: false,
      thread: [
        { id: 1, author: "Kavya M.", avatar: "K", avatarColor: "#8b5cf6", text: "The 181 helpline is genuinely fast in my experience. Got a response within 8 minutes once. Save it everyone!", time: "3h ago", likes: 41, liked: false, replies: [
          { id: 11, author: "Ritika S.", avatar: "R", avatarColor: "#f43f5e", isOP: true, replyTo: "Kavya M.", text: "Glad to hear this! I've added the response times in my guide too. Sharing the doc link below 💙", time: "2h ago", likes: 15, liked: false },
        ]},
        { id: 2, author: "Zoya H.", avatar: "Z", avatarColor: "#fb923c", text: "Can someone tell me if iSafe Delhi works offline? My data cuts out in certain metro areas.", time: "1h ago", likes: 6, liked: false, replies: [
          { id: 21, author: "Nisha K.", avatar: "N", avatarColor: "#a78bfa", replyTo: "Zoya H.", text: "It doesn't fully work offline but your SOS location is cached every 5 mins so it sends when signal returns!", time: "45m ago", likes: 9, liked: false },
        ]},
      ]
    },
  ],
  KA: [
    { id: 301, author: "Kavya R.", avatar: "K", avatarColor: "#34d399", tag: "Safety Tips", tagColor: "#d1fae5", tagText: "#065f46", title: "Safe cab routes from Koramangala after 10pm 🌙", body: "Bengaluru nights can be tricky. Here are the routes I always prefer and apps I use to share live location while travelling.", likes: 78, comments: 22, time: "6h ago", liked: false,
      thread: [
        { id: 1, author: "Deepa S.", avatar: "D", avatarColor: "#f472b6", text: "I always take the 80ft road route even if it's slightly longer — it's way more lit and has shops open till late.", time: "5h ago", likes: 17, liked: false, replies: [
          { id: 11, author: "Kavya R.", avatar: "K", avatarColor: "#34d399", isOP: true, replyTo: "Deepa S.", text: "Exactly my pick too! The shortcut through the BDA complex feels sketchy after 9pm.", time: "4h ago", likes: 8, liked: false },
        ]},
        { id: 2, author: "Leena P.", avatar: "L", avatarColor: "#fb923c", text: "Namma Yatri shows driver ratings and trip history now. I only take cabs with 4.7+ rating at night.", time: "3h ago", likes: 13, liked: false, replies: [] },
      ]
    },
  ],
  TN: [
    { id: 401, author: "Lakshmi V.", avatar: "L", avatarColor: "#fb923c", tag: "Discussion", tagColor: "#ffedd5", tagText: "#9a3412", title: "Feeling safe in Chennai vs other metros — your take?", body: "I've lived in both Chennai and Delhi and the difference in how I feel walking alone at night is stark. Chennai feels relatively safer to me. What's your experience?", likes: 93, comments: 38, time: "1d ago", liked: false,
      thread: [
        { id: 1, author: "Priya S.", avatar: "P", avatarColor: "#a78bfa", text: "As a Chennai local I agree — but I think it varies a lot by area. T Nagar at night vs Anna Nagar are very different experiences.", time: "22h ago", likes: 22, liked: false, replies: [
          { id: 11, author: "Lakshmi V.", avatar: "L", avatarColor: "#fb923c", isOP: true, replyTo: "Priya S.", text: "That's such a fair point — I was mostly comparing city centres. Would love a Chennai-specific breakdown!", time: "20h ago", likes: 10, liked: false },
        ]},
        { id: 2, author: "Meera R.", avatar: "M", avatarColor: "#10b981", text: "The beach stretch near Besant Nagar is lovely even late in the evening because of how many families are around 🌊", time: "15h ago", likes: 18, liked: false, replies: [] },
      ]
    },
  ],
  WB: [
    { id: 501, author: "Diya B.", avatar: "D", avatarColor: "#f59e0b", tag: "Resources", tagColor: "#fef3c7", tagText: "#92400e", title: "Kolkata's all-women cab service — have you tried it?", body: "Found a local service run by women for women in Kolkata. Affordable, safe, and the drivers are trained for emergency situations. Highly recommend!", likes: 67, comments: 15, time: "2d ago", liked: false,
      thread: [
        { id: 1, author: "Rupa G.", avatar: "R", avatarColor: "#f43f5e", text: "Is this the Pink Cab service? I've seen their autos near Ballygunge! So happy this exists.", time: "1d ago", likes: 19, liked: false, replies: [
          { id: 11, author: "Diya B.", avatar: "D", avatarColor: "#f59e0b", isOP: true, replyTo: "Rupa G.", text: "Yes that's them! Book via their WhatsApp number — they respond within minutes 🌸", time: "22h ago", likes: 11, liked: false },
        ]},
        { id: 2, author: "Tanisha M.", avatar: "T", avatarColor: "#8b5cf6", text: "Do they operate late nights too? I have 11pm shifts sometimes.", time: "20h ago", likes: 5, liked: false, replies: [
          { id: 21, author: "Diya B.", avatar: "D", avatarColor: "#f59e0b", isOP: true, replyTo: "Tanisha M.", text: "Yes till midnight! For anything later they have an on-call driver option.", time: "18h ago", likes: 8, liked: false },
        ]},
      ]
    },
  ],
  RJ: [
    { id: 601, author: "Ananya S.", avatar: "A", avatarColor: "#ec4899", tag: "Support", tagColor: "#fce7f3", tagText: "#be185d", title: "Solo travel to Rajasthan as a woman — is it safe?", body: "Planning a heritage circuit solo. Would love advice from women who've done Jaipur, Jodhpur, Udaipur solo. What to watch out for?", likes: 104, comments: 59, time: "5h ago", liked: false,
      thread: [
        { id: 1, author: "Seema J.", avatar: "S", avatarColor: "#f59e0b", text: "Did Rajasthan solo last year! Udaipur was absolute magic — felt very safe, locals are used to tourists. Jaipur Old City needs more alertness but totally doable.", time: "4h ago", likes: 37, liked: false, replies: [
          { id: 11, author: "Ananya S.", avatar: "A", avatarColor: "#ec4899", isOP: true, replyTo: "Seema J.", text: "This is so reassuring!! Any specific areas in Jaipur to be careful about?", time: "3h ago", likes: 12, liked: false },
          { id: 12, author: "Seema J.", avatar: "S", avatarColor: "#f59e0b", replyTo: "Ananya S.", text: "The Johri Bazaar lanes get a bit crowded and chaotic. Stay on main roads and be firm if touts approach 💪", time: "2h ago", likes: 16, liked: false },
        ]},
        { id: 2, author: "Priya V.", avatar: "P", avatarColor: "#a78bfa", text: "Jodhpur has amazing women-owned guesthouses run by local families. They're the safest stays and usually great value too!", time: "1h ago", likes: 24, liked: false, replies: [] },
      ]
    },
  ],
  UP: [
    { id: 701, author: "Prerna G.", avatar: "P", avatarColor: "#0ea5e9", tag: "Safety Tips", tagColor: "#e0f2fe", tagText: "#0c4a6e", title: "Agra safety guide for solo female travellers 🕌", body: "Just returned from a solo trip to Agra. Sharing a detailed safety guide — best areas to stay, tuk-tuk tips, and how to handle unwanted attention confidently.", likes: 133, comments: 61, time: "8h ago", liked: false,
      thread: [
        { id: 1, author: "Riya B.", avatar: "R", avatarColor: "#fb923c", text: "The pre-paid tuk-tuk stand outside Agra Cantt station is the safest option — fixed price, registered drivers. Never negotiate with random guys outside.", time: "7h ago", likes: 44, liked: false, replies: [
          { id: 11, author: "Prerna G.", avatar: "P", avatarColor: "#0ea5e9", isOP: true, replyTo: "Riya B.", text: "This is in my guide too! And always get a receipt at the prepaid counter 🙏", time: "6h ago", likes: 19, liked: false },
        ]},
        { id: 2, author: "Mahi S.", avatar: "M", avatarColor: "#8b5cf6", text: "Which accommodation area did you stay in? I've heard Taj Ganj can feel a bit sketchy.", time: "4h ago", likes: 9, liked: false, replies: [
          { id: 21, author: "Prerna G.", avatar: "P", avatarColor: "#0ea5e9", isOP: true, replyTo: "Mahi S.", text: "I stayed near Sadar Bazaar — quieter, cleaner, safer vibe. 10 min from the Taj and much more relaxed.", time: "3h ago", likes: 14, liked: false },
        ]},
      ]
    },
  ],
  KL: [
    { id: 801, author: "Meghna P.", avatar: "M", avatarColor: "#10b981", tag: "Discussion", tagColor: "#d1fae5", tagText: "#065f46", title: "Why Kerala feels different — women's safety culture here", body: "As someone who moved to Thiruvananthapuram from UP, the difference in everyday safety is real. Let's talk about what makes Kerala stand out and what still needs work.", likes: 88, comments: 34, time: "1d ago", liked: false,
      thread: [
        { id: 1, author: "Anjali N.", avatar: "A", avatarColor: "#f472b6", text: "I think literacy and women's workforce participation genuinely shapes street culture here. Women are visible everywhere — markets, offices, late buses — so it feels normal.", time: "22h ago", likes: 29, liked: false, replies: [
          { id: 11, author: "Meghna P.", avatar: "M", avatarColor: "#10b981", isOP: true, replyTo: "Anjali N.", text: "Exactly what I've been thinking! Visibility normalises it. Though the bus timings after 9pm are still a gap.", time: "20h ago", likes: 13, liked: false },
        ]},
        { id: 2, author: "Sreeja V.", avatar: "S", avatarColor: "#0ea5e9", text: "Kochi has improved a lot but smaller towns still have their issues. It's not uniform across the state sadly.", time: "10h ago", likes: 17, liked: false, replies: [] },
      ]
    },
  ],
  GJ: [
    { id: 901, author: "Hetal D.", avatar: "H", avatarColor: "#8b5cf6", tag: "Resources", tagColor: "#ede9fe", tagText: "#6d28d9", title: "Navratri safety — large crowds, smart moves 🎡", body: "Garba season is beautiful but crowds can be overwhelming. Sharing tips on staying safe, keeping track of your group, and what to do if you feel unsafe.", likes: 119, comments: 43, time: "3d ago", liked: false,
      thread: [
        { id: 1, author: "Kavya S.", avatar: "K", avatarColor: "#fb923c", text: "The buddy system is everything during Navratri. We have a group rule: if anyone wants to leave, at least two people go together. Non-negotiable.", time: "2d ago", likes: 31, liked: false, replies: [
          { id: 11, author: "Hetal D.", avatar: "H", avatarColor: "#8b5cf6", isOP: true, replyTo: "Kavya S.", text: "Love this rule! Adding it to the guide. Also designate a meeting point at the start in case phones die.", time: "2d ago", likes: 16, liked: false },
        ]},
        { id: 2, author: "Nidhi P.", avatar: "N", avatarColor: "#f43f5e", text: "Wear your dupatta pinned — it's so easy for it to get caught in crowds. Found this out the hard way last year 😅", time: "1d ago", likes: 22, liked: false, replies: [] },
      ]
    },
  ],
  TS: [
    { id: 1001, author: "Sravya K.", avatar: "S", avatarColor: "#f43f5e", tag: "Safety Tips", tagColor: "#ffe4e6", tagText: "#9f1239", title: "Hyderabad night life safety — Hi-Tech City area", body: "Working late shifts in HITEC City? Here's what the community has gathered about safe cab options, buddy systems, and emergency contacts specific to Hyderabad.", likes: 72, comments: 27, time: "4h ago", liked: false,
      thread: [
        { id: 1, author: "Priya A.", avatar: "P", avatarColor: "#a78bfa", text: "The Uber/Ola pool feature is a strict no after 9pm in my opinion. Solo cab only, and share the details with someone.", time: "3h ago", likes: 21, liked: false, replies: [
          { id: 11, author: "Sravya K.", avatar: "S", avatarColor: "#f43f5e", isOP: true, replyTo: "Priya A.", text: "100%! I put this as tip #1 in my guide. Pool rides at night are just not worth the risk.", time: "2h ago", likes: 10, liked: false },
        ]},
        { id: 2, author: "Divya R.", avatar: "D", avatarColor: "#10b981", text: "My company has an emergency transport line for women working past 8pm. Ask your HR if yours does too — many tech companies have this!", time: "1h ago", likes: 15, liked: false, replies: [] },
      ]
    },
  ],
  AP: [
    { id: 1101, author: "Varsha R.", avatar: "V", avatarColor: "#06b6d4", tag: "Support", tagColor: "#cffafe", tagText: "#164e63", title: "Moving to Vizag alone — any tips from locals?", body: "Relocating for a new job in Visakhapatnam next month. First time living alone in a new city. Would love advice from women already settled there!", likes: 55, comments: 24, time: "6h ago", liked: false,
      thread: [
        { id: 1, author: "Swathi N.", avatar: "S", avatarColor: "#f472b6", text: "Welcome to Vizag! The Gajuwaka and MVP Colony areas are great for working women — good connectivity and safe neighbourhoods.", time: "5h ago", likes: 18, liked: false, replies: [
          { id: 11, author: "Varsha R.", avatar: "V", avatarColor: "#06b6d4", isOP: true, replyTo: "Swathi N.", text: "Thank you so much!! My office is near Rushikonda — would either of those work commute-wise?", time: "4h ago", likes: 6, liked: false },
          { id: 12, author: "Swathi N.", avatar: "S", avatarColor: "#f472b6", replyTo: "Varsha R.", text: "MVP Colony is perfect for Rushikonda — 15 mins by auto and the road is well-lit! DM me for PG recommendations 💙", time: "3h ago", likes: 11, liked: false },
        ]},
      ]
    },
  ],
  MP: [
    { id: 1201, author: "Roshni T.", avatar: "R", avatarColor: "#d97706", tag: "Discussion", tagColor: "#fef3c7", tagText: "#92400e", title: "Bhopal to Khajuraho — road trip safety for women", body: "Planning an MP road trip with two friends. Any women who've done this route? Safe dhabas, stay options, and must-know stops would be super helpful!", likes: 61, comments: 29, time: "2d ago", liked: false,
      thread: [
        { id: 1, author: "Nitu S.", avatar: "N", avatarColor: "#a78bfa", text: "Did this exact route in February! The Highway Treat dhaba near Sagar is genuinely safe — families all around and the staff is respectful.", time: "1d ago", likes: 22, liked: false, replies: [
          { id: 11, author: "Roshni T.", avatar: "R", avatarColor: "#d97706", isOP: true, replyTo: "Nitu S.", text: "Saving this!! Any overnight stay recommendations midway?", time: "1d ago", likes: 7, liked: false },
          { id: 12, author: "Nitu S.", avatar: "N", avatarColor: "#a78bfa", replyTo: "Roshni T.", text: "We stayed at a Zostel in Panna — super safe, mostly backpackers, good community feel 🏕️", time: "22h ago", likes: 12, liked: false },
        ]},
        { id: 2, author: "Rekha V.", avatar: "R", avatarColor: "#10b981", text: "Keep your fuel above half tank at all times on this route. Petrol pumps get sparse after Damoh.", time: "20h ago", likes: 19, liked: false, replies: [] },
      ]
    },
  ],
}

// ── Sub-components ────────────────────────────────────────────────────────────

const Avatar = ({ letter, color, size = 40 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 700,
      fontSize: size * 0.4,
      flexShrink: 0,
      fontFamily: "'Nunito', sans-serif",
    }}
  >
    {letter}
  </div>
)

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
    ))}
  </div>
)

// ── Modal ─────────────────────────────────────────────────────────────────────

const NewPostModal = ({ onClose }) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tag, setTag] = useState("Safety Tips")

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 24,
        padding: "2rem",
        width: "100%",
        maxWidth: 520,
        boxShadow: "0 24px 60px rgba(236,72,153,0.15)",
        animation: "modalPop 0.25s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1e1e1e", margin: 0 }}>
            Share with the community 🌸
          </h3>
          <button onClick={onClose} style={{ background: "#fce7f3", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#be185d" }}>✕</button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Category</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
            {["Safety Tips", "Support", "Resources", "Discussion"].map(t => (
              <button key={t} onClick={() => setTag(t)} style={{
                padding: "4px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                border: tag === t ? "2px solid #ec4899" : "2px solid #f3f4f6",
                background: tag === t ? "#fce7f3" : "#f9fafb",
                color: tag === t ? "#be185d" : "#6b7280",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600, transition: "all 0.15s",
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Your story or question</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Share details, experiences, or ask for advice..."
            rows={4}
            style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: 12, border: "2px solid #f3f4f6",
            background: "#f9fafb", color: "#6b7280", fontWeight: 700,
            fontFamily: "'Nunito', sans-serif", cursor: "pointer", fontSize: 15,
          }}>Cancel</button>
          <button style={{
            flex: 2, padding: "12px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #f472b6, #ec4899)",
            color: "#fff", fontWeight: 700,
            fontFamily: "'Nunito', sans-serif", cursor: "pointer", fontSize: 15,
            boxShadow: "0 4px 16px rgba(236,72,153,0.3)",
          }}>Post to Community ✦</button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: "block",
  fontFamily: "'Nunito', sans-serif",
  fontSize: 13,
  fontWeight: 700,
  color: "#6b7280",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 12,
  border: "2px solid #f3f4f6",
  fontFamily: "'Nunito', sans-serif",
  fontSize: 15,
  color: "#1e1e1e",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
}

// ── Main Community Page ───────────────────────────────────────────────────────

const Community = () => {
  const [posts, setPosts] = useState(FORUM_POSTS)
  const [activeTag, setActiveTag] = useState("All")
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState("forum")
  const [selectedState, setSelectedState] = useState(null)
  const [statePosts, setStatePosts] = useState(STATE_POSTS)
  const [expandedPost, setExpandedPost] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null) // { postId, commentId, author }
  const [replyText, setReplyText] = useState("")
  const [expandedReplies, setExpandedReplies] = useState({}) // { "postId-commentId": bool }
  const [commentInputs, setCommentInputs] = useState({})

  const toggleExpandReplies = (postId, commentId) => {
    const key = `${postId}-${commentId}`
    setExpandedReplies(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleLikeComment = (postId, commentId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p,
        thread: p.thread.map(c =>
          c.id === commentId
            ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
            : c
        )
      } : p
    ))
  }

  const toggleLikeReply = (postId, commentId, replyId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p,
        thread: p.thread.map(c =>
          c.id === commentId ? {
            ...c,
            replies: c.replies.map(r =>
              r.id === replyId
                ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
                : r
            )
          } : c
        )
      } : p
    ))
  }

  const submitReply = (postId, commentId) => {
    const text = replyText.trim()
    if (!text) return
    const targetComment = posts.find(p => p.id === postId)?.thread.find(c => c.id === commentId)
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p,
        thread: p.thread.map(c =>
          c.id === commentId ? {
            ...c,
            replies: [...c.replies, {
              id: Date.now(),
              author: "You",
              avatar: "U",
              avatarColor: "#ec4899",
              replyTo: replyingTo?.author || targetComment?.author,
              text,
              time: "Just now",
              likes: 0,
              liked: false,
            }]
          } : c
        )
      } : p
    ))
    setReplyText("")
    setReplyingTo(null)
    const key = `${postId}-${commentId}`
    setExpandedReplies(prev => ({ ...prev, [key]: true }))
  }

  const submitComment = (postId) => {
    const text = (commentInputs[postId] || "").trim()
    if (!text) return
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p,
        comments: p.comments + 1,
        thread: [...p.thread, {
          id: Date.now(),
          author: "You",
          avatar: "U",
          avatarColor: "#ec4899",
          text,
          time: "Just now",
          likes: 0,
          liked: false,
          replies: [],
        }]
      } : p
    ))
    setCommentInputs(prev => ({ ...prev, [postId]: "" }))
  }

  const [expandedStatePost, setExpandedStatePost] = useState(null)
  const [stateReplyingTo, setStateReplyingTo] = useState(null)
  const [stateReplyText, setStateReplyText] = useState("")
  const [stateExpandedReplies, setStateExpandedReplies] = useState({})
  const [stateCommentInputs, setStateCommentInputs] = useState({})

  const toggleStateExpandReplies = (postId, commentId) => {
    const key = `${postId}-${commentId}`
    setStateExpandedReplies(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleLikeStateComment = (stateCode, postId, commentId) => {
    setStatePosts(prev => ({
      ...prev,
      [stateCode]: prev[stateCode].map(p =>
        p.id === postId ? {
          ...p,
          thread: p.thread.map(c =>
            c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
          )
        } : p
      )
    }))
  }

  const toggleLikeStateReply = (stateCode, postId, commentId, replyId) => {
    setStatePosts(prev => ({
      ...prev,
      [stateCode]: prev[stateCode].map(p =>
        p.id === postId ? {
          ...p,
          thread: p.thread.map(c =>
            c.id === commentId ? {
              ...c,
              replies: c.replies.map(r =>
                r.id === replyId ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
              )
            } : c
          )
        } : p
      )
    }))
  }

  const submitStateReply = (stateCode, postId, commentId) => {
    const text = stateReplyText.trim()
    if (!text) return
    setStatePosts(prev => ({
      ...prev,
      [stateCode]: prev[stateCode].map(p =>
        p.id === postId ? {
          ...p,
          thread: p.thread.map(c =>
            c.id === commentId ? {
              ...c,
              replies: [...c.replies, {
                id: Date.now(), author: "You", avatar: "U", avatarColor: "#ec4899",
                replyTo: stateReplyingTo?.author, text, time: "Just now", likes: 0, liked: false,
              }]
            } : c
          )
        } : p
      )
    }))
    setStateReplyText("")
    setStateReplyingTo(null)
    setStateExpandedReplies(prev => ({ ...prev, [`${postId}-${commentId}`]: true }))
  }

  const submitStateComment = (stateCode, postId) => {
    const text = (stateCommentInputs[postId] || "").trim()
    if (!text) return
    setStatePosts(prev => ({
      ...prev,
      [stateCode]: prev[stateCode].map(p =>
        p.id === postId ? {
          ...p,
          comments: p.comments + 1,
          thread: [...p.thread, {
            id: Date.now(), author: "You", avatar: "U", avatarColor: "#ec4899",
            text, time: "Just now", likes: 0, liked: false, replies: [],
          }]
        } : p
      )
    }))
    setStateCommentInputs(prev => ({ ...prev, [postId]: "" }))
  }

  const filteredPosts = posts.filter(p => {
    const matchTag = activeTag === "All" || p.tag === activeTag
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ))
  }

  const toggleLikeState = (stateCode, postId) => {
    setStatePosts(prev => ({
      ...prev,
      [stateCode]: prev[stateCode].map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    }))
  }

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

        @keyframes modalPop {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes heartBeat {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.3); }
          60%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .post-card { animation: fadeUp 0.4s ease both; }
        .post-card:nth-child(1) { animation-delay: 0.05s }
        .post-card:nth-child(2) { animation-delay: 0.1s }
        .post-card:nth-child(3) { animation-delay: 0.15s }
        .post-card:nth-child(4) { animation-delay: 0.2s }
        .like-btn:active { animation: heartBeat 0.35s ease; }
        .tab-btn { transition: all 0.2s ease; }
        .tag-pill { transition: all 0.15s ease; }
        .search-input:focus { border-color: #ec4899 !important; box-shadow: 0 0 0 3px rgba(236,72,153,0.1); }
      `}</style>

      <div style={{ fontFamily: "'Nunito', sans-serif", background: "#fdf2f8", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem 3rem",
          textAlign: "center",
          background: "#1a0010",
        }}>
          {/* Background Video at 75% opacity */}
          <video
            src="/videos/community.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover", zIndex: 0,
              opacity: 0.75,
            }}
          />
          {/* Soft pink overlay for text readability */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(160deg, rgba(255,240,249,0.35) 0%, rgba(252,231,243,0.25) 50%, rgba(253,244,255,0.35) 100%)",
          }} />

          <div style={{ position:"relative", zIndex:2 }}>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.25)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 40,
              padding: "6px 20px",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              backdropFilter: "blur(8px)",
            }}>
              ✦ A safe space for every woman
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 1rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}>
              Her Community,<br />
              <em style={{ color: "#fce7f3" }}>Her Voice</em>
            </h1>

            <p style={{
              maxWidth: 520,
              margin: "0 auto 2rem",
              fontSize: 17,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              textShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}>
              Empower women. Share experiences. Be "Her" guide.
              Every story here makes the next woman a little safer.
            </p>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "14px 32px",
                borderRadius: 40,
                border: "none",
                background: "linear-gradient(135deg, #f472b6, #ec4899)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                fontFamily: "'Nunito', sans-serif",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(236,72,153,0.35)",
                letterSpacing: "0.02em",
              }}
            >
              + Share Your Story
            </button>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div style={{
          background: "#fff",
          borderTop: "1px solid #fce7f3",
          borderBottom: "1px solid #fce7f3",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(2rem, 6vw, 5rem)",
          padding: "1.2rem 1.5rem",
          flexWrap: "wrap",
        }}>
          {[["2,400+", "Women"], ["1,800+", "Stories Shared"], ["98%", "Feel Safer"], ["50+", "Cities"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#ec4899" }}>{num}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Section Tabs ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
          <div style={{
            display: "inline-flex",
            background: "#fff",
            border: "1px solid #fce7f3",
            borderRadius: 40,
            padding: 4,
            gap: 4,
          }}>
            {[["forum", "💬 Forum"], ["states", "🗺️ State Forums"], ["stories", "🌟 Stories"]].map(([key, label]) => (
              <button
                key={key}
                className="tab-btn"
                onClick={() => setActiveSection(key)}
                style={{
                  padding: "8px 22px",
                  borderRadius: 36,
                  border: "none",
                  background: activeSection === key
                    ? "linear-gradient(135deg, #f472b6, #ec4899)"
                    : "transparent",
                  color: activeSection === key ? "#fff" : "#9ca3af",
                  fontWeight: 700,
                  fontSize: 15,
                  fontFamily: "'Nunito', sans-serif",
                  cursor: "pointer",
                }}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>

          {activeSection === "forum" && (
            <>
              {/* Search + Filter Row */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "1.2rem", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "1 1 220px" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#d1d5db" }}>🔍</span>
                  <input
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search posts..."
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 40px",
                      borderRadius: 40,
                      border: "2px solid #fce7f3",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: 15,
                      background: "#fff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      color: "#1e1e1e",
                    }}
                  />
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 40,
                    border: "none",
                    background: "linear-gradient(135deg, #f472b6, #ec4899)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    fontFamily: "'Nunito', sans-serif",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(236,72,153,0.25)",
                  }}
                >+ New Post</button>
              </div>

              {/* Tag Pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {ALL_TAGS.map(t => (
                  <button
                    key={t}
                    className="tag-pill"
                    onClick={() => setActiveTag(t)}
                    style={{
                      padding: "5px 16px",
                      borderRadius: 20,
                      border: activeTag === t ? "2px solid #ec4899" : "2px solid #fce7f3",
                      background: activeTag === t ? "#fce7f3" : "#fff",
                      color: activeTag === t ? "#be185d" : "#9ca3af",
                      fontWeight: 700,
                      fontSize: 13,
                      fontFamily: "'Nunito', sans-serif",
                      cursor: "pointer",
                    }}
                  >{t}</button>
                ))}
              </div>

              {/* Post Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {filteredPosts.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
                    <p style={{ fontWeight: 600 }}>No posts found. Be the first to share!</p>
                  </div>
                ) : filteredPosts.map(post => (
                  <div
                    key={post.id}
                    className="post-card"
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: "1.4rem 1.6rem",
                      border: "1px solid #fce7f3",
                      boxShadow: "0 2px 12px rgba(236,72,153,0.06)",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(236,72,153,0.13)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(236,72,153,0.06)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <Avatar letter={post.avatar} color={post.avatarColor} size={42} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, color: "#1e1e1e", fontSize: 14 }}>{post.author}</span>
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>•</span>
                          <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.time}</span>
                          <span style={{
                            marginLeft: "auto",
                            padding: "2px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 700,
                            background: post.tagColor,
                            color: post.tagText,
                          }}>{post.tag}</span>
                        </div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#1e1e1e",
                          margin: "0 0 8px",
                          lineHeight: 1.3,
                        }}>{post.title}</h3>
                        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65, margin: "0 0 12px" }}>{post.body}</p>

                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                          <button
                            className="like-btn"
                            onClick={() => toggleLike(post.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: 5,
                              background: post.liked ? "#fce7f3" : "transparent",
                              border: post.liked ? "1.5px solid #fbcfe8" : "1.5px solid #f3f4f6",
                              borderRadius: 20, padding: "4px 12px",
                              cursor: "pointer", color: post.liked ? "#ec4899" : "#9ca3af",
                              fontWeight: 700, fontSize: 13,
                              fontFamily: "'Nunito', sans-serif",
                              transition: "all 0.2s",
                            }}
                          >
                            <span style={{ fontSize: 15 }}>{post.liked ? "♥" : "♡"}</span>
                            {post.likes}
                          </button>
                          <button
                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                            style={{
                              display: "flex", alignItems: "center", gap: 5,
                              background: expandedPost === post.id ? "#fce7f3" : "transparent",
                              border: expandedPost === post.id ? "1.5px solid #fbcfe8" : "1.5px solid #f3f4f6",
                              borderRadius: 20, padding: "4px 12px",
                              cursor: "pointer", color: expandedPost === post.id ? "#ec4899" : "#9ca3af",
                              fontWeight: 700, fontSize: 13,
                              fontFamily: "'Nunito', sans-serif",
                              transition: "all 0.2s",
                            }}
                          >
                            💬 {post.comments} replies {expandedPost === post.id ? "▲" : "▼"}
                          </button>
                        </div>

                        {/* ── Comment Thread ── */}
                        {expandedPost === post.id && (
                          <div style={{
                            marginTop: "1rem",
                            paddingTop: "1rem",
                            borderTop: "1px solid #fce7f3",
                          }}>
                            {/* Comments */}
                            {post.thread.map(comment => (
                              <div key={comment.id} style={{ marginBottom: "1rem" }}>

                                {/* Top-level comment */}
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Avatar letter={comment.avatar} color={comment.avatarColor} size={32} />
                                    {(comment.replies?.length > 0 || (replyingTo?.commentId === comment.id && replyingTo?.postId === post.id)) && (
                                      <div style={{ width: 2, flex: 1, minHeight: 20, background: "#f3f4f6", marginTop: 4, borderRadius: 2 }} />
                                    )}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 2 }}>
                                      <span style={{ fontWeight: 700, fontSize: 13, color: "#1e1e1e" }}>{comment.author}</span>
                                      {comment.isOP && (
                                        <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10, background: "#fce7f3", color: "#be185d", letterSpacing: "0.04em" }}>OP</span>
                                      )}
                                      <span style={{ fontSize: 11, color: "#c4c4c4" }}>{comment.time}</span>
                                    </div>
                                    <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.55, margin: "0 0 6px" }}>{comment.text}</p>
                                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                                      <button onClick={() => toggleLikeComment(post.id, comment.id)} style={{
                                        display: "flex", alignItems: "center", gap: 4, background: "none",
                                        border: "none", cursor: "pointer", padding: 0,
                                        color: comment.liked ? "#ec4899" : "#9ca3af", fontSize: 12,
                                        fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                                      }}>
                                        <span style={{ fontSize: 14 }}>{comment.liked ? "♥" : "♡"}</span> {comment.likes}
                                      </button>
                                      <button onClick={() => {
                                        setReplyingTo(replyingTo?.commentId === comment.id && replyingTo?.postId === post.id ? null : { postId: post.id, commentId: comment.id, author: comment.author })
                                        setReplyText("")
                                      }} style={{
                                        background: "none", border: "none", cursor: "pointer", padding: 0,
                                        color: "#9ca3af", fontSize: 12, fontWeight: 700,
                                        fontFamily: "'Nunito', sans-serif",
                                      }}>Reply</button>
                                      {comment.replies?.length > 0 && (
                                        <button onClick={() => toggleExpandReplies(post.id, comment.id)} style={{
                                          background: "none", border: "none", cursor: "pointer", padding: 0,
                                          color: "#ec4899", fontSize: 12, fontWeight: 700,
                                          fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", gap: 4,
                                        }}>
                                          <span style={{ width: 16, height: 1.5, background: "#fbcfe8", display: "inline-block", borderRadius: 2 }} />
                                          {expandedReplies[`${post.id}-${comment.id}`]
                                            ? `Hide replies`
                                            : `View ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`}
                                        </button>
                                      )}
                                    </div>

                                    {/* Reply input for this comment */}
                                    {replyingTo?.postId === post.id && replyingTo?.commentId === comment.id && (
                                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#f472b6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>U</div>
                                        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#f9fafb", border: "1.5px solid #fbcfe8", borderRadius: 20, padding: "6px 12px", gap: 8 }}>
                                          <span style={{ fontSize: 12, color: "#ec4899", fontWeight: 700, whiteSpace: "nowrap" }}>@{replyingTo.author}</span>
                                          <input
                                            autoFocus
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" && submitReply(post.id, comment.id)}
                                            placeholder="Write a reply..."
                                            style={{ flex: 1, border: "none", background: "transparent", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#1e1e1e", outline: "none" }}
                                          />
                                          <button onClick={() => submitReply(post.id, comment.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ec4899", fontSize: 15, padding: 0 }}>➤</button>
                                        </div>
                                      </div>
                                    )}

                                    {/* Nested replies */}
                                    {expandedReplies[`${post.id}-${comment.id}`] && comment.replies?.map((reply, ri) => (
                                      <div key={reply.id} style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "flex-start" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                          <Avatar letter={reply.avatar} color={reply.avatarColor} size={26} />
                                          {ri < comment.replies.length - 1 && (
                                            <div style={{ width: 2, flex: 1, minHeight: 12, background: "#f3f4f6", marginTop: 3, borderRadius: 2 }} />
                                          )}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                                            <span style={{ fontWeight: 700, fontSize: 12.5, color: "#1e1e1e" }}>{reply.author}</span>
                                            {reply.isOP && (
                                              <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 8, background: "#fce7f3", color: "#be185d" }}>OP</span>
                                            )}
                                            <span style={{ fontSize: 11, color: "#c4c4c4" }}>{reply.time}</span>
                                          </div>
                                          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, margin: "0 0 5px" }}>
                                            <span style={{ color: "#ec4899", fontWeight: 700 }}>@{reply.replyTo} </span>
                                            {reply.text}
                                          </p>
                                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                            <button onClick={() => toggleLikeReply(post.id, comment.id, reply.id)} style={{
                                              display: "flex", alignItems: "center", gap: 3, background: "none",
                                              border: "none", cursor: "pointer", padding: 0,
                                              color: reply.liked ? "#ec4899" : "#9ca3af", fontSize: 11,
                                              fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                                            }}>
                                              <span style={{ fontSize: 13 }}>{reply.liked ? "♥" : "♡"}</span> {reply.likes}
                                            </button>
                                            <button onClick={() => {
                                              setReplyingTo({ postId: post.id, commentId: comment.id, author: reply.author })
                                              setReplyText("")
                                            }} style={{
                                              background: "none", border: "none", cursor: "pointer", padding: 0,
                                              color: "#9ca3af", fontSize: 11, fontWeight: 700,
                                              fontFamily: "'Nunito', sans-serif",
                                            }}>Reply</button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Add comment input */}
                            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4, paddingTop: "0.75rem", borderTop: "1px dashed #fce7f3" }}>
                              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f472b6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>U</div>
                              <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 20, padding: "8px 14px", gap: 8 }}>
                                <input
                                  value={commentInputs[post.id] || ""}
                                  onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  onKeyDown={e => e.key === "Enter" && submitComment(post.id)}
                                  placeholder="Add a comment..."
                                  style={{ flex: 1, border: "none", background: "transparent", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#1e1e1e", outline: "none" }}
                                />
                                <button onClick={() => submitComment(post.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ec4899", fontSize: 15, padding: 0 }}>➤</button>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "states" && (
            <>
              {!selectedState ? (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#1e1e1e", margin: "0 0 6px" }}>
                      State-wise Forums 🗺️
                    </h2>
                    <p style={{ color: "#9ca3af", fontSize: 15, margin: 0 }}>
                      Connect with women in your state — local tips, safety info, and support.
                    </p>
                  </div>

                  {/* India map decorative banner */}
                  <div style={{
                    background: "linear-gradient(135deg, #fff0f9 0%, #f3e8ff 100%)",
                    borderRadius: 20,
                    padding: "1.4rem 1.8rem",
                    marginBottom: "1.5rem",
                    border: "1px solid #fbcfe8",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}>
                    <div style={{ fontSize: 36 }}>🇮🇳</div>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#1e1e1e" }}>
                        India-wide community
                      </div>
                      <div style={{ color: "#9ca3af", fontSize: 14 }}>
                        {INDIAN_STATES.length} states · {INDIAN_STATES.reduce((a,s)=>a+s.members,0).toLocaleString()} women · {INDIAN_STATES.reduce((a,s)=>a+s.posts,0).toLocaleString()} posts
                      </div>
                    </div>
                  </div>

                  {/* State grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}>
                    {INDIAN_STATES.map((state, i) => (
                      <div
                        key={state.code}
                        className="post-card"
                        onClick={() => setSelectedState(state)}
                        style={{
                          background: "#fff",
                          borderRadius: 20,
                          padding: "1.3rem",
                          border: `1.5px solid ${state.light}`,
                          cursor: "pointer",
                          animationDelay: `${i * 0.05}s`,
                          transition: "box-shadow 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = `0 8px 24px ${state.color}30`
                          e.currentTarget.style.transform = "translateY(-3px)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = "none"
                          e.currentTarget.style.transform = "translateY(0)"
                        }}
                      >
                        <div style={{
                          width: 48, height: 48, borderRadius: 14,
                          background: state.light,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 24, marginBottom: 10,
                        }}>{state.emoji}</div>
                        <div style={{ fontWeight: 800, color: "#1e1e1e", fontSize: 15, marginBottom: 4, fontFamily: "'Nunito', sans-serif" }}>
                          {state.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
                          {state.members.toLocaleString()} members
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <span style={{
                            padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                            background: state.light, color: state.color,
                          }}>{state.posts} posts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* ── State Detail View ── */
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setSelectedState(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "7px 16px", borderRadius: 20,
                        border: "2px solid #fce7f3", background: "#fff",
                        color: "#be185d", fontWeight: 700, fontSize: 13,
                        fontFamily: "'Nunito', sans-serif", cursor: "pointer",
                      }}
                    >← All States</button>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: selectedState.light,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22,
                      }}>{selectedState.emoji}</div>
                      <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#1e1e1e", margin: 0 }}>
                          {selectedState.name} Forum
                        </h2>
                        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>
                          {selectedState.members.toLocaleString()} women · {selectedState.posts} posts
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      style={{
                        marginLeft: "auto",
                        padding: "8px 20px", borderRadius: 40, border: "none",
                        background: `linear-gradient(135deg, ${selectedState.color}, ${selectedState.color}cc)`,
                        color: "#fff", fontWeight: 700, fontSize: 13,
                        fontFamily: "'Nunito', sans-serif", cursor: "pointer",
                        boxShadow: `0 4px 12px ${selectedState.color}40`,
                      }}
                    >+ Post Here</button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {(statePosts[selectedState.code] || []).length === 0 ? (
                      <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>{selectedState.emoji}</div>
                        <p style={{ fontWeight: 600 }}>Be the first to post in {selectedState.name}!</p>
                      </div>
                    ) : (statePosts[selectedState.code] || []).map(post => (
                      <div
                        key={post.id}
                        className="post-card"
                        style={{
                          background: "#fff",
                          borderRadius: 20,
                          padding: "1.4rem 1.6rem",
                          border: `1px solid ${selectedState.light}`,
                          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                          transition: "box-shadow 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = `0 8px 24px ${selectedState.color}20`
                          e.currentTarget.style.transform = "translateY(-2px)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"
                          e.currentTarget.style.transform = "translateY(0)"
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <Avatar letter={post.avatar} color={post.avatarColor} size={42} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                              <span style={{ fontWeight: 700, color: "#1e1e1e", fontSize: 14 }}>{post.author}</span>
                              <span style={{ fontSize: 12, color: "#d1d5db" }}>•</span>
                              <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.time}</span>
                              <span style={{
                                marginLeft: "auto", padding: "2px 12px", borderRadius: 20,
                                fontSize: 12, fontWeight: 700,
                                background: post.tagColor, color: post.tagText,
                              }}>{post.tag}</span>
                            </div>
                            <h3 style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 17, fontWeight: 700, color: "#1e1e1e",
                              margin: "0 0 8px", lineHeight: 1.3,
                            }}>{post.title}</h3>
                            <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65, margin: "0 0 12px" }}>{post.body}</p>

                            {/* Actions row */}
                            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                              <button
                                className="like-btn"
                                onClick={() => toggleLikeState(selectedState.code, post.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 5,
                                  background: post.liked ? selectedState.light : "transparent",
                                  border: post.liked ? `1.5px solid ${selectedState.color}60` : "1.5px solid #f3f4f6",
                                  borderRadius: 20, padding: "4px 12px",
                                  cursor: "pointer", color: post.liked ? selectedState.color : "#9ca3af",
                                  fontWeight: 700, fontSize: 13,
                                  fontFamily: "'Nunito', sans-serif", transition: "all 0.2s",
                                }}
                              >
                                <span style={{ fontSize: 15 }}>{post.liked ? "♥" : "♡"}</span>
                                {post.likes}
                              </button>
                              <button
                                onClick={() => setExpandedStatePost(expandedStatePost === post.id ? null : post.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 5,
                                  background: expandedStatePost === post.id ? selectedState.light : "transparent",
                                  border: expandedStatePost === post.id ? `1.5px solid ${selectedState.color}60` : "1.5px solid #f3f4f6",
                                  borderRadius: 20, padding: "4px 12px",
                                  cursor: "pointer", color: expandedStatePost === post.id ? selectedState.color : "#9ca3af",
                                  fontWeight: 700, fontSize: 13,
                                  fontFamily: "'Nunito', sans-serif", transition: "all 0.2s",
                                }}
                              >
                                💬 {post.comments} replies {expandedStatePost === post.id ? "▲" : "▼"}
                              </button>
                            </div>

                            {/* ── Instagram-style Thread ── */}
                            {expandedStatePost === post.id && (
                              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${selectedState.light}` }}>
                                {post.thread.map(comment => (
                                  <div key={comment.id} style={{ marginBottom: "1rem" }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <Avatar letter={comment.avatar} color={comment.avatarColor} size={32} />
                                        {(comment.replies?.length > 0 || (stateReplyingTo?.commentId === comment.id && stateReplyingTo?.postId === post.id)) && (
                                          <div style={{ width: 2, flex: 1, minHeight: 20, background: "#f3f4f6", marginTop: 4, borderRadius: 2 }} />
                                        )}
                                      </div>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 2 }}>
                                          <span style={{ fontWeight: 700, fontSize: 13, color: "#1e1e1e" }}>{comment.author}</span>
                                          {comment.isOP && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10, background: selectedState.light, color: selectedState.color }}>OP</span>}
                                          <span style={{ fontSize: 11, color: "#c4c4c4" }}>{comment.time}</span>
                                        </div>
                                        <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.55, margin: "0 0 6px" }}>{comment.text}</p>
                                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                                          <button onClick={() => toggleLikeStateComment(selectedState.code, post.id, comment.id)} style={{
                                            display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
                                            cursor: "pointer", padding: 0, color: comment.liked ? selectedState.color : "#9ca3af",
                                            fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                                          }}>
                                            <span style={{ fontSize: 14 }}>{comment.liked ? "♥" : "♡"}</span> {comment.likes}
                                          </button>
                                          <button onClick={() => {
                                            setStateReplyingTo(stateReplyingTo?.commentId === comment.id && stateReplyingTo?.postId === post.id
                                              ? null : { postId: post.id, commentId: comment.id, author: comment.author })
                                            setStateReplyText("")
                                          }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af", fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                                            Reply
                                          </button>
                                          {comment.replies?.length > 0 && (
                                            <button onClick={() => toggleStateExpandReplies(post.id, comment.id)} style={{
                                              background: "none", border: "none", cursor: "pointer", padding: 0,
                                              color: selectedState.color, fontSize: 12, fontWeight: 700,
                                              fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", gap: 4,
                                            }}>
                                              <span style={{ width: 16, height: 1.5, background: selectedState.light, display: "inline-block", borderRadius: 2 }} />
                                              {stateExpandedReplies[`${post.id}-${comment.id}`] ? "Hide replies" : `View ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`}
                                            </button>
                                          )}
                                        </div>

                                        {/* Inline reply input */}
                                        {stateReplyingTo?.postId === post.id && stateReplyingTo?.commentId === comment.id && (
                                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
                                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#f472b6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>U</div>
                                            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#f9fafb", border: `1.5px solid ${selectedState.light}`, borderRadius: 20, padding: "6px 12px", gap: 8 }}>
                                              <span style={{ fontSize: 12, color: selectedState.color, fontWeight: 700, whiteSpace: "nowrap" }}>@{stateReplyingTo.author}</span>
                                              <input
                                                autoFocus
                                                value={stateReplyText}
                                                onChange={e => setStateReplyText(e.target.value)}
                                                onKeyDown={e => e.key === "Enter" && submitStateReply(selectedState.code, post.id, comment.id)}
                                                placeholder="Write a reply..."
                                                style={{ flex: 1, border: "none", background: "transparent", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#1e1e1e", outline: "none" }}
                                              />
                                              <button onClick={() => submitStateReply(selectedState.code, post.id, comment.id)} style={{ background: "none", border: "none", cursor: "pointer", color: selectedState.color, fontSize: 15, padding: 0 }}>➤</button>
                                            </div>
                                          </div>
                                        )}

                                        {/* Nested replies */}
                                        {stateExpandedReplies[`${post.id}-${comment.id}`] && comment.replies?.map((reply, ri) => (
                                          <div key={reply.id} style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "flex-start" }}>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                              <Avatar letter={reply.avatar} color={reply.avatarColor} size={26} />
                                              {ri < comment.replies.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 12, background: "#f3f4f6", marginTop: 3, borderRadius: 2 }} />}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                                                <span style={{ fontWeight: 700, fontSize: 12.5, color: "#1e1e1e" }}>{reply.author}</span>
                                                {reply.isOP && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 8, background: selectedState.light, color: selectedState.color }}>OP</span>}
                                                <span style={{ fontSize: 11, color: "#c4c4c4" }}>{reply.time}</span>
                                              </div>
                                              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, margin: "0 0 5px" }}>
                                                <span style={{ color: selectedState.color, fontWeight: 700 }}>@{reply.replyTo} </span>{reply.text}
                                              </p>
                                              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                <button onClick={() => toggleLikeStateReply(selectedState.code, post.id, comment.id, reply.id)} style={{
                                                  display: "flex", alignItems: "center", gap: 3, background: "none", border: "none",
                                                  cursor: "pointer", padding: 0, color: reply.liked ? selectedState.color : "#9ca3af",
                                                  fontSize: 11, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                                                }}>
                                                  <span style={{ fontSize: 13 }}>{reply.liked ? "♥" : "♡"}</span> {reply.likes}
                                                </button>
                                                <button onClick={() => { setStateReplyingTo({ postId: post.id, commentId: comment.id, author: reply.author }); setStateReplyText("") }} style={{
                                                  background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af", fontSize: 11, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                                                }}>Reply</button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {/* Add comment input */}
                                <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4, paddingTop: "0.75rem", borderTop: `1px dashed ${selectedState.light}` }}>
                                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f472b6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>U</div>
                                  <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#f9fafb", border: `1.5px solid ${selectedState.light}`, borderRadius: 20, padding: "8px 14px", gap: 8 }}>
                                    <input
                                      value={stateCommentInputs[post.id] || ""}
                                      onChange={e => setStateCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                      onKeyDown={e => e.key === "Enter" && submitStateComment(selectedState.code, post.id)}
                                      placeholder="Add a comment..."
                                      style={{ flex: 1, border: "none", background: "transparent", fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#1e1e1e", outline: "none" }}
                                    />
                                    <button onClick={() => submitStateComment(selectedState.code, post.id)} style={{ background: "none", border: "none", cursor: "pointer", color: selectedState.color, fontSize: 15, padding: 0 }}>➤</button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {activeSection === "stories" && (
            <>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#1e1e1e", margin: "0 0 6px" }}>
                  Real stories, real strength 🌟
                </h2>
                <p style={{ color: "#9ca3af", fontSize: 15, margin: 0 }}>
                  Voices from women who found their way with HerWay.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem" }}>
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.id}
                    className="post-card"
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      padding: "1.6rem",
                      border: "1px solid #fce7f3",
                      boxShadow: "0 2px 12px rgba(236,72,153,0.06)",
                      animationDelay: `${i * 0.1}s`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: -20, right: -20,
                      width: 80, height: 80, borderRadius: "50%",
                      background: "rgba(252,231,243,0.6)",
                    }} />
                    <div style={{ fontSize: 32, color: "#fce7f3", fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 12 }}>"</div>
                    <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.7, margin: "0 0 1.2rem", position: "relative" }}>
                      {t.quote}
                    </p>
                    <StarRating count={t.stars} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                      <Avatar letter={t.avatar} color={t.avatarColor} size={36} />
                      <div>
                        <div style={{ fontWeight: 700, color: "#1e1e1e", fontSize: 14 }}>{t.author}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>📍 {t.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA to share */}
              <div style={{
                marginTop: "2rem",
                background: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)",
                borderRadius: 24,
                padding: "2rem",
                textAlign: "center",
                border: "1px solid #fbcfe8",
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>💌</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#1e1e1e", margin: "0 0 8px" }}>
                  Your story could inspire someone
                </h3>
                <p style={{ color: "#6b7280", fontSize: 15, margin: "0 0 1.2rem" }}>
                  Share what HerWay means to you — every voice counts.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 40,
                    border: "none",
                    background: "linear-gradient(135deg, #f472b6, #ec4899)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    fontFamily: "'Nunito', sans-serif",
                    cursor: "pointer",
                    boxShadow: "0 6px 18px rgba(236,72,153,0.3)",
                  }}
                >Share My Story ✦</button>
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default Community
