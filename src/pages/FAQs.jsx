import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "What is HerWay?",
      answer:
        "HerWay is a platform built to empower women to travel safely and confidently. It provides tools like fake calls, real-time translation, and emergency alerts.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us through the Contact Us page. Messages are routed through Formspree, and we’ll reply within 24-48 hours.",
    },
    {
      question: "Is HerWay free to use?",
      answer:
        "Yes! Our core features are free. Some advanced features may require premium access in the future.",
    },
    {
      question: "How do I report a bug?",
      answer:
        "Please head over to our Contact Us page and describe the issue. Attaching screenshots helps us resolve it faster.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-600 neueL">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="ml-2 text-pink-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
