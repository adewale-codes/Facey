import React from 'react';
import Link from 'next/link';

interface Card {
  name: string;
  href: string;
  image: string;
}

const cards: Card[] = [
  { name: 'Face', href: '/treatment/face', image: '/images/1.jpg' },
  { name: 'Body', href: '/treatment/body', image: '/images/2.jpg' },
  { name: 'Hair', href: '/treatment/hair', image: '/images/3.jpg' },
];

const TreatmentSection: React.FC = () => (
  <section id="treatment-section" className="py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto">
      {/* <h2 className="text-3xl font-serif mb-8">Our Treatments</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.name} href={card.href} className="block">
            <div className="relative h-80 overflow-hidden rounded-lg">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute bottom-4 left-4 text-2xl font-serif text-white">
                {card.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default TreatmentSection;
