import React, { useState } from "react";

export default function EndSurvey() {
  const [formData, setFormData] = useState({
    safety: "",
    discomfort: "",
    unsafeTime: "",
    unsafeLocations: [],
    featureUsage: "",
    helpfulFeatures: [],
    improvedSafety: "",
    alerts: "",
    recommend: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const values = prev[name];
        if (checked) {
          return { ...prev, [name]: [...values, value] };
        } else {
          return { ...prev, [name]: values.filter((v) => v !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation: check all required
    for (const key in formData) {
      if (Array.isArray(formData[key]) && formData[key].length === 0) {
        alert("Please answer all required questions!");
        return;
      }
      if (!Array.isArray(formData[key]) && formData[key].trim() === "" && key !== "feedback") {
        alert("Please answer all required questions!");
        return;
      }
    }

    console.log("Form submitted:", formData);
    alert("Thank you for completing the survey!");
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6 py-25">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-pink-600">End of Trip Survey</h2>

        {/* 1. Safety */}
        <div>
          <label className="font-semibold">1. How safe did you feel?</label>
          <div className="space-y-1">
            {["Very Safe", "Somewhat Safe", "Unsafe", "Very Unsafe"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="safety"
                  value={opt}
                  checked={formData.safety === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 2. Discomfort */}
        <div>
          <label className="font-semibold">
            2. Did you encounter any uncomfortable situations?
          </label>
          <div className="space-y-1">
            {["No", "Yes (minor)", "Yes (serious)", "Prefer not to say"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="discomfort"
                  value={opt}
                  checked={formData.discomfort === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 3. Unsafe Time */}
        <div>
          <label className="font-semibold">3. At what time did you feel unsafe?</label>
          <div className="space-y-1">
            {["Daytime", "Evening", "Night", "No difference"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="unsafeTime"
                  value={opt}
                  checked={formData.unsafeTime === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 4. Unsafe Locations */}
        <div>
          <label className="font-semibold">
            4. Which locations felt unsafe? (Select all)
          </label>
          <div className="space-y-1">
            {["Public transport", "Streets/alleys", "Restaurants/cafes", "Tourist spots", "Accommodation areas", "Other"].map(
              (opt) => (
                <label key={opt} className="block">
                  <input
                    type="checkbox"
                    name="unsafeLocations"
                    value={opt}
                    checked={formData.unsafeLocations.includes(opt)}
                    onChange={handleChange}
                  />{" "}
                  {opt}
                </label>
              )
            )}
          </div>
        </div>

        {/* 5. Feature Usage */}
        <div>
          <label className="font-semibold">
            5. Did you use the app’s features?
          </label>
          <div className="space-y-1">
            {[
              "Yes, and it helped",
              "Yes, but it didn’t help much",
              "No, I didn’t need them",
              "No, I forgot about them",
            ].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="featureUsage"
                  value={opt}
                  checked={formData.featureUsage === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 6. Helpful Features */}
        <div>
          <label className="font-semibold">
            6. Which features were most helpful? (Select all)
          </label>
          <div className="space-y-1">
            {["Fake calls", "Translation / detection", "Emergency alerts", "Live previews", "None"].map(
              (opt) => (
                <label key={opt} className="block">
                  <input
                    type="checkbox"
                    name="helpfulFeatures"
                    value={opt}
                    checked={formData.helpfulFeatures.includes(opt)}
                    onChange={handleChange}
                  />{" "}
                  {opt}
                </label>
              )
            )}
          </div>
        </div>

        {/* 7. Improved Safety */}
        <div>
          <label className="font-semibold">7. Did the app improve your safety?</label>
          <div className="space-y-1">
            {["Yes, significantly", "Yes, somewhat", "No difference", "No, it didn’t help"].map(
              (opt) => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name="improvedSafety"
                    value={opt}
                    checked={formData.improvedSafety === opt}
                    onChange={handleChange}
                    required
                  />{" "}
                  {opt}
                </label>
              )
            )}
          </div>
        </div>

        {/* 8. Alerts */}
        <div>
          <label className="font-semibold">8. Were alerts timely?</label>
          <div className="space-y-1">
            {["Yes, always", "Sometimes", "Rarely", "Not at all"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="alerts"
                  value={opt}
                  checked={formData.alerts === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 9. Recommend */}
        <div>
          <label className="font-semibold">9. Would you recommend this app?</label>
          <div className="space-y-1">
            {["Yes, definitely", "Maybe", "No"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="recommend"
                  value={opt}
                  checked={formData.recommend === opt}
                  onChange={handleChange}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* 10. Feedback */}
        <div>
          <label className="font-semibold">10. Any feedback or incidents?</label>
          <textarea
            name="feedback"
            rows="3"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Your feedback..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
}
