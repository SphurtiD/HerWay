import { useState } from "react";

export default function StartSurvey() {
  const [formData, setFormData] = useState({
    ageGroup: "",
    role: "",
    travelFrequency: "",
    travelAlone: "",
    soloExperience: "",
    languages: [],
    safetyApps: "",
    unsafeReason: "",
    otherLanguage: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.languages, value]
          : prev.languages.filter((lang) => lang !== value);
        return { ...prev, languages: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Data:", formData);

    // 👉 Your teammate can use Axios here
    // axios.post("/api/survey", formData)
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4 py-25">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-600 neueL">
          Start Survey
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. Age Group */}
          <div>
            <label className="block font-medium mb-2">What is your age group?</label>
            {["Under 18", "18–24", "25–34", "35–44", "45 and above"].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="ageGroup"
                  value={option}
                  checked={formData.ageGroup === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 2. Role */}
          <div>
            <label className="block font-medium mb-2">
              What best describes your current role?
            </label>
            {["Student", "Working professional", "Homemaker", "Freelancer", "Other"].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={formData.role === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 3. Travel frequency */}
          <div>
            <label className="block font-medium mb-2">
              How often do you travel in a month (for any reason)?
            </label>
            {[
              "Rarely (0–1 times/month)",
              "Occasionally (2–4 times/month)",
              "Frequently (5–10 times/month)",
              "Very Frequently (10+ times/month)",
            ].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="travelFrequency"
                  value={option}
                  checked={formData.travelFrequency === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 4. Travel alone */}
          <div>
            <label className="block font-medium mb-2">How often do you travel alone?</label>
            {["Never", "Occasionally", "Often", "Almost always"].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="travelAlone"
                  value={option}
                  checked={formData.travelAlone === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 5. Solo travel experience */}
          <div>
            <label className="block font-medium mb-2">
              Have you traveled solo to unfamiliar cities or locations before?
            </label>
            {[
              "Yes",
              "No",
              "Only during the day",
              "Only with planned assistance (hotel pickups, family, etc.)",
            ].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="soloExperience"
                  value={option}
                  checked={formData.soloExperience === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 6. Languages */}
          <div>
            <label className="block font-medium mb-2">
              Which language(s) do you feel most comfortable communicating in while traveling?
            </label>
            {["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali", "Kannada"].map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  name="languages"
                  value={option}
                  checked={formData.languages.includes(option)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
            {/* Other language input */}
            <div className="mt-2">
              <input
                type="checkbox"
                name="languages"
                value="Other"
                checked={formData.languages.includes("Other")}
                onChange={handleChange}
                className="mr-2"
              />
              Other
              {formData.languages.includes("Other") && (
                <input
                  type="text"
                  name="otherLanguage"
                  placeholder="Please specify"
                  value={formData.otherLanguage}
                  onChange={handleChange}
                  className="ml-2 border rounded px-2 py-1"
                />
              )}
            </div>
          </div>

          {/* 7. Safety apps */}
          <div>
            <label className="block font-medium mb-2">
              Do you currently use any personal safety apps or tools?
            </label>
            {["Yes (frequently)", "Yes (rarely)", "No"].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="safetyApps"
                  value={option}
                  checked={formData.safetyApps === option}
                  onChange={handleChange}
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>

          {/* 8. Unsafe Reason (optional) */}
          <div>
            <label className="block font-medium mb-2">
              If you’ve ever felt unsafe while traveling, what made you feel that way? (Optional)
            </label>
            <textarea
              name="unsafeReason"
              value={formData.unsafeReason}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Type your answer here..."
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
