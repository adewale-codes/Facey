"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import AppointmentSection from "@/app/components/Appointment";
import LogoSlider from "@/app/components/LogoSlider";
import FaqSection from "../components/FaqSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PopularTreatment from "../components/PopularTreatment";

interface Concerns {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CONCERNS: Concerns[] = [
  {
    id: "Profhilo",
    title: "Profhilo",
    description:
      "Give your skin the ultimate hydration and anti-ageing boost with Profhilo, an advanced injectable skin treatment designed to stimulate collagen, improve skin elasticity, and deeply hydrate from within. Unlike traditional dermal fillers, Profhilo is a unique bio-remodelling treatment that works by spreading beneath the skin, enhancing hydration, firmness, and overall skin quality. At Face Weybridge, we offer this revolutionary, non-surgical solution to restore youthful radiance and smooth out fine lines, leaving your skin naturally plump and refreshed.",
    image: "/face/8.jpg",
  },
  {
    id: "Delux",
    title: "Delux Rejuvenation",
    description:
      "Indulge in the ultimate rejuvenation experience with our Deluxe Rejuvenation treatment at Face Weybridge. This luxurious, all-in-one treatment is designed to revive, restore, and enhance your skin and body using advanced skincare, deep hydration, and cutting-edge technology. Whether you’re looking to refresh your complexion, tighten and firm your skin, or enhance your overall well-being, our Deluxe Rejuvenation package is the perfect solution for achieving radiant, youthful, and revitalised results.",
    image: "/face/22.jpg",
  },
  {
    id: "Dermaforce",
    title: "Dermaforce RF (aka Morpheus8)",
    description:
      "Achieve transformative results with Dermaforce RF (also known as Morpheus8), a groundbreaking skin rejuvenation treatment available at Face Weybridge. Combining microneedling with advanced radiofrequency (RF) technology, this non-surgical procedure stimulates collagen production, tightens skin, and enhances overall texture and tone. Whether you’re looking to combat signs of ageing, improve skin elasticity, or reduce scars and pigmentation, Dermaforce RF delivers remarkable results with minimal downtime.",
    image: "/face/5.jpg",
  },
  {
    id: "Laser",
    title: "Laser Skin Rejuvenation",
    description:
      "Experience the power of advanced laser technology with our Laser Treatments at Face Weybridge. Designed to target a wide range of skin and body concerns, our laser therapies help with hair removal, skin tightening, pigmentation correction, and overall skin rejuvenation. Whether you’re looking for a permanent hair reduction solution, skin resurfacing, or collagen stimulation, our cutting-edge laser treatments provide safe, effective, and long-lasting results with minimal downtime.",
    image: "/face/19.jpg",
  },
  {
    id: "PRP",
    title: "PRP",
    description:
      "Restore thicker, healthier, and stronger hair with PRP (Platelet-Rich Plasma) Hair Restoration at Face Weybridge. This innovative, non-surgical treatment uses your body’s own natural growth factors to stimulate hair follicles, promoting hair regrowth, improved thickness, and reduced hair shedding. Whether you’re experiencing thinning hair, hair loss, or weakened follicles, PRP therapy provides a safe, natural, and effective solution to rejuvenate your scalp and restore hair health.",
    image: "/face/16.jpg",
  },
];

type ConcernDetails = {
  intro: string;
  understanding: string;
  causes: string;
  types: { heading: string; text: string }[];
  treatmentOptions: string;
};

const DETAILS: Record<string, ConcernDetails> = {
  Profhilo: {
    intro:
      "At Face Weybridge, we specialise in advanced aesthetic treatments, ensuring safe, effective, and natural-looking results. Our experienced practitioners use precise injection techniques to ensure Profhilo is administered with expert care and precision. We take a personalised approach to each client, helping you achieve a radiant, youthful complexion with long-lasting hydration and skin rejuvenation.",
    understanding:
      "Profhilo is an innovative injectable treatment that uses a unique formulation of hyaluronic acid to deeply hydrate and rejuvenate the skin. Unlike traditional dermal fillers, Profhilo works by stimulating collagen and elastin production, improving skin elasticity, and enhancing overall skin quality. It is suitable for all skin types and can be used on the face, neck, and other areas of the body.",

    causes:
      "Profhilo is used to address various skin concerns, including: Loss of skin elasticity, Fine lines and wrinkles, Dry or dehydrated skin, Sagging skin, Dull or uneven skin tone. It is particularly effective for individuals looking to improve overall skin quality and achieve a more youthful appearance.",
    types: [
      {
        heading: "Original Profhilo (Body & Face)",
        text: "The standard formulation for facial and body rejuvenation, Contains high concentrations of hyaluronic acid, Improves skin hydration, elasticity, and firmness.",
      },
      {
        heading: "Profhilo Body",
        text: "Specifically designed for body areas, Contains a higher concentration of hyaluronic acid, Targets larger skin areas like arms, abdomen, and thighs, Improves skin laxity and hydration.",
      },
      {
        heading: " Profhilo Structura (Upcoming/Alternate Variant)",
        text: "A new variant designed for deeper tissue hydration and skin structure, Contains additional peptides for enhanced collagen stimulation, Aims to improve skin texture and firmness in specific areas.",
      },
    ],
    treatmentOptions:
      "Profhilo is a versatile treatment that can be customised based on your specific skin concerns and desired outcomes. Here are the main treatment options: Full Face Profhilo, Neck and Décolletage Profhilo, Body Profhilo, Combination Treatments (with other injectables or skin treatments), Maintenance Treatments (every 6–12 months). Each option is tailored to address different areas and skin conditions, ensuring optimal results.",
  },
  Delux: {
    intro:
      "At Face Weybridge, we offer an exclusive Deluxe Rejuvenation treatment, combining the latest skincare and body-enhancing technologies for a truly luxurious and results-driven experience. Our highly trained specialists provide tailored treatments to restore radiance, firmness, and hydration, ensuring you look and feel your absolute best.",
    understanding:
      "Deluxe Rejuvenation is a comprehensive, all-in-one treatment designed to rejuvenate the skin and body using advanced skincare techniques and technologies. It typically includes a combination of facial treatments, body contouring, and skin tightening procedures to achieve a youthful, radiant appearance. The treatment can be customised based on individual needs and may include options like chemical peels, microdermabrasion, radiofrequency therapy, and more.",

    causes:
      "Deluxe Rejuvenation is used to address various skin and body concerns, including: Signs of ageing (fine lines, wrinkles, sagging), Dull or uneven skin tone, Loss of skin elasticity, Dry or dehydrated skin, Body contouring and tightening needs. It is ideal for individuals looking to enhance their overall appearance and achieve a more youthful, revitalised look.",
    types: [
      {
        heading: " Deluxe HydraFacial Rejuvenation",
        text: "Combines HydraFacial with advanced serums and boosters for deep hydration and skin rejuvenation, Targets fine lines, uneven texture, and dullness.",
      },
      {
        heading: "Deluxe Microneedling Rejuvenation",
        text: "Incorporates microneedling with PRP or growth factors for enhanced skin regeneration, Improves skin texture, firmness, and reduces scars.",
      },
      {
        heading: "Deluxe Laser Rejuvenation",
        text: "Combines laser treatments (like CO2 or Erbium) with skin resurfacing and tightening, Targets deeper skin concerns like wrinkles, pigmentation, and laxity.",
      },
    ],
    treatmentOptions:
      "Deluxe Rejuvenation treatments at Face Weybridge can be customised based on your specific skin and body concerns. Here are the main treatment options: Full Face Deluxe Rejuvenation, Neck and Décolletage Deluxe Rejuvenation, Body Deluxe Rejuvenation, Combination Treatments (with injectables or other advanced therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive rejuvenation for a youthful, radiant appearance.",
  },
  Dermaforce: {
    intro:
      "At Face Weybridge, we are dedicated to helping you achieve your aesthetic goals with the latest and most effective treatments. Our highly trained practitioners have extensive experience in performing Dermaforce RF treatments, ensuring precision and safety at every step. We personalise each session to suit your unique needs, using state-of-the-art technology to deliver natural, long-lasting results. Experience exceptional care in our welcoming and professional clinic, where your comfort and satisfaction are always our top priority.",
    understanding:
      "Dermaforce RF, also known as Morpheus8, is a revolutionary skin rejuvenation treatment that combines microneedling with radiofrequency (RF) energy to stimulate collagen production and tighten the skin. This non-surgical procedure targets deeper layers of the skin, promoting skin elasticity, reducing wrinkles, and improving overall texture and tone. Dermaforce RF is suitable for various areas of the face and body, making it a versatile option for those seeking comprehensive skin rejuvenation.",

    causes:
      "Dermaforce RF is used to address various skin concerns, including: Signs of ageing (fine lines, wrinkles, sagging), Loss of skin elasticity, Uneven skin texture and tone, Scarring (acne scars, surgical scars), Stretch marks. It is ideal for individuals looking to improve their skin’s overall appearance and achieve a more youthful, revitalised look.",
    types: [
      {
        heading: "Morpheus8 / Dermaforce RF for Face",
        text: "Targets facial wrinkles, sagging skin, and uneven texture, Stimulates collagen production for a more youthful appearance.",
      },
      {
        heading: "Morpheus8 / Dermaforce RF for Body",
        text: "Targets larger body areas like abdomen, thighs, and arms, Improves skin laxity and tightens loose skin.",
      },
      {
        heading: " Fractional RF with PRP or Exosomes",
        text: "Combines RF microneedling with PRP or exosome therapy for enhanced skin rejuvenation, Promotes deeper skin regeneration and healing.",
      },
    ],
    treatmentOptions:
      "Dermaforce RF treatments at Face Weybridge can be customised based on your specific skin concerns and desired outcomes. Here are the main treatment options: Full Face Dermaforce RF, Neck and Décolletage Dermaforce RF, Body Dermaforce RF, Combination Treatments (with PRP or exosome therapy), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive skin rejuvenation for a youthful, radiant appearance.",
  },
  Laser: {
    intro:
      "At Face Weybridge, we offer the latest in laser technology, providing highly effective, non-invasive treatments that are tailored to your individual skin and body concerns. Our trained specialists use precision techniques to deliver visible, long-lasting improvements, ensuring you achieve the best possible results with safety and comfort in mind.",
    understanding:
      "Laser skin rejuvenation uses focused light energy to target specific skin concerns, such as pigmentation, wrinkles, and uneven texture. The laser works by stimulating collagen production and promoting skin renewal, resulting in a smoother, more youthful appearance. Different types of lasers are used depending on the specific treatment goals, including ablative lasers (which remove the outer layer of skin) and non-ablative lasers (which penetrate deeper without damaging the surface).",

    causes:
      "Laser skin rejuvenation is used to address various skin concerns, including: Sun damage and pigmentation, Fine lines and wrinkles, Uneven skin texture and tone, Acne scars and other scarring, Enlarged pores. It is ideal for individuals looking to improve their skin’s overall appearance and achieve a more youthful, revitalised look.",
    types: [
      {
        heading: "Ablative Laser Resurfacing",
        text: "Removes the outer layer of skin to treat deeper wrinkles and scars, Stimulates collagen production for smoother skin.",
      },
      {
        heading: "Non-Ablative Laser Rejuvenation",
        text: "Penetrates deeper layers of skin without damaging the surface, Ideal for treating pigmentation, fine lines, and overall skin texture.",
      },
      {
        heading: "Fractional Laser (Ablative or Non-Ablative)",
        text: "Combines the benefits of both ablative and non-ablative lasers, Targets specific areas while leaving surrounding skin intact, Promotes faster healing and less downtime.",
      },
    ],
    treatmentOptions:
      "Laser skin rejuvenation treatments at Face Weybridge can be customised based on your specific skin concerns and desired outcomes. Here are the main treatment options: Full Face Laser Rejuvenation, Neck and Décolletage Laser Rejuvenation, Body Laser Rejuvenation, Combination Treatments (with microneedling or PRP), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive skin rejuvenation for a youthful, radiant appearance.",
  },
  PRP: {
    intro:
      "At Face Weybridge, we offer advanced PRP therapy tailored to your specific hair needs. Our skilled specialists use high-quality platelet concentration techniques to deliver maximum hair restoration benefits. With a personalised and results-driven approach, we ensure your treatment is safe, effective, and designed to help you regain thicker, healthier hair naturally.",
    understanding:
      "PRP (Platelet-Rich Plasma) therapy is a non-surgical treatment that uses your body’s own natural growth factors to stimulate hair follicles and promote hair regrowth. The procedure involves drawing a small amount of your blood, processing it to concentrate the platelets, and then injecting this platelet-rich plasma into the scalp. PRP therapy is effective for various types of hair loss, including androgenetic",

    causes:
      "PRP therapy is used to address various hair loss concerns, including: Androgen",
    types: [
      {
        heading: "Pure PRP (P-PRP)",
        text: "Contains a high concentration of platelets, Ideal for stimulating hair follicles and promoting regrowth, Used for general hair thinning and loss.",
      },
      {
        heading: " Leukocyte-Rich PRP (L-PRP)",
        text: "Contains additional white blood cells, Enhances the healing and regeneration process, Suitable for more advanced hair loss or scalp conditions.",
      },
      {
        heading: "Platelet-Rich Fibrin (PRF)",
        text: "A newer variant that contains a higher concentration of growth factors, Provides longer-lasting results, Ideal for individuals seeking enhanced hair restoration effects.",
      },
    ],
    treatmentOptions:
      "PRP therapy at Face Weybridge can be customised based on your specific hair loss concerns and desired outcomes. Here are the main treatment options: Full Scalp PRP Treatment, Targeted PRP Injections for Thinning Areas, Combination Treatments (with microneedling or mesotherapy), Maintenance Treatments (every 3–6 months). Each option is designed to provide comprehensive hair restoration for thicker, healthier hair.",
  },
};

export default function ConcernDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      CONCERNS.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const [selected, setSelected] = useState<Concerns | null>(null);

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
    return (
      <p className="p-8 text-center text-gray-500 italic">
        No concern selected.
      </p>
    );
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
                    router.push(`/hand/${c.id}`);
                  }}
                  className={`w-full text-left px-2 py-1 rounded ${
                    c.id === selected.id
                      ? "font-semibold text-green-800"
                      : "text-gray-700 hover:text-green-800"
                  }`}
                >
                  {c.title}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-gray-500 italic">No results</li>
            )}
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
              <h2 className="text-2xl font-serif text-white">
                {selected.title}
              </h2>
              <p className="text-white mt-2 max-w-2xl">
                {selected.description}
              </p>
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
            <PopularTreatment />
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-2">
              Causes of {selected.title}
            </h3>
            <p className="text-gray-700">{detail.causes}</p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-green-800 mb-4">
              Types of {selected.title}
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
