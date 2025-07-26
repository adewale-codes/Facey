'use client';

import React from "react";

interface Treatment {
    title: string; 
    image: string; 
    href: string 
}

const treatment: Treatment[] = [   {
        title: "Mesotherapy",
        image: "/concerns/a.webp",
        href: "/treatment/mesotherapy",
      },
      {
        title: "Neogen Plasma",
        image: "/concerns/b.webp",
        href: "/treatment/neogen-plasma",
      },
      {
        title: "Microneedling",
        image: "/concerns/c.webp",
        href: "/treatment/microneedling",
      },
      {
        title: "Obagi Blue Radiance",
        image: "/concerns/d.webp",
        href: "/treatment/obagi-blue-radiance",
      },
      {
        title: "Hydrafacial Full Back",
        image: "/concerns/e.webp",
        href: "/treatment/hydrafacial-full-back",
      },]

      export default function popularTreatments(){
        return( <div>
                    <h3 className="text-2xl font-serif text-green-800 mb-4">
                      Popular Treatments
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {treatment.map((t, i) => (
                        <a
                          key={i}
                          href={t.href}
                          className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                        >
                          <img
                            src={t.image}
                            alt={t.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />                          
                          <div className="p-4">
                            <h4 className="font-medium text-green-800 mb-2">
                              {t.title}
                            </h4>
                            <button className="bg-green-700 text-white text-xs uppercase px-3 py-1 rounded">
                              Find Out More
                            </button>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>)
      }