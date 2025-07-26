"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import LogoSlider from "@/app/components/LogoSlider";
import AppointmentSection from "@/app/components/Appointment";
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
    id: "Empower",
    title: "Empower RF",
    description:
      "EmpowerRF is a cutting-edge, non-surgical platform developed by InMode that uses radiofrequency (RF) and electrical muscle stimulation (EMS) technologies for women’s wellness, aesthetic rejuvenation, and pelvic health. It’s especially popular in gynecology and cosmetic clinics for its ability to treat a variety of feminine concerns with little to no downtime.",
    image: "/face/16.jpg",
  },
  {
    id: "Forma",
    title: "Forma V",
    description:
      "Forma V is a cutting-edge non-surgical vaginal rejuvenation treatment designed to restore intimate health, enhance comfort, and improve confidence. Using radiofrequency (RF) energy, this innovative procedure stimulates collagen production, improves elasticity, and increases circulation, helping women address vaginal laxity, dryness, and overall intimate wellness. At Face Weybridge, we offer Forma V as a safe, effective, and minimally invasive solution to help you feel rejuvenated and confident in your body.",
    image: "/face/23.jpg",
  },
  {
    id: "Intimate",
    title: "Intimate Fillers",
    description:
      "Intimate fillers are a revolutionary non-surgical treatment designed to enhance the appearance and comfort of the intimate area. At Face Weybridge, we use advanced dermal fillers to restore volume, improve contour, and rejuvenate the vulvar region. This procedure can help address concerns such as labial asymmetry, loss of volume due to ageing or childbirth, and overall aesthetic enhancement. With our expert team, you can achieve a more youthful and confident appearance in your intimate area.",
    image: "/face/23.jpg",
  },
  {
    id: "Intimates",
    title: "Intimate Polynucleotides",
    description:
      "Intimate Polynucleotides are specialized injectable treatments derived from purified DNA fragments (often salmon DNA) used to regenerate and rejuvenate delicate skin in intimate areas. They are part of the biostimulation and regenerative aesthetic medicine field and are gaining popularity for non-invasive vaginal and penile rejuvenation.",
    image: "/face/19.jpg",
  },
  {
    id: "IntimatePRP",
    title: "Intimate PRP",
    description:
      "Intimate PRP (Platelet-Rich Plasma) refers to a non-surgical, regenerative treatment that uses a patient’s own blood to rejuvenate and improve the health of intimate areas. It is widely used in aesthetic gynecology and sexual wellness for both men and women.",
    image: "/face/19.jpg",
  },
  {
    id: "IntimateWhitening",
    title: "Intimate Whitening",
    description:
      "Intimate whitening is a cosmetic procedure designed to lighten the skin in the intimate areas, such as the vulva and perianal region. This treatment is often sought by individuals looking to enhance their confidence and improve the appearance of their intimate areas. At Face Weybridge, we offer safe and effective intimate whitening solutions tailored to your specific needs.",
    image: "/face/19.jpg",
  },
  {
    id: "Morpheus",
    title: "Morpheus V",
    description:
      "Morpheus V is a non-surgical treatment that combines microneedling with radiofrequency energy to rejuvenate and tighten vaginal tissue. It is designed to improve vaginal laxity, dryness, and overall intimate wellness by stimulating collagen production and enhancing skin elasticity. This innovative procedure is minimally invasive, with little to no downtime, making it a popular",
    image: "/face/19.jpg",
  },
  {
    id: "OShot",
    title: "O Shot Viginal",
    description:
      "The O-Shot, or Orgasm Shot, is a non-surgical treatment that uses Platelet-Rich Plasma (PRP) to enhance sexual pleasure and orgasm intensity. It involves injecting PRP into the vaginal area to improve blood flow, sensitivity, and overall sexual function. This innovative procedure is designed to rejuvenate the vaginal tissue, increase lubrication, and enhance sexual satisfaction.",
    image: "/face/23.jpg",
  },
  {
    id: "VTone",
    title: "V Tone",
    description:
      "VTone is a non-surgical treatment under the EmpowerRF platform by InMode, designed to strengthen the pelvic floor muscles and restore vaginal tone using electrical muscle stimulation (EMS). It is particularly",
    image: "/face/23.jpg",
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
  Empower: {
    intro:
      "At Face Weybridge, we offer the latest Empower RF treatments, designed to enhance your wellness and aesthetic goals. Our experienced practitioners utilise this advanced technology to provide personalised care, ensuring you receive the best possible results in a comfortable and professional environment.",
    understanding:
      "Empower RF is a state-of-the-art, non-surgical platform that combines radiofrequency (RF) and electrical muscle stimulation (EMS) technologies. It is specifically designed for women’s wellness, aesthetic rejuvenation, and pelvic health. Empower RF treatments are particularly effective for addressing concerns such as vaginal laxity, urinary incontinence, and overall pelvic floor health. The procedure is minimally invasive, with little to no downtime, making it a popular",

    causes:
      "Empower RF is used to address various concerns, including: Vaginal laxity and dryness, Urinary incontinence, Pelvic floor dysfunction, Sexual wellness and satisfaction, Body contouring and skin tightening. It",
    types: [
      {
        heading: "Morpheus8V",
        text: "A non-surgical treatment that combines microneedling with radiofrequency energy, Targets vaginal laxity and dryness, Stimulates collagen production for improved elasticity and hydration.",
      },
      {
        heading: "FormaV",
        text: "A non-invasive RF treatment that tightens and rejuvenates vaginal tissue, Improves blood flow and elasticity, Enhances overall vaginal health and function.",
      },
      {
        heading: "VTone",
        text: "A non-surgical electrical muscle stimulation treatment, Strengthens pelvic floor muscles, Improves urinary incontinence and sexual function, Enhances overall pelvic health.",
      },
    ],

    treatmentOptions:
      "Empower RF treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Empower RF Treatment, Targeted Empower RF for Vaginal Rejuvenation, Empower RF for Pelvic Floor Strengthening, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive wellness and rejuvenation for optimal results.",
  },

  Forma: {
    intro:
      "At Face Weybridge, we prioritise comfort, discretion, and expert care, ensuring every Forma V treatment is tailored to your unique needs. Our highly trained professionals use the latest RF technology to provide a safe, effective, and painless solution for intimate wellness. With our welcoming and confidential environment, you can feel empowered, confident, and rejuvenated.",
    understanding:
      "Forma V is a non-surgical vaginal rejuvenation treatment that uses radiofrequency (RF) energy to stimulate collagen production, improve tissue elasticity, and enhance overall vaginal health. This innovative procedure is designed to address concerns such as vaginal laxity, dryness, and discomfort, providing",

    causes:
      "Forma V is used to address various intimate health concerns, including: Vaginal laxity and dryness, Decreased sexual satisfaction, Urinary incontinence, Pelvic floor dysfunction, Overall vaginal health and wellness",
    types: [
      {
        heading: "Internal Vaginal Rejuvenation",
        text: "mproves vaginal laxity (tightening) Enhances moisture and lubrication Increases blood flow and nerve sensitivity Supports tissue remodeling post-childbirth or menopause",
      },
      {
        heading: " Combination Therapy (With Other EmpowerRF Modalities)",
        text: "Combines Forma V with other EmpowerRF treatments for comprehensive vaginal rejuvenation, Addresses multiple concerns simultaneously, Enhances overall intimate wellness and satisfaction.",
      },
      {
        heading: " External Vulvar Rejuvenation",
        text: "Targets the external vaginal area to improve skin texture and appearance, Reduces pigmentation and enhances overall vulvar health.",
      },
    ],

    treatmentOptions:
      "Forma V treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Forma V Treatment, Targeted Forma V for Vaginal Rejuvenation, Forma V for Pelvic Floor Strengthening, Combination Treatments (with other EmpowerRF modalities), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate wellness and rejuvenation for optimal results.",
  },
  Intimate: {
    intro:
      "At Face Weybridge, we offer advanced Intimate Fillers designed to enhance the appearance and comfort of the intimate area. Our expert team uses high-quality dermal fillers to restore volume, improve contour, and rejuvenate the vulvar region, helping you achieve a more youthful and confident appearance in your intimate area.",
    understanding:
      "Intimate fillers are a non-surgical treatment that uses advanced dermal fillers to enhance the appearance of the vulvar region. This procedure can help address concerns such as labial asymmetry, loss of volume due to ageing or childbirth, and overall aesthetic enhancement. The fillers are injected into specific areas to restore volume, improve contour, and rejuvenate the intimate area, providing a more youthful and confident appearance.",

    causes:
      "Intimate fillers are used to address various concerns, including: Labial asymmetry, Loss of volume due to ageing or childbirth, Desire for aesthetic enhancement, Improvement of overall vulvar appearance, Restoration of confidence and comfort in intimate areas.",
    types: [
      {
        heading: "Hyaluronic Acid (HA) Fillers",
        text: "The most common type of filler used for intimate areas, Provides natural-looking volume and hydration, Safe and reversible with hyaluronidase if needed.",
      },
      {
        heading: "Collagen-Stimulating Fillers",
        text: "Stimulates collagen production for longer-lasting results, Ideal for individuals seeking more permanent enhancement, Provides gradual improvement over time.",
      },
      {
        heading: "Platelet-Rich Plasma (PRP) / PRF (Fibrin)",
        text: "Uses your body’s own growth factors to rejuvenate the intimate area, Enhances skin texture and elasticity, Ideal for individuals looking for a natural approach to intimate rejuvenation.",
      },
    ],

    treatmentOptions:
      "Intimate filler treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Vulvar Rejuvenation, Targeted Labial Enhancement, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate rejuvenation for a youthful, confident appearance.",
  },
  Intimates: {
    intro:
      "At Face Weybridge, we offer advanced Intimate Polynucleotides treatments designed to rejuvenate and regenerate delicate skin in intimate areas. Our expert team uses high-quality polynucleotide injections to enhance skin elasticity, hydration, and overall appearance, helping you achieve a more youthful and confident intimate area.",
    understanding:
      "Intimate Polynucleotides are specialized injectable treatments derived from purified DNA fragments (often salmon DNA) used to regenerate and rejuvenate delicate skin in intimate areas. These treatments are part of the biostimulation and regenerative aesthetic medicine field, gaining popularity for non-invasive vaginal and penile rejuvenation. The injections stimulate collagen production, improve skin elasticity, and enhance hydration, providing a more youthful and revitalised appearance.",

    causes:
      "Intimate Polynucleotides are used to address various concerns, including: Vaginal laxity and dryness, Decreased skin elasticity, Loss of hydration in intimate areas, Desire for aesthetic enhancement, Overall intimate rejuvenation and wellness.",
    types: [
      {
        heading: "Standard Polynucleotides ",
        text: "Contains a high concentration of DNA fragments, Ideal for general skin rejuvenation and hydration, Provides immediate and long-lasting results.",
      },
      {
        heading: "Polynucleotide-HP (High Purity / High Performance)",
        text: "Contains a higher concentration of active ingredients, Enhances skin elasticity and hydration, Suitable for more advanced rejuvenation needs.",
      },
      {
        heading: "Polynucleotide-Hyaluronic Acid Technology",
        text: "Combines polynucleotides with hyaluronic acid for enhanced hydration, Provides a synergistic effect for improved skin texture and elasticity, Ideal for individuals seeking comprehensive intimate rejuvenation.",
      },
    ],

    treatmentOptions:
      "Intimate Polynucleotide treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Intimate Polynucleotide Treatment, Targeted Polynucleotide Injections for Specific Areas, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate rejuvenation for a youthful, confident appearance.",
  },
  IntimatePRP: {
    intro:
      "At Face Weybridge, we offer advanced Intimate PRP treatments designed to rejuvenate and regenerate delicate skin in intimate areas. Our expert team uses high-quality PRP injections to enhance skin elasticity, hydration, and overall appearance, helping you achieve a more youthful and confident intimate area.",
    understanding:
      "Intimate PRP (Platelet-Rich Plasma) is a non-surgical, regenerative treatment that uses a patient’s own blood to rejuvenate and improve the health of intimate areas. It is widely used in aesthetic gynecology and sexual wellness",

    causes:
      "Intimate PRP is used to address various concerns, including: Vaginal laxity and dryness, Decreased skin elasticity, Loss of hydration in intimate areas, Desire for aesthetic enhancement, Overall intimate rejuvenation and wellness.",
    types: [
      {
        heading: "Orgasm Shot (O-Shot)",
        text: "A non-surgical treatment that uses PRP to enhance sexual pleasure and orgasm intensity, Improves blood flow and sensitivity in the vaginal area, Ideal",
      },
      {
        heading: "Vaginal PRP Rejuvenation)",
        text: "A non-surgical treatment that uses PRP to rejuvenate vaginal tissue, Improves skin texture and elasticity, Enhances overall vaginal health and function.",
      },
      {
        heading: "Labial PRP Rejuvenation",
        text: "A non-surgical treatment that uses PRP to rejuvenate the labial area, Improves skin texture and hydration, Enhances overall vulvar health and appearance.",
      },
    ],

    treatmentOptions:
      "Intimate PRP treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Intimate PRP Treatment, Targeted PRP Injections for Specific Areas, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate rejuvenation for a youthful, confident appearance.",
  },
  IntimateWhitening: {
    intro:
      "At Face Weybridge, we offer advanced Intimate Whitening treatments designed to lighten and enhance the appearance of intimate areas. Our expert team uses safe and effective techniques to achieve a more uniform skin tone, helping you feel more confident and comfortable in your intimate area.",
    understanding:
      "Intimate whitening is a cosmetic procedure designed to lighten the skin in intimate areas, such as the vulva and perianal region. This treatment is often sought by individuals looking to enhance their confidence and improve the appearance of their intimate areas. At Face Weybridge, we offer safe and effective intimate whitening solutions tailored to your specific needs.",

    causes:
      "Intimate whitening is used to address various concerns, including: Darkened skin in intimate areas, Uneven skin tone, Desire for aesthetic enhancement, Overall intimate rejuvenation and wellness.",
    types: [
      {
        heading: "Topical Creams & Serums",
        text: "Contains active ingredients that lighten the skin, Applied directly to the intimate area, Safe and effective for gradual results.",
      },
      {
        heading: "Chemical Peels (Intimate Peels)",
        text: "Uses a chemical solution to exfoliate and lighten the skin, Improves skin texture and tone, Suitable for individuals seeking more significant results.",
      },
      {
        heading: "Laser Whitening Treatments",
        text: "Uses laser technology to target and lighten darkened skin, Provides quick and effective results, Ideal for individuals looking for a more advanced solution.",
      },
    ],

    treatmentOptions:
      "Intimate whitening treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Intimate Whitening Treatment, Targeted Whitening for Specific Areas, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate rejuvenation for a youthful, confident appearance.",
  },
  Morpheus: {
    intro:
      "At Face Weybridge, we offer Morpheus V, a cutting-edge non-surgical treatment that combines microneedling with radiofrequency energy to rejuvenate and tighten vaginal tissue. This innovative procedure is designed to improve vaginal laxity, dryness, and overall intimate wellness by stimulating collagen production and enhancing skin elasticity. With little to no downtime, Morpheus V is a popular choice for those seeking effective and non-invasive intimate rejuvenation.",
    understanding:
      "Morpheus V is a non-surgical treatment that uses a combination of microneedling and radiofrequency (RF) energy to rejuvenate and tighten vaginal tissue. This innovative procedure is designed to improve vaginal laxity, dryness, and overall intimate wellness by stimulating collagen production and enhancing skin elasticity. Morpheus V is minimally invasive, with little to no downtime, making it a popular choice for those seeking effective and non-invasive intimate rejuvenation.",

    causes:
      "Morpheus V is used to address various intimate health concerns, including: Vaginal laxity and dryness, Decreased sexual satisfaction, Urinary incontinence, Pelvic floor dysfunction, Overall vaginal health and wellness.",
    types: [
      {
        heading: " Internal Morpheus V Treatment",
        text: "Targets vaginal laxity and dryness, Stimulates collagen production for improved elasticity and hydration, Enhances overall vaginal health and function.",
      },
      {
        heading: "External Morpheus V Treatment",
        text: "Targets the external vaginal area to improve skin texture and appearance, Reduces pigmentation and enhances overall vulvar health, Provides a more youthful and rejuvenated appearance.",
      },
      {
        heading: "Combination (Internal + External) Morpheus V",
        text: "Combines internal and external treatments for comprehensive vaginal rejuvenation, Addresses multiple concerns simultaneously, Enhances overall intimate wellness and satisfaction.",
      },
    ],

    treatmentOptions:
      "Morpheus V treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full Morpheus V Treatment, Targeted Morpheus V for Vaginal Rejuvenation, Combination Treatments (with other EmpowerRF modalities), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate wellness and rejuvenation for optimal results.",
  },
  OShot: {
    intro:
      "At Face Weybridge, we offer the O-Shot, a revolutionary non-surgical treatment designed to enhance sexual pleasure and orgasm intensity. Using Platelet-Rich Plasma (PRP), this innovative procedure rejuvenates the vaginal tissue, improves blood flow, and increases sensitivity, helping you achieve a more satisfying and fulfilling sexual experience.",
    understanding:
      "The O-Shot, or Orgasm Shot, is a non-surgical treatment that uses Platelet-Rich Plasma (PRP) to enhance sexual pleasure and orgasm intensity. It involves injecting PRP into the vaginal area to improve blood flow, sensitivity, and overall sexual function. This innovative procedure is designed to rejuvenate the vaginal tissue, increase lubrication, and enhance sexual satisfaction. The O-Shot is minimally invasive, with little to no downtime, making it a popular choice for those seeking effective and non-invasive intimate rejuvenation.",

    causes:
      "The O-Shot is used to address various intimate health concerns, including: Decreased sexual satisfaction, Difficulty achieving orgasm, Vaginal dryness and discomfort, Loss of sensitivity in the vaginal area, Overall intimate rejuvenation and wellness.",
    types: [
      {
        heading: " Classic O-Shot",
        text: "Uses PRP to enhance sexual pleasure and orgasm intensity, Improves blood flow and sensitivity in the vaginal area, Ideal for individuals seeking a non-surgical solution for sexual wellness.",
      },
      {
        heading: "O-Shot® for Stress Urinary Incontinence (SUI)",
        text: "Uses PRP to improve urinary incontinence symptoms, Enhances vaginal tissue health and function, Provides a dual benefit of sexual wellness and urinary health.",
      },
      {
        heading: "O-Shot® with Clitoral Rejuvenation Focus",
        text: "Targets the clitoral area to enhance sensitivity and pleasure, Improves overall sexual function and satisfaction, Ideal for individuals seeking a more targeted approach to intimate rejuvenation.",
      },
    ],

    treatmentOptions:
      "O-Shot treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full O-Shot Treatment, Targeted O-Shot for Specific Areas, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate rejuvenation for a youthful, confident appearance.",
  },
  VTone: {
    intro:
      "At Face Weybridge, we offer VTone, a non-surgical treatment designed to strengthen the pelvic floor muscles and restore vaginal tone using electrical muscle stimulation (EMS). This innovative procedure is particularly effective for addressing urinary incontinence and enhancing overall pelvic health, helping you regain confidence and comfort in your intimate wellness.",
    understanding:
      "VTone is a non-surgical treatment that uses electrical muscle stimulation (EMS) to strengthen the pelvic floor muscles and restore vaginal tone. It is particularly effective for addressing urinary incontinence, improving sexual function, and enhancing overall pelvic health. VTone treatments are painless, require no downtime, and can be customised to meet your specific needs and goals.",

    causes:
      "VTone is used to address various intimate health concerns, including: Weak pelvic floor muscles, Urinary incontinence, Decreased sexual satisfaction, Pelvic floor dysfunction, Overall pelvic health and wellness.",
    types: [
      {
        heading: "Standard Pelvic Floor Strengthening (Core VTone Treatment)",
        text: "Targets the pelvic floor muscles to improve strength and tone, Enhances urinary control and sexual function, Ideal for individuals seeking a non-surgical solution for pelvic health.",
      },
      {
        heading: "VTone for Stress Urinary Incontinence (SUI)",
        text: "Specifically designed to address stress urinary incontinence, Strengthens pelvic floor muscles to reduce leakage, Provides a dual benefit of pelvic health and sexual wellness.",
      },
      {
        heading: "VTone for Urge Incontinence",
        text: "Targets the pelvic floor muscles to improve urge control, Enhances bladder function and reduces urgency, Ideal for individuals seeking a non-surgical solution for urge incontinence.",
      },
    ],

    treatmentOptions:
      "VTone treatments at Face Weybridge can be customised based on your specific concerns and desired outcomes. Here are the main treatment options: Full VTone Treatment, Targeted VTone for Specific Areas, Combination Treatments (with other aesthetic therapies), Maintenance Treatments (every 6–12 months). Each option is designed to provide comprehensive intimate wellness and rejuvenation for optimal results.",
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
                    router.push(`/intimate/${c.id}`);
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
