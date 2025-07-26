"use client";

import React from "react";
import Link from "next/link";

interface StaffMember {
  name: string;
  role: string;
  imageSrc: string;
  buttonText: string;
  buttonHref: string;
}

const staffMembers: StaffMember[] = [
  {
    name: "Georgina",
    role: "Operations Manager",
    imageSrc: "/staffs/4.jpg",
    buttonText: "Email Georgina",
    buttonHref: "mailto:georgina@drrashaclinic.com",
  },
  {
    name: "Juta",
    role: "Senior Aesthetic Practitioner",
    imageSrc: "/staffs/5.jpg",
    buttonText: "Book Now",
    buttonHref: "/book",
  },
  {
    name: "Jennie",
    role: "Clinic Manager",
    imageSrc: "/staffs/6.jpg",
    buttonText: "Email Jennie",
    buttonHref: "mailto:jennie@drrashaclinic.com",
  },
  {
    name: "Karina",
    role: "Aesthetician",
    imageSrc: "/staffs/1.webp",
    buttonText: "Whatsapp Us",
    buttonHref: "mailto:jennie@drrashaclinic.com",
  },
  {
    name: "Angelika",
    role: "Aesthetician",
    imageSrc: "/staffs/2.webp",
    buttonText: "Whatsapp Us",
    buttonHref: "mailto:jennie@drrashaclinic.com",
  },
  {
    name: "Ria",
    role: "Reception",
    imageSrc: "/staffs/3.webp",
    buttonText: "Whatsapp Us",
    buttonHref: "mailto:jennie@drrashaclinic.com",
  },
  {
    name: "Faye",
    role: "Reception",
    imageSrc: "/staffs/7.webp",
    buttonText: "Whatsapp Us",
    buttonHref: "mailto:jennie@drrashaclinic.com",
  },
];

const StaffSection: React.FC = () => (
  <section id="staff" className="py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif text-green-800 mb-8">Meet the Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffMembers.map((staff) => (
          <div key={staff.name} className="flex flex-col items-center">
            <div className="w-full h-96 overflow-hidden rounded-lg">
              <img
                src={staff.imageSrc}
                alt={staff.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mt-4 text-xl font-serif text-green-800">
              {staff.name}
            </h3>
            <p className="text-gray-700 mb-4">{staff.role}</p>
            <Link
              href={staff.buttonHref}
              className="bg-green-700 text-white uppercase font-medium px-6 py-3 rounded"
            >
              {staff.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StaffSection;
