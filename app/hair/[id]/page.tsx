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
    id: "PRP",
    title: "PRP",
    description:
      "Restore thicker, healthier, and stronger hair with PRP (Platelet-Rich Plasma) Hair Restoration at Face Weybridge. This innovative, non-surgical treatment uses your body’s own natural growth factors to stimulate hair follicles, promoting hair regrowth, improved thickness, and reduced hair shedding. Whether you’re experiencing thinning hair, hair loss, or weakened follicles, PRP therapy provides a safe, natural, and effective solution to rejuvenate your scalp and restore hair health.",
    image: "/face/16.jpg",
  },
  {
    id: "Hair",
    title: "Hair Polynucleotides",
    description:
      "Revitalise and restore stronger, thicker, and healthier hair with Polynucleotide Therapy, the latest breakthrough in hair regeneration. This scientifically advanced treatment works by stimulating cellular repair, increasing blood flow, and nourishing the scalp to revive weakened hair follicles and promote natural hair growth. At Face Weybridge, we offer Hair Polynucleotide Therapy as a powerful, non-surgical solution for individuals experiencing hair thinning, excessive shedding, or early-stage hair loss.",
    image: "/face/16.jpg",
  },
  {
    id: "Hydrafacial",
    title: "Hydrafacial Keravive",
    description:
      "Just like your skin, your scalp needs proper care to maintain healthy, strong, and beautiful hair. Hydrafacial Keravive is a revolutionary scalp treatment designed to deeply cleanse, hydrate, and nourish your scalp, creating the perfect environment for thicker, fuller, and healthier hair growth. At Face Weybridge, we offer Hydrafacial Keravive to address dryness, clogged follicles, poor circulation, and weak hair strands, ensuring your hair gets the best possible foundation to grow.",
    image: "/face/17.jpg",
  },
  {
    id: "Exosomes",
    title: "Hair Exosomes",
    description:
      "Revolutionise your hair growth journey with Hair Exosome Therapy, the latest breakthrough in hair restoration and scalp rejuvenation. This cutting-edge treatment uses exosomes—powerful cellular messengers derived from stem cells—to stimulate hair follicle regeneration, increase hair density, and reduce hair loss. At Face Weybridge, we offer Hair Exosome Therapy to promote stronger, thicker, and healthier hair without surgery or downtime.",
    image: "/face/18.jpg",
  },
  {
    id: "Mesotherapy",
    title: "Mesotherapy",
    description:
      "Give your hair the nourishment it needs with Mesotherapy for Hair, a powerful, non-surgical treatment designed to stimulate hair growth, strengthen follicles, and improve scalp health. This innovative procedure delivers a custom blend of vitamins, minerals, and growth factors directly into the scalp to revitalise weak hair, reduce hair loss, and promote thicker, healthier strands. At Face Weybridge, we offer expert Mesotherapy treatments tailored to your specific hair concerns, ensuring visible and long-lasting results.",
    image: "/face/18.jpg",
  },
  {
    id: "Laser",
    title: "Laser Hair Removal",
    description:
      "Say goodbye to the hassle of shaving, waxing, and plucking with Body Laser Hair Removal at Face Weybridge. Our advanced laser technology offers a long-lasting, safe, and effective solution for removing unwanted hair from various body areas. Whether you want to treat your legs, arms, underarms, back, or bikini area, our laser hair removal treatments provide permanent hair reduction, leaving your skin silky smooth and irritation-free.",
    image: "/face/19.jpg",
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
  PRP: {
    intro:
      "At Face Weybridge, we offer advanced PRP therapy tailored to your specific hair needs. Our skilled specialists use high-quality platelet concentration techniques to deliver maximum hair restoration benefits. With a personalised and results-driven approach, we ensure your treatment is safe, effective, and designed to help you regain thicker, healthier hair naturally.",
    understanding:
      "PRP (Platelet-Rich Plasma) therapy is a regenerative treatment that uses a patient’s own blood components—mainly platelets—to promote healing in various medical and cosmetic conditions. There are different types of PRP depending on how the blood is processed and what it's used for. The main types are Pure Platelet-Rich Plasma, Pure Platelet-Rich Fibrin, Leukocyte- and Platelet-Rich Fibrin and many more.",

    causes:
      "PRP (Platelet-Rich Plasma) is used as a treatment, not a disease. The main causes or conditions that lead people to seek PRP therapy include: Hair loss, Osteoarthritis, Aging skin, Delayed healing",
    types: [
      {
        heading: "Pure PRP (P-PRP)",
        text: "Low white blood cells, high platelets, used for hair restoration and skin rejuvenation.",
      },
      {
        heading: "Leukocyte-Rich PRP (L-PRP)",
        text: "Contains white blood cells and platelets, used for joint and tendon injuries.",
      },
      {
        heading: "Pure Platelet-Rich Fibrin (P-PRF)",
        text: "Platelets in a fibrin matrix, no white cells Used in wound healing and dental procedures",
      },
      {
        heading: "Leukocyte- and Platelet-Rich Fibrin (L-PRF)",
        text: "Platelets and white blood cells in a fibrin gel, Helps in oral surgery and bone regeneration",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, Platelet-Rich Plasma (PRP) therapy is used in several medical and cosmetic treatments. Here are the most common treatment options: Hair Restoration, Skin Rejuvenation (Vampire Facial), Joint and Tendon Repair, Wound Healing, Dental Application.",
  },
  Hair: {
    intro:
      "At Face Weybridge, we specialise in cutting-edge hair restoration treatments using the most advanced Polynucleotide Therapy for effective and long-lasting hair regrowth. Our highly skilled practitioners tailor each session to your specific hair needs, ensuring maximum follicle regeneration and hair health improvement. With a focus on scientific innovation and client satisfaction, we help you regain thicker, stronger, and healthier hair with confidence.",
    understanding:
      "Polynucleotides are DNA-derived molecules increasingly used in hair restoration treatments due to their regenerative and anti-inflammatory properties. Unlike PRP, which uses the patient’s blood, polynucleotides are often bioengineered from salmon DNA and work by stimulating cell repair, improving blood flow, and nourishing hair follicles.",

    causes:
      "Polynucleotides are used for hair to repair damaged follicles, stimulate new growth, and create a healthier scalp, especially for those experiencing thinning, balding, or post-treatment recovery.",
    types: [
      {
        heading: "Polynucleotide (PN)",
        text: "Basic form of polynucleotides, typically extracted from salmon DNA, Supports cell regeneration, hydration, and scalp health, Used in early-stage hair thinning or for scalp revitalization.",
      },
      {
        heading: "Polydeoxyribonucleotide (PDRN)",
        text: "A more biologically active form of PN, Has anti-inflammatory and tissue-repairing properties, Improves blood flow, repairs scalp micro-damage, and promotes hair regrowth.",
      },
      {
        heading: "Polynucleotide High Purification Technology (PN-HPT™)",
        text: "Highly purified and concentrated form of PN, Offers deeper cellular regeneration and longer-lasting effects, Preferred in advanced hair therapies and combination treatments (with PRP or microneedling).",
      },
    ],
    treatmentOptions:
      "Polynucleotides are used in non-surgical hair restoration therapies to repair damaged follicles, stimulate hair growth, and improve scalp health. Here are the main treatment options:  Scalp Injections, Microneedling + Polynucleotides, Combination Therapy with PRP or Exosomes and many more",
  },
  Hydrafacial: {
    intro:
      "At Face Weybridge, we specialise in advanced hair and scalp treatments that promote stronger, healthier hair. Our Hydrafacial Keravive therapy is tailored to your individual scalp needs, ensuring maximum hydration, cleansing, and follicle activation. With our expert team and cutting-edge technology, we help you achieve a revitalised scalp and fuller-looking hair with long-lasting benefits.",
    understanding:
      "HydraFacial Keravive is a specialized scalp treatment designed to cleanse, nourish, and hydrate the scalp—creating a healthier environment for natural hair growth. Unlike typical HydraFacial for skin, Keravive focuses entirely on scalp wellness. While there is only one standard Keravive protocol, it can be customized or paired with other treatments, creating different types or approaches depending on the individual’s needs. Though the core treatment is the same, HydraFacial Keravive can be tailored with PRP, microneedling, or used pre/post-transplant to suit individual scalp and hair restoration needs. It is non-invasive, relaxing, and safe for both men and women.",

    causes:
      "HydraFacial Keravive are most often used to address  the underlying causes by Dry or Flaky Scalp, Clogged Hair Follicles, Thinning Hair / Hair Loss, Poor Scalp Circulation and Postpartum / Post-Transplant.",
    types: [
      {
        heading: "Standard HydraFacial Keravive",
        text: "Core 3-step treatment: cleanse, nourish, and hydrate the scalp.",
      },
      {
        heading: "Keravive + PRP",
        text: "Combines with Platelet-Rich Plasma to enhance hair regrowth.",
      },
      {
        heading: "Keravive + Microneedling",
        text: "Adds microneedling for deeper serum penetration and follicle stimulation.",
      },
    ],
    treatmentOptions:
      "HydraFacial Keravive is a non-invasive scalp treatment designed to cleanse, nourish, and stimulate the scalp for healthier hair growth. Here are the main treatment options and how they are applied: In-Clinic HydraFacial Keravive, HydraFacial Keravive + PRP, HydraFacial Keravive + Microneedling, Pre/Post Hair Transplant Care, Peptide Spray.",
  },
  Exosomes: {
    intro:
      "At Face Weybridge, we are at the forefront of advanced hair restoration treatments, using the most innovative Exosome Therapy for maximum hair regrowth and follicle regeneration. Our skilled specialists tailor each treatment to your hair type and scalp needs, ensuring optimal, long-lasting results. With our commitment to scientific advancements and client satisfaction, we help you achieve fuller, thicker, and healthier hair with confidence.",
    understanding:
      "Exosomes are tiny extracellular vesicles (nano-sized messengers) released by cells that carry growth factors, proteins, and genetic material. In hair restoration, exosome therapy is an advanced, non-surgical treatment used to regenerate hair follicles, stimulate growth, and repair scalp damage—especially for people with thinning or early-stage hair loss. Different types of hair exosomes are defined by their cell source and formulation. The most effective are stem cell–derived, especially from umbilical cord or adipose tissue. They offer powerful, natural stimulation for hair regrowth and scalp repair, making them one of the most advanced options in modern hair restoration.",

    causes:
      "Hair exosomes are biological treatments  to address hair loss caused by genetics, inflammation, aging, stress, or medical conditions. Exosomes promote natural follicle regeneration, making them a powerful non-surgical option.",
    types: [
      {
        heading: "Mesenchymal Stem Cell–Derived Exosomes (MSC-Exosomes)",
        text: "Bone marrow, adipose tissue, or umbilical cord.",
      },
      {
        heading: " Adipose-Derived Stem Cell (ADSC) Exosomes",
        text: "Fat tissue (usually from liposuction)",
      },
      {
        heading: "Umbilical Cord-Derived Exosomes",
        text: "Wharton’s jelly or cord blood stem cells",
      },
    ],
    treatmentOptions:
      "Hair Exosomes treatments at Facey Clinic can be tailored with Exosome Scalp Injections ( Exosomes are injected directly into the scalp typically the areas of thinning or baldness), Usually performed by a dermatologist or trichologist, A topical numbing cream may be used, Injections are shallow and spread evenly across the scalp. Treatment Time: 30–60 minutes, Results: Visible within 3–6 months",
  },
  Mesotherapy: {
    intro:
      "At Face Weybridge, we are at the forefront of advanced hair restoration treatments, using the most innovative Exosome Therapy for maximum hair regrowth and follicle regeneration. Our skilled specialists tailor each treatment to your hair type and scalp needs, ensuring optimal, long-lasting results. With our commitment to scientific advancements and client satisfaction, we help you achieve fuller, thicker, and healthier hair with confidence.",
    understanding:
      "Mesotherapy is a non-surgical cosmetic procedure that involves injecting vitamins, enzymes, hormones, plant extracts, or medications into the mesoderm (middle layer of the skin). It's commonly used for hair restoration, skin rejuvenation, and fat reduction. The treatment type varies based on purpose and content of injection.",

    causes:
      "Mesotherapy is a cosmetic procedure for specific health or aesthetic reasons. Common causes include: Hair loss, Skin rejuvenation, Fat reduction, Cellulite treatment, Pain management.",
    types: [
      {
        heading: "Hair Mesotherapy",
        text: "Strengthens hair roots, improves blood flow, and stimulates regrowth.",
      },
      {
        heading: "Facial or Skin Rejuvenation Mesotherapy (Mesolift)",
        text: "Bright, firm, and youthful skin.",
      },
      {
        heading: "Body Contouring and Fat Reduction Mesotherapy",
        text: "Breaks down fat cells and improves circulation.",
      },
    ],
    treatmentOptions:
      "Mesotherapy can be customized depending on your needs—whether it’s for hair loss, skin rejuvenation, fat reduction, or pigmentation. The main treatment options: Hair Mesotherapy, Facial Mesotherapy (Mesolift), Body Contouring Mesotherapy, Cellulite Treatment, Pain Management Mesotherapy.",
  },
  Laser: {
    intro:
      "At Face Weybridge, we use state-of-the-art laser technology to provide safe, effective, and personalised treatments for long-lasting hair reduction. Our highly trained specialists ensure precision and comfort in every session, tailoring treatments to your skin type and hair growth pattern. With our expert approach and advanced equipment, you can achieve smooth, silky skin with confidence.",
    understanding:
      "Laser hair removal uses light energy to target and destroy hair follicles, reducing hair growth over time. The type of laser used matters greatly—it affects how well it works for your skin tone, hair type, and treatment area. Here are the main types of laser hair removal systems: Alexandrite Laser (755 nm), Diode Laser (800–810 nm), Nd:YAG Laser (1064 nm), Ruby Laser (694 nm), IPL (Intense Pulsed Light). Each type has its own wavelength and mechanism, making it suitable for different skin tones and hair types.",

    causes:
      "Laser Hair Removal is used to address unwanted hair growth caused by various factors, including hormonal imbalances, genetics, and lifestyle. It provides a long-term solution for those seeking to reduce or eliminate hair in areas such as the legs, arms, underarms, back, and bikini line.",
    types: [
      {
        heading: "Alexandrite Laser (755 nm)",
        text: "Fair to light skin tones (Fitzpatrick I–III), fast treatment, effective for fine to medium hair.",
      },
      {
        heading: "Diode Laser (800–810 nm)",
        text: "Suitable for all skin types (Fitzpatrick I–VI), effective for coarse hair, deeper penetration.",
      },
      {
        heading: "Ruby Laser (694 nm)",
        text: "Best for light skin tones (Fitzpatrick I–II), effective for fine hair, slower treatment speed.",
      },
    ],
    treatmentOptions:
      "Laser hair removal has become one of the most effective and popular methods for long-term hair reduction. Treatment options vary depending on your skin tone, hair type, budget, and desired convenience. Here are the main options: Full Body Laser Hair Removal, Partial Body Laser Hair Removal, Facial Laser Hair Removal, Underarm Laser Hair Removal, Bikini Line Laser Hair Removal.",
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
                    router.push(`/hair/${c.id}`);
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
