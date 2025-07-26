"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Do I need a consultation first?",
    answer:
      "Yes — every first-time treatment starts with a detailed consultation to understand your goals and medical history.",
  },
  {
    question: "Will I need to book time off work?",
    answer:
      "Most treatments have minimal downtime, but we’ll advise you on any recovery time during your consultation.",
  },
  {
    question: "Are your aesthetic treatments painful?",
    answer:
      "We use numbing creams and gentle techniques to ensure your comfort. Sensations vary by treatment, but pain is typically mild.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Click the “Book Now” button at the top of the page or call us directly on 0203 337 4410.",
  },
  {
    question: "How do I know what treatment is best for me?",
    answer:
      "We’ll recommend the optimal treatment plan during your consultation, tailored to your skin type and goals.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="py-16 px-4 md:px-8 lg:px-16 bg-green-800 text-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <ul className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <li key={idx} className="border-b border-green-500 pb-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-medium">{item.question}</span>
                  <span className="text-2xl">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="mt-2 text-green-100">{item.answer}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
