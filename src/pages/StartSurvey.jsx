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
    phone: "",
    phoneCode: "+91"
  });

  const [contacts, setContacts] = useState([
    { name: "", relationship: "", code: "+91", phone: "" }
  ]);

  const countryCodes = [
    { code: "+91", label: "India" },
    { code: "+1", label: "USA/Canada" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "Australia" },
    { code: "+971", label: "UAE" },
    { code: "+81", label: "Japan" },
    { code: "+49", label: "Germany" },
  ];

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

  const handleContactChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const addContact = () => {
    if (contacts.length < 4) {
      setContacts([
        ...contacts,
        { name: "", relationship: "", code: "+91", phone: "" }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contacts[0].name || !contacts[0].phone) {
      alert("At least one emergency contact is required.");
      return;
    }

    const surveyData = {
      ...formData,
      emergencyContacts: contacts
    };

    console.log("Survey Data:", surveyData);

    // axios.post("/api/survey", surveyData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4 py-25">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8 text-center text-pink-600 neueL">
          Tell Us About You
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Age */}
          <div>
            <label className="block font-medium mb-2">
              What is your age group? <span className="text-red-500">*</span>
            </label>
            {["Under 18", "18–24", "25–34", "35–44", "45 and above"].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Phone Number */}
          <div>
            <label className="block font-medium mb-2">
              Your Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-2">
              
              <select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="border rounded px-2 py-2"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.label})
                  </option>
                ))}
              </select>

              <input
                required
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 border rounded px-3 py-2"
              />

            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-2">
              What best describes your current role? <span className="text-red-500">*</span>
            </label>
            {["Student", "Working professional", "Homemaker", "Freelancer", "Other"].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Travel Frequency */}
          <div>
            <label className="block font-medium mb-2">
              How often do you travel in a month? <span className="text-red-500">*</span>
            </label>
            {[
              "Rarely (0–1 times/month)",
              "Occasionally (2–4 times/month)",
              "Frequently (5–10 times/month)",
              "Very Frequently (10+ times/month)",
            ].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Travel Alone */}
          <div>
            <label className="block font-medium mb-2">
              How often do you travel alone? <span className="text-red-500">*</span>
            </label>
            {["Never", "Occasionally", "Often", "Almost always"].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Solo Experience */}
          <div>
            <label className="block font-medium mb-2">
              Have you traveled solo to unfamiliar cities before? <span className="text-red-500">*</span>
            </label>
            {[
              "Yes",
              "No",
              "Only during the day",
              "Only with planned assistance",
            ].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Languages */}
          <div>
            <label className="block font-medium mb-2">
              Which language(s) are you comfortable using while traveling? <span className="text-red-500">*</span>
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
                  required
                  name="otherLanguage"
                  placeholder="Please specify"
                  value={formData.otherLanguage}
                  onChange={handleChange}
                  className="ml-2 border rounded px-2 py-1"
                />
              )}
            </div>
          </div>

          {/* Safety Apps */}
          <div>
            <label className="block font-medium mb-2">
              Do you use any personal safety apps? <span className="text-red-500">*</span>
            </label>
            {["Yes (frequently)", "Yes (rarely)", "No"].map((option) => (
              <div key={option}>
                <input
                  required
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

          {/* Emergency Contacts */}
          <div>
            <label className="block font-medium mb-3">
              Emergency Contacts <span className="text-red-500">*</span>
            </label>

            {contacts.map((contact, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 bg-pink-50">

                <input
                  required
                  type="text"
                  placeholder="Contact Name *"
                  value={contact.name}
                  onChange={(e) => handleContactChange(index, "name", e.target.value)}
                  className="w-full border rounded px-3 py-2 mb-2"
                />

                <input
                  type="text"
                  placeholder="Relationship (optional)"
                  value={contact.relationship}
                  onChange={(e) => handleContactChange(index, "relationship", e.target.value)}
                  className="w-full border rounded px-3 py-2 mb-2"
                />

                <div className="flex gap-2">
                  <select
                    value={contact.code}
                    onChange={(e) => handleContactChange(index, "code", e.target.value)}
                    className="border rounded px-2"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.label})
                      </option>
                    ))}
                  </select>

                  <input
                    required
                    type="tel"
                    placeholder="Phone Number *"
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, "phone", e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                  />
                </div>

              </div>
            ))}

            {contacts.length < 4 && (
              <button
                type="button"
                onClick={addContact}
                className="border-dashed border-2 border-pink-400 w-full py-2 rounded-lg text-pink-600 hover:bg-pink-100"
              >
                + Add another emergency contact
              </button>
            )}
          </div>

          {/* Unsafe Reason */}
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
            />
          </div>

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