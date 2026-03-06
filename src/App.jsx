import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import ClickSpark from "./components/ClickSpark";
import Community from "./pages/Community";
import FAQs from "./pages/FAQs";
import MapPage from "./pages/MapPage";
import StartRecording from "./pages/StartRecording";
import FakeCallPage from "./pages/FakeCalls";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ClickSpark
      sparkColor="#d946ef"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      {/* Full Height Layout */}
      <div className="flex flex-col min-h-screen">

        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/startrecording" element={<StartRecording />} />
            <Route path="/fakecalls" element={<FakeCallPage />} />
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <Footer />

      </div>
    </ClickSpark>
  );
};

export default App;