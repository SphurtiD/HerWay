import React, { useState, useRef, useEffect } from 'react';

// --- SOS Confirmation Modal Component ---
function SosConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full text-center">
        <h3 className="text-xl font-bold text-red-600 mb-4">Confirm SOS Call</h3>
        <p className="text-gray-700 mb-6">
          This will attempt to call the standard emergency number (e.g., 112). Are you sure?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}


// --- Recording Page Component ---

function RecordingPage() {
  // State: 'idle', 'recording', 'paused'
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [showSaveOption, setShowSaveOption] = useState(false);
  
  // --- NEW State for Recording Logic ---
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const mediaRecorderRef = useRef(null); // To hold the MediaRecorder instance
  const audioChunksRef = useRef([]); // To store recorded audio data
  const audioStreamRef = useRef(null); // To hold the audio stream for stopping later

  // --- NEW State for SOS ---
  const [showSosConfirm, setShowSosConfirm] = useState(false);
  const sosHoldTimeoutRef = useRef(null); // Use ref for timeout ID

  // --- Handlers ---

  const requestMicrophonePermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Microphone access is not supported by your browser.');
      setPermissionStatus('denied');
      return null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionStatus('granted');
      audioStreamRef.current = stream; // Store the stream
      return stream;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setPermissionStatus('denied');
      alert('Microphone permission denied. Please enable it in your browser settings.');
      return null;
    }
  };

  const startRecording = async () => {
    let stream = audioStreamRef.current;
    if (permissionStatus !== 'granted') {
      stream = await requestMicrophonePermission();
      if (!stream) return; // Permission denied or failed
    }
    
    // Ensure stream is active
     if (!stream || !stream.active) {
        stream = await requestMicrophonePermission();
        if (!stream) return;
     }


    setRecordingStatus('recording');
    setShowSaveOption(false);
    audioChunksRef.current = []; // Clear previous chunks

    try {
      // --- Use MediaRecorder API ---
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        // Now handled by explicit handleStop logic
         console.log('Recorder stopped via onstop event.');
          // Ensure tracks are stopped only when fully done, not on pause
          if (recordingStatus === 'idle' && audioStreamRef.current) {
               audioStreamRef.current.getTracks().forEach(track => track.stop());
               audioStreamRef.current = null; // Clear the stream ref
               console.log("Audio stream tracks stopped.");
          }
      };
      
       recorder.onerror = (event) => {
         console.error("MediaRecorder error:", event.error);
         alert("An error occurred during recording.");
         handleStop(true); // Force stop on error
       };


      recorder.start();
      console.log('Recording Started');
      // --- End MediaRecorder ---

    } catch (error) {
       console.error("Failed to start MediaRecorder:", error);
       alert("Failed to start recording. Ensure microphone is connected and permissions are granted.");
       setRecordingStatus('idle'); // Reset state on failure
    }
  };

  const handleStart = async () => {
    if (permissionStatus === 'denied') {
      alert('Microphone permission denied. Please enable it in your browser settings.');
      return;
    }
    await startRecording();
  };


  const handlePause = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingStatus('paused');
      console.log('Recording Paused');
    }
  };

  const handleResume = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingStatus('recording');
      console.log('Recording Resumed');
    }
  };

 const handleStop = (isError = false) => {
    if (mediaRecorderRef.current && (mediaRecorderRef.current.state === 'recording' || mediaRecorderRef.current.state === 'paused')) {
      // Use a local variable to manage state update timing
      const recorder = mediaRecorderRef.current;
      
       // Add event listener for the 'stop' event *before* calling stop()
       // This ensures we capture the final chunks correctly
        recorder.addEventListener('stop', () => {
          console.log('MediaRecorder explicitly stopped.');
          // Stop the tracks *after* the recorder has fully stopped and processed data
          if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
             console.log("Audio stream tracks stopped after recorder stop.");
          }
          mediaRecorderRef.current = null; // Clear recorder ref
          setRecordingStatus('idle'); // Update status *after* stop processing
          if (!isError) { // Only show save if not stopped due to error
             setShowSaveOption(true);
          }
        }, { once: true }); // Use { once: true } to auto-remove the listener

      recorder.stop(); // Trigger the 'stop' event
      console.log('Recording Stop requested...');

    } else {
       // If no recorder or already stopped, just reset UI
       setRecordingStatus('idle');
       setShowSaveOption(!isError && audioChunksRef.current.length > 0);
        if (audioStreamRef.current) {
           audioStreamRef.current.getTracks().forEach(track => track.stop());
           audioStreamRef.current = null;
        }
    }
 };


  const handleSave = () => {
    if (audioChunksRef.current.length === 0) {
      alert('No audio recorded to save.');
      setShowSaveOption(false);
      return;
    }

    // --- Create Blob and Download Link ---
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // Common format
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.href = audioUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `safety-recording-${timestamp}.webm`; // Filename
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl); // Clean up
    console.log('Saving Recording Locally');
    // --- End Save Logic ---

    audioChunksRef.current = []; // Clear chunks after saving
    setShowSaveOption(false);
  };
  
   const handleDiscard = () => {
      audioChunksRef.current = []; // Clear chunks
      setShowSaveOption(false);
      console.log("Recording discarded.");
   };

  // --- SOS Logic ---
  const sosButtonDown = () => {
     sosHoldTimeoutRef.current = setTimeout(() => {
        // Show confirmation modal instead of calling directly
        setShowSosConfirm(true);
     }, 1500); // 1.5 second hold
  };
  const sosButtonUp = () => {
     clearTimeout(sosHoldTimeoutRef.current);
  };

  const confirmSosCall = () => {
    console.log('SOS Confirmed! Initiating call...');
    // --- Initiate Call ---
    // Use tel: protocol - Browser will likely ask for user confirmation again
    window.location.href = 'tel:112'; // Or appropriate emergency number
    // --- ---
    setShowSosConfirm(false);
  };

  const cancelSosCall = () => {
    setShowSosConfirm(false);
  };

  // Cleanup stream on component unmount if still active
  useEffect(() => {
     return () => {
        clearTimeout(sosHoldTimeoutRef.current);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
           audioStreamRef.current.getTracks().forEach(track => track.stop());
           console.log("Audio stream stopped on component unmount.");
        }
     }
  }, []);


  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-6 pt-12 pb-20">
      
       {/* --- NEW: SOS Confirmation Modal --- */}
       {showSosConfirm && (
         <SosConfirmationModal onConfirm={confirmSosCall} onCancel={cancelSosCall} />
       )}

      {/* Status Area */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Safety Recording</h2>
        {permissionStatus === 'denied' && (
             <p className="text-red-600 font-medium">Microphone permission denied.</p>
        )}
        {permissionStatus === 'prompt' && recordingStatus === 'idle' && !showSaveOption && (
             <p className="text-gray-600">Press Start to request microphone access.</p>
        )}
        {permissionStatus === 'granted' && recordingStatus === 'idle' && !showSaveOption && (
          <p className="text-gray-600">Ready to record. Press the button below.</p>
        )}
        {recordingStatus === 'recording' && (
          <p className="text-green-600 font-medium animate-pulse">Recording Active...</p>
        )}
        {recordingStatus === 'paused' && (
          <p className="text-yellow-600 font-medium">Recording Paused</p>
        )}
        {showSaveOption && (
           <p className="text-blue-600 font-medium">Recording stopped. Save locally?</p>
        )}
      </div>

      {/* Main Content Area (Button or Waves) */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xs">
        {/* Show Start button only when idle and not showing save */}
        {recordingStatus === 'idle' && !showSaveOption && (
          <button
            onClick={handleStart}
            disabled={permissionStatus === 'denied'} // Disable if permission denied
            className={`text-white rounded-full w-40 h-40 flex flex-col items-center justify-center text-xl font-bold shadow-lg transition-colors ${
              permissionStatus === 'denied' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600'
            }`}
            aria-label="Start recording"
          >
             {/* Mic Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
            Start
          </button>
        )}

        {/* Show Waves placeholder when recording or paused */}
        {(recordingStatus === 'recording' || recordingStatus === 'paused') && (
          <div className="text-center w-full">
            {/* TODO: Add real Audio Waves Visualization here */}
            <div className="bg-blue-200 h-20 w-full rounded-lg flex items-center justify-center mb-4 animate-pulse">
              <span className="text-blue-700">Audio Waves Placeholder</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Your audio is being recorded. Feel free to pause or stop anytime.
            </p>
          </div>
        )}
         
         {/* Show Save/Discard options */}
         {showSaveOption && (
           <div className="text-center">
             <p className="text-gray-600 mb-4">Would you like to save the recording?</p>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
              >
                Save Locally
              </button>
               <button
                onClick={handleDiscard} // Use discard handler
                className="ml-4 text-gray-500 hover:text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Discard
              </button>
           </div>
         )}
      </div>

      {/* Control Buttons Area */}
      <div className="w-full max-w-md flex justify-around items-center h-20">
        {recordingStatus === 'recording' && (
          <>
            <button onClick={handlePause} /* ... Pause button ... */ > {/* Pause Icon */} <svg className="h-6 w-6" /*...*/ > <path d="M10 9v6m4-6v6"/> </svg> </button>
            <button onClick={() => handleStop()} /* ... Stop button ... */ > {/* Stop Icon */} <svg className="h-6 w-6" /*...*/ > <path d="M6 6h12v12H6z"/> </svg> </button>
             <button onMouseDown={sosButtonDown} onMouseUp={sosButtonUp} onTouchStart={sosButtonDown} onTouchEnd={sosButtonUp} /* ... SOS button ... */ > <span className="text-lg font-extrabold">SOS</span> </button>
          </>
        )}
        {recordingStatus === 'paused' && (
          <>
            <button onClick={handleResume} /* ... Resume button ... */ > {/* Play Icon */} <svg className="h-6 w-6" /*...*/ > <path d="M8 5v14l11-7z"/> </svg> </button>
             <button onClick={() => handleStop()} /* ... Stop button ... */ > {/* Stop Icon */} <svg className="h-6 w-6" /*...*/ > <path d="M6 6h12v12H6z"/> </svg> </button>
            <button onMouseDown={sosButtonDown} onMouseUp={sosButtonUp} onTouchStart={sosButtonDown} onTouchEnd={sosButtonUp} /* ... SOS button ... */ > <span className="text-lg font-extrabold">SOS</span> </button>
          </>
        )}
         {recordingStatus === 'idle' && !showSaveOption && (
            <button onMouseDown={sosButtonDown} onMouseUp={sosButtonUp} onTouchStart={sosButtonDown} onTouchEnd={sosButtonUp} /* ... Idle SOS button ... */ > Hold for SOS </button>
         )}
          {/* Keep consistent styling - omitted for brevity */}
      </div>
    </div>
  );
}

// Default export
export default RecordingPage;

// --- Helper Functions and Full Button Styling (Add back if needed) ---
// Remember to include the full styling for buttons as in the previous example if you copy-paste parts
// For example: className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 rounded-full shadow transition-colors" etc.

