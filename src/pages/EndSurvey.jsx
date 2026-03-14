import React, { useState, useEffect } from "react";

export default function EndSurvey() {

  const [gpsLoading, setGpsLoading] = useState(true);

  const [formData, setFormData] = useState({
    q1: 3,
    q2: 3,
    q3: 3,
    q4: 3,
    q5: 3,
    comment: "",
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setGpsLoading(false);
      },
      () => setGpsLoading(false)
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.latitude === null) {
      alert("Waiting for GPS location...");
      return;
    }

    const payload = {
      ...formData,
      q1: Number(formData.q1),
      q2: Number(formData.q2),
      q3: Number(formData.q3),
      q4: Number(formData.q4),
      q5: Number(formData.q5),
    };

    console.log("End survey submitted:", payload);

    alert("Thank you! Your safety experience was recorded.");
  };

  const questions = [
    "How safe did you feel overall in this area?",
    "How safe would you feel walking here at night?",
    "How safe does this area feel during daytime or morning hours?",
    "How well-lit and visible were the surroundings?",
    "How comfortable did the crowd or public activity make you feel?"
  ];

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6 py-25">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-6"
      >

        <h2 className="text-2xl font-bold text-pink-600">
          Share Your Safety Experience
        </h2>

        <p className="text-gray-500 text-sm">
          Your response helps us visualize safer areas for women on the map.
        </p>

        <p className="text-gray-500 text-sm">
          Rate each question from <b>1 (Very Unsafe)</b> to <b>5 (Very Safe)</b>
        </p>

        {gpsLoading ? (
          <p className="text-gray-500 text-sm">
            Getting your location...
          </p>
        ) : (
          <p className="text-xs text-gray-400">
            📍 Lat: {formData.latitude?.toFixed(4)} | Lng: {formData.longitude?.toFixed(4)}
          </p>
        )}

        {/* Safety Questions */}

        {questions.map((q, i) => (
          <div key={i}>
            <label className="font-semibold block mb-2">
              {i + 1}. {q} <span className="text-red-500">*</span>
            </label>

            <select
              name={`q${i + 1}`}
              value={formData[`q${i + 1}`]}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value={1}>1 — Very Unsafe</option>
              <option value={2}>2 — Unsafe</option>
              <option value={3}>3 — Neutral</option>
              <option value={4}>4 — Safe</option>
              <option value={5}>5 — Very Safe</option>
            </select>
          </div>
        ))}

        {/* Optional comment */}

        <div>
          <label className="font-semibold block mb-2">
            Additional context (optional)
          </label>

          <textarea
            name="comment"
            rows="3"
            value={formData.comment}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Travel mode (walking/cab/metro), how useful the app felt, or suggestions to improve the app..."
          />
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 w-full"
        >
          Submit Experience
        </button>

      </form>
    </div>
  );
}