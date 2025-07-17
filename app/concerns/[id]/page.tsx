'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import AppointmentSection from '@/app/components/Appointment';
import LogoSlider from '@/app/components/LogoSlider';
import FaqSection from '../components/FaqSection';
import TestimonialsSection from '../components/TestimonialsSection';

interface Concern {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CONCERNS: Concern[] = [
  {
    id: 'acne',
    title: 'Acne',
    description:
      'Treat acne effectively with our specialised solutions. Achieve clearer skin through personalised care and advanced treatments at Facey Clinic.',
    image: '/concerns/1.webp',
  },
  {
    id: 'acne-scarring',
    title: 'Acne Scarring',
    description:
      'Reduce acne scarring with our advanced treatments. Experience personalised care to smooth and renew your skin’s surface.',
    image: '/concerns/2.webp',
  },
];

type ConcernDetails = {
  intro: string;
  understanding: string;
  popularTreatments: { title: string; image: string; href: string }[];
  causes: string;
  types: { heading: string; text: string }[];
  treatmentOptions: string;
};

const DETAILS: Record<string, ConcernDetails> = {
  acne: {
    intro: 'Acne is a common skin condition…',
    understanding: 'It develops when…',
    popularTreatments: [
      { title: 'Mesotherapy', image: '/concerns/a.webp', href: '/treatment/mesotherapy' },
      { title: 'Neogen Plasma', image: '/concerns/b.webp', href: '/treatment/neogen-plasma' },
      { title: 'Microneedling', image: '/concerns/c.webp', href: '/treatment/microneedling' },
      { title: 'Obagi Blue Radiance', image: '/concerns/d.webp', href: '/treatment/obagi-blue-radiance' },
      { title: 'Hydrafacial Full Back', image: '/concerns/e.webp', href: '/treatment/hydrafacial-full-back' },
    ],
    causes: 'Acne typically forms when…',
    types: [
      { heading: 'Comedonal Acne', text: 'Characterised by open or closed comedones…' },
      { heading: 'Inflammatory Acne', text: 'Includes papules and pustules…' },
      { heading: 'Cystic Acne', text: 'Deep, painful cysts beneath the skin…' },
    ],
    treatmentOptions: 'Our approach includes topical retinoids, chemical peels, custom homecare…',
  },
  'acne-scarring': {
    intro: 'Acne scarring is a common complication…',
    understanding: 'These scars develop when…',
    popularTreatments: [
      { title: 'Microneedling', image: '/concerns/a.webp', href: '/treatment/microneedling' },
      { title: 'Neogen Plasma', image: '/concerns/b.webp', href: '/treatment/neogen-plasma' },
      { title: 'Obagi Blue Radiance', image: '/concerns/c.webp', href: '/treatment/obagi-blue-radiance' },
      { title: 'Mesotherapy', image: '/concerns/d.webp', href: '/treatment/mesotherapy' },
      { title: 'Hydrafacial Back', image: '/concerns/e.webp', href: '/treatment/hydrafacial-full-back' },
    ],
    causes: 'Acne scars typically form when spots are picked or squeezed…',
    types: [
      { heading: 'Ice Pick Scars', text: 'Small, deep scars that resemble tiny punctures…' },
      { heading: 'Rolling Scars', text: 'Wide, shallow depressions with a rolling texture…' },
      { heading: 'Boxcar Scars', text: 'Broad depressions that form a crater-like appearance…' },
    ],
    treatmentOptions: 'Treatments range from over-the-counter to specialised aesthetic procedures…',
  },
};

export default function ConcernDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () =>
      CONCERNS.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const [selected, setSelected] = useState<Concern | null>(null);

  useEffect(() => {
    if (id) {
      const found = CONCERNS.find((c) => c.id === id);
      setSelected(found ?? filtered[0] ?? null);
    }
  }, [id, filtered]);

  useEffect(() => {
    if (selected && !filtered.some((c) => c.id === selected.id)) {
      setSelected(filtered[0] ?? null);
    }
  }, [filtered, selected]);

  if (!selected) {
    return <p className="p-8 text-center text-gray-500 italic">No concern selected.</p>;
  }

  const detail = DETAILS[selected.id]!;

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 space-y-16">
      <h1 className="text-3xl font-serif text-green-800">{selected.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="col-span-1">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-gray-300 pb-2 mb-4 focus:outline-none focus:border-green-700 text-black"
          />
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => {
                    setSelected(c);
                    router.push(`/concerns/${c.id}`);
                  }}
                  className={`w-full text-left px-2 py-1 rounded ${
                    c.id === selected.id
                      ? 'font-semibold text-green-800'
                      : 'text-gray-700 hover:text-green-800'
                  }`}
                >
                  {c.title}
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="text-gray-500 italic">No results</li>}
          </ul>
        </aside>

        <div className="col-span-3 space-y-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={selected.image}
              alt={selected.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 p-4 rounded">
              <h2 className="text-2xl font-serif text-white">{selected.title}</h2>
              <p className="text-white mt-2 max-w-2xl">{selected.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif text-green-800 mb-2">
              Treatment for {selected.title} at Facey Clinic
            </h3>
            <p className="text-gray-700">{detail.intro}</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-4">
              Understanding Different Types of {selected.title}
            </h3>
            <p className="text-gray-700 mb-2">{detail.understanding}</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-4">
              Popular Treatments for {selected.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {detail.popularTreatments.map((t, i) => (
                <a
                  key={i}
                  href={t.href}
                  className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={t.image}
                    alt={t.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium text-green-800 mb-2">{t.title}</h4>
                    <button className="bg-green-700 text-white text-xs uppercase px-3 py-1 rounded">
                      Find Out More
                    </button>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-2">
              Causes of {selected.title}
            </h3>
            <p className="text-gray-700">{detail.causes}</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-4">
              Types of {selected.title} Based on Collagen Response
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {detail.types.map((tp, i) => (
                <li key={i}>
                  <strong>{tp.heading}:</strong> {tp.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-2">
              Treatment Options for {selected.title}
            </h3>
            <p className="text-gray-700">{detail.treatmentOptions}</p>
          </div>

          <AppointmentSection />
          <LogoSlider />
          <FaqSection />
          <TestimonialsSection />
        </div>
      </div>
    </section>
  );
}
