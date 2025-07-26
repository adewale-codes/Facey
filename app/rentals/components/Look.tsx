"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function LookSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <section id="look" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="order-first md:order-last">
          <Image
            src="/images/12.png"
            alt="Room Rental Space"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg object-cover shadow-lg"
          />
        </div>

        <div className="order-last md:order-first space-y-6">
          <h2 className="text-4xl font-serif text-green-800">
            Looking for a professional space to grow your practice?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our clinic offers flexible room rental services for medical
            consultants, including doctors, therapists, and specialists. Each
            room is fully equipped with modern amenities to ensure comfort and
            privacy for both you and your patients. With convenient booking
            options and a prime location, you can focus on what matters
            most—delivering exceptional care.
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last Name"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="Email Address"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us more about the service you need..."
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-black"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full bg-green-700 text-white uppercase font-medium px-6 py-3 rounded hover:bg-green-800 transition ${
                status === "sending" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Sent!"
                : status === "error"
                ? "Error"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
