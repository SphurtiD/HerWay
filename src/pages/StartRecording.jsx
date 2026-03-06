import React, { useState, useRef, useEffect } from "react";

// --- SOS Modal ---
function SosConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full text-center">
        <h3 className="text-xl font-bold text-red-600 mb-4">Confirm SOS Call</h3>
        <p className="text-gray-700 mb-6">
          This will attempt to call the emergency number (112). Are you sure?
        </p>
        <div className="flex justify-around">
          <button onClick={onCancel} className="bg-gray-300 px-6 py-2 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-6 py-2 rounded">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}

function RecordingPage() {
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [showSaveOption, setShowSaveOption] = useState(false);
  const [showSosConfirm, setShowSosConfirm] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const sosHoldTimeoutRef = useRef(null);

  // ---------------- RECORDING ----------------

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStreamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      stopVisualizer();
      stream.getTracks().forEach((t) => t.stop());
      setRecordingStatus("idle");
      setShowSaveOption(true);
    };

    recorder.start();
    setRecordingStatus("recording"); // IMPORTANT: Only set state here
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleSave = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `safety-recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSaveOption(false);
  };

  const handleDiscard = () => {
    setShowSaveOption(false);
  };

  // ---------------- VISUALIZER ----------------

  useEffect(() => {
    if (recordingStatus !== "recording") return;
    if (!canvasRef.current) return;

    const startVisualizer = async () => {
      const stream = audioStreamRef.current;

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 128;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          ctx.fillStyle = "#2563eb";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 2;
        }
      };

      draw();
    };

    startVisualizer();

    return () => stopVisualizer();
  }, [recordingStatus]);

  const stopVisualizer = () => {
    cancelAnimationFrame(animationRef.current);
    audioContextRef.current?.close();
  };

  // ---------------- SOS ----------------

  const sosButtonDown = () => {
    sosHoldTimeoutRef.current = setTimeout(() => {
      setShowSosConfirm(true);
    }, 1500);
  };

  const sosButtonUp = () => clearTimeout(sosHoldTimeoutRef.current);

  const confirmSosCall = () => {
    window.location.href = "tel:112";
    setShowSosConfirm(false);
  };

  // ---------------- UI ----------------

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-pink-50 p-6 pt-12 pb-20">

      {showSosConfirm && (
        <SosConfirmationModal
          onConfirm={confirmSosCall}
          onCancel={() => setShowSosConfirm(false)}
        />
      )}

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Safety Recording</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xs">

        {/* RECORD BUTTON */}
        {recordingStatus === "idle" && !showSaveOption && (
          <button
            onClick={startRecording}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-40 h-40 flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
              <path d="M19 11a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
            </svg>
          </button>
        )}

        {/* WAVES */}
        {recordingStatus === "recording" && (
          <div className="w-full text-center">
            <canvas
              ref={canvasRef}
              className="w-full h-20 rounded-lg bg-blue-100 mb-4"
            />
            <button
              onClick={stopRecording}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Stop
            </button>
          </div>
        )}

        {/* SAVE OPTIONS */}
        {showSaveOption && (
          <div className="text-center">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Save Locally
            </button>
            <button
              onClick={handleDiscard}
              className="ml-4 text-gray-600 px-6 py-3"
            >
              Discard
            </button>
          </div>
        )}
      </div>

      {/* SOS */}
      <div className="w-full max-w-md flex justify-around items-center h-20">
        <button
          onMouseDown={sosButtonDown}
          onMouseUp={sosButtonUp}
          onTouchStart={sosButtonDown}
          onTouchEnd={sosButtonUp}
          className="bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Hold for SOS
        </button>
      </div>
    </div>
  );
}

export default RecordingPage;