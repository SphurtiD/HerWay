import React, { useState } from 'react';

// Sample call scenarios (replace with real data later)
const fakeCallScenarios = [
  { id: 'mom-hi', label: 'Call from Mom (Hindi)', script: "[00:02] Beta, kahan ho? Sab theek hai?\n[00:05] Acha suno, woh uncle pooch rahe the...\n[00:10] Jaldi ghar aa jao, theek hai?\n[00:15] Okay bye." },
  { id: 'friend-en', label: 'Call from Friend (English)', script: "[00:03] Hey! Where are you?\n[00:06] Did you see that message I sent?\n[00:10] Need to talk ASAP, call me back!\n[00:15] Okay, later!" },
  { id: 'work-en', label: 'Urgent Work Call (English)', script: "[00:02] Hi, sorry to bother you.\n[00:05] We have an urgent issue with the server.\n[00:09] Can you hop online quickly?\n[00:13] Thanks, waiting for you.\n[00:16] Bye." },
];

function FakeCallPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(fakeCallScenarios[0].id);
  const [selectedTimer, setSelectedTimer] = useState(0); // 0 = Now, 10 = 10s, etc.
  const [isPlaying, setIsPlaying] = useState(false); // Basic state for call active

  const handleStartCall = () => {
    setIsPlaying(true);
    console.log(`Starting fake call: ${selectedScenarioId}, Timer: ${selectedTimer}s (Placeholder)`);
    // Placeholder: Add timeout logic for the timer
    // Placeholder: Add audio playback logic
    // Placeholder: Show the "call screen" UI
    alert(`Fake call '${getSelectedScenario().label}' started! (Placeholder)`);
    // Should navigate to/show a call screen simulation here
  };

  // Simulate stopping the call (e.g., user hangs up)
  const handleStopCall = () => {
    setIsPlaying(false);
    console.log('Fake call stopped (Placeholder)');
  }

  const getSelectedScenario = () => {
    return fakeCallScenarios.find(s => s.id === selectedScenarioId) || fakeCallScenarios[0];
  };

  // Basic parsing for script preview (remove timestamps for display)
  const formatScriptPreview = (script) => {
    return script.split('\n').map(line => line.replace(/\[\d{2}:\d{2}\]\s*/, '')).join('\n');
  };

  // If a call is "active", show a basic call screen simulation
  if (isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <p className="text-xl mb-2">Incoming Call...</p>
        <p className="text-3xl font-bold mb-8">{getSelectedScenario().label.split('(')[0]}</p>
        {/* Placeholder icons for accept/reject */}
        <div className="flex justify-around w-full max-w-xs mt-auto">
           <button onClick={handleStopCall} className="bg-red-600 p-4 rounded-full"> {/* Hang up */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" transform="rotate(-135 12 12)" /></svg>
           </button>
        </div>
         <p className="mt-4 text-gray-400 text-sm">Tap hangup to end simulation</p>
      </div>
    );
  }

  // Otherwise, show the selection screen
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 pt-12">
      <h2 className="text-2xl font-semibold mb-6">Initiate Fake Call</h2>

      {/* Scenario Selection */}
      <div className="w-full max-w-md mb-6">
        <h3 className="text-lg font-medium mb-2">Select Scenario:</h3>
        <div className="space-y-2">
          {fakeCallScenarios.map(scenario => (
            <label key={scenario.id} className="flex items-center bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="scenario"
                value={scenario.id}
                checked={selectedScenarioId === scenario.id}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="mr-3"
              />
              <span>{scenario.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Timer Selection */}
      <div className="w-full max-w-md mb-6">
        <h3 className="text-lg font-medium mb-2">Call Timer:</h3>
        <div className="flex gap-2">
          {[0, 10, 30, 60].map(seconds => (
            <label key={seconds} className={`flex-1 text-center p-2 rounded-lg shadow cursor-pointer transition-colors ${selectedTimer === seconds ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="timer"
                value={seconds}
                checked={selectedTimer === seconds}
                onChange={(e) => setSelectedTimer(parseInt(e.target.value))}
                className="sr-only" // Hide the actual radio button
              />
              <span>{seconds === 0 ? 'Now' : `${seconds}s`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Script Preview */}
      <div className="w-full max-w-md mb-6">
        <h3 className="text-lg font-medium mb-2">Script Preview:</h3>
        <div className="bg-white p-3 rounded-lg shadow max-h-40 overflow-y-auto border border-gray-200">
          <pre className="text-sm whitespace-pre-wrap text-gray-700">
            {formatScriptPreview(getSelectedScenario().script)}
          </pre>
        </div>
        <p className="text-xs text-gray-500 mt-1">Timestamps are approximate.</p>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStartCall}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
      >
        {selectedTimer === 0 ? 'Start Call Now' : `Start Call in ${selectedTimer}s`}
      </button>
    </div>
  );
}

export default FakeCallPage;
