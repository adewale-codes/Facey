"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import AppointmentSection from "@/app/components/Appointment";
import LogoSlider from "@/app/components/LogoSlider";
import FaqSection from "../components/FaqSection";
import TestimonialsSection from "../components/TestimonialsSection";

interface Concern {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CONCERNS: Concern[] = [
  {
    id: "Iv",
    title: "Iv Drip",
    description:
      "Treat acne effectively with our specialised solutions. Achieve clearer skin through personalised care and advanced treatments at Facey Clinic.",
    image: "/concerns/1.jpg",
  },
  {
    id: "Vitamin",
    title: "Vitamin Injections",
    description:
      "Give your body the essential vitamins and nutrients it needs with our Vitamin Injections at Face Weybridge",
    image: "/concerns/2.jpg",
  },
  {
    id: "Body",
    title: "Body Massage",
    description:
      "Experience the ultimate relaxation and rejuvenation with our expert Body Massage treatments at Face Weybridge.",
    image: "/concerns/3.jpg",
  },
  {
    id: "Intimate",
    title: "Intimate Female Rejuvination",
    description:
      "At Face Weybridge, we understand that women’s intimate wellness is essential for overall health, confidence, and well-being.",
    image: "/concerns/4.jpg",
  },
  {
    id: "Forma",
    title: "Forma V",
    description:
      "Forma V is a cutting-edge non-surgical vaginal rejuvenation treatment designed to restore intimate health, enhance comfort, and improve confidence.",
    image: "/concerns/5.jpg",
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
  Iv: {
    intro:
      "IV drip therapy delivers fluids, electrolytes, medications or nutrition directly into the bloodstream via a sterile catheter—requiring precise flow rates, aseptic technique and regular site checks to ensure safe, effective hydration, drug delivery, nutrition support or transfusion.",
    understanding:
      "IV drips can be classified into five main types: crystalloids (e.g., normal saline, lactated Ringer’s) for rapid volume and electrolyte replacement; colloids (e.g., albumin) to expand plasma volume more sustainably; blood products (e.g., packed red cells, plasma, platelets) for anemia or coagulopathy; total parenteral nutrition (TPN) providing complete macronutrients and micronutrients when enteral feeding isn’t possible; and medication infusions (e.g., antibiotics, chemotherapy, vasopressors) administered at controlled rates for targeted therapy.",
    popularTreatments: [
      {
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
      },
    ],
    causes:
      "IV drips are initiated whenever a patient cannot meet fluid, electrolyte or medication needs by mouth—most commonly due to dehydration from vomiting or diarrhea, acute blood loss or shock, severe burns, sepsis, or profound hypotension—and to administer therapies (antibiotics, chemotherapy, vasopressors) or nutrition (TPN) when enteral routes are unavailable or impractical.",
    types: [
      {
        heading: "Crystalloids",
        text: "Clear, water-based solutions (e.g., normal saline, lactated Ringer’s) used for rapid volume replacement and electrolyte balance.",
      },
      {
        heading: "Colloids",
        text: "Protein or starch-based solutions (e.g., albumin, hetastarch) that remain in the vascular space longer to expand plasma volume.",
      },
      {
        heading: "Blood Products",
        text: "Cellular or plasma components (e.g., packed red blood cells, plasma, platelets) administered to treat anemia, coagulopathy, or massive blood loss.",
      },
    ],
    treatmentOptions:
      "IV drip therapy can be used for: rapid fluid resuscitation (e.g., normal saline or lactated Ringer’s for dehydration or hypovolemia); colloid administration (e.g., albumin) to maintain oncotic pressure; targeted medication infusions (e.g., antibiotics, chemotherapeutics, vasopressors) at controlled rates; electrolyte replacement (e.g., potassium, magnesium) to correct imbalances; parenteral nutrition (TPN) when enteral feeding isn’t feasible; and blood or blood‐product transfusions (packed red cells, plasma, platelets) for anemia, coagulopathy, or acute blood loss.",
  },
  Vitamin: {
    intro:
      "Vitamin injections (IM or IV) deliver water-soluble (B-complex, C) or fat-soluble (A, D, E, K) vitamins directly into muscle or bloodstream to rapidly correct deficiencies when oral absorption is impaired. Proper aseptic technique, accurate dosing, site rotation, and monitoring for injection-site reactions or allergic responses are essential for safe, effective therapy.",
    understanding:
      "Vitamin injections are delivered via three main routes—intramuscular (IM) for reliable depot storage of water- and fat-soluble vitamins (e.g., B₁₂, D), intravenous (IV) for rapid high-dose correction or complex multivitamin infusions (as in TPN), and subcutaneous (SC), which is less common but useful for slow, steady release in small-volume preparations. Each route is chosen based on the urgency of repletion, patient tolerance, and absorption considerations.",
    popularTreatments: [
      {
        title: "Microneedling",
        image: "/concerns/a.webp",
        href: "/treatment/microneedling",
      },
      {
        title: "Neogen Plasma",
        image: "/concerns/b.webp",
        href: "/treatment/neogen-plasma",
      },
      {
        title: "Obagi Blue Radiance",
        image: "/concerns/c.webp",
        href: "/treatment/obagi-blue-radiance",
      },
      {
        title: "Mesotherapy",
        image: "/concerns/d.webp",
        href: "/treatment/mesotherapy",
      },
      {
        title: "Hydrafacial Back",
        image: "/concerns/e.webp",
        href: "/treatment/hydrafacial-full-back",
      },
    ],
    causes:
      "Vitamin injections are indicated when rapid or reliable repletion is needed and oral absorption is inadequate—most commonly for vitamin B₁₂ in pernicious anemia or malabsorptive disorders, vitamin D in severe deficiency or osteomalacia, and vitamin K prophylaxis in newborns or coagulopathic patients; they’re also used in chronic alcoholism, post-bariatric surgery, inflammatory bowel disease, or any condition impairing GI uptake to ensure prompt, sufficient correction.",
    types: [
      {
        heading: "Intramuscular (IM)",
        text: "Injections delivered into muscle tissue, creating a depot for slow, sustained vitamin release (commonly used for B₁₂ and D).",
      },
      {
        heading: "Intravenous (IV)",
        text: "Direct delivery into the bloodstream for immediate, high-dose repletion or complex multivitamin infusions (as in TPN).",
      },
      {
        heading: "Subcutaneous (SC)",
        text: "Small-volume injections under the skin for gradual absorption, useful when muscle or vein access is limited.",
      },
    ],
    treatmentOptions:
      "Vitamin injections most commonly include B₁₂ (administered IM weekly or monthly for pernicious anemia or malabsorption), D (IM single high‐dose bolus for severe deficiency or osteomalacia), K (IM or slow IV for newborn prophylaxis or warfarin reversal), multivitamin infusions (IV admixture in TPN when enteral feeding is impossible), and C (IV high‐dose for scurvy or select critical‐care protocols), with route and dosing tailored to the urgency of repletion, patient tolerance, and underlying absorption issues.",
  },
  Body: {
    intro:
      "At Facey Clinic, body-massage treatments are delivered by licensed therapists within our physical-therapy and pain-management services, and include Swedish massage to enhance relaxation and circulation, deep-tissue work to release chronic muscle tension, sports massage for injury prevention and recovery, myofascial-release techniques to improve soft-tissue mobility, and manual lymphatic drainage to reduce swelling and support healing.",
    understanding:
      "Body massage encompasses a range of techniques tailored to different goals: Swedish massage uses long, gliding strokes and kneading for general relaxation and improved circulation; deep-tissue massage applies firmer pressure to release chronic muscle tension; sports massage combines stretching and targeted work to prevent or treat athletic injuries; myofascial release focuses on easing connective-tissue restrictions for better mobility; manual lymphatic drainage employs light, rhythmic strokes to reduce swelling and detoxify; and hot-stone massage integrates warmed stones to relax tight muscles and enhance therapeutic warmth.",
    popularTreatments: [
      {
        title: "Microneedling",
        image: "/concerns/a.webp",
        href: "/treatment/microneedling",
      },
      {
        title: "Neogen Plasma",
        image: "/concerns/b.webp",
        href: "/treatment/neogen-plasma",
      },
      {
        title: "Obagi Blue Radiance",
        image: "/concerns/c.webp",
        href: "/treatment/obagi-blue-radiance",
      },
      {
        title: "Mesotherapy",
        image: "/concerns/d.webp",
        href: "/treatment/mesotherapy",
      },
      {
        title: "Hydrafacial Back",
        image: "/concerns/e.webp",
        href: "/treatment/hydrafacial-full-back",
      },
    ],
    causes:
      "Body massage is most often sought to relieve muscle tension and pain (from overuse, poor posture, or injury), reduce stress and anxiety by lowering cortisol and boosting relaxation, improve circulation and lymphatic flow for faster recovery and toxin clearance, enhance flexibility and joint mobility, and support overall well-being by promoting endorphin release and better sleep.",
    types: [
      {
        heading: "Swedish Massage (SM)",
        text: "Uses long, gliding strokes, kneading, and circular movements to promote overall relaxation, improve circulation, and ease light muscle tension.",
      },
      {
        heading: "Deep-Tissue Massage (DTM)",
        text: "Applies sustained, firm pressure and slow strokes to target deeper layers of muscle and connective tissue, ideal for releasing chronic knots and relieving severe tension.",
      },
      {
        heading: "Sports Massage (SPM)",
        text: "Combines targeted stretching, compression, and trigger-point techniques to enhance athletic performance, prevent injury, and speed recovery in active individuals.",
      },
    ],
    treatmentOptions:
      "Body massage treatments range from Swedish massage, which uses long, flowing strokes and kneading to promote relaxation and boost circulation, to deep-tissue massage, applying firm, focused pressure to release chronic knots and alleviate persistent muscle pain, and hot-stone massage, where gently heated stones are placed on key areas and used to warm and relax tissues for enhanced flexibility and stress relief.",
  },
  Intimate: {
    intro:
      "At Facey Clinic, intimate female rejuvenation combines both surgical and non-surgical options—ranging from fractional CO₂ laser and radiofrequency vaginal tightening to platelet-rich plasma (PRP) injections for collagen stimulation and labiaplasty for labial reshaping—all delivered in a discreet, supportive setting with personalized protocols and minimal downtime to restore function, comfort, and confidence.",
    understanding:
      "Intimate female rejuvenation methods include non-ablative and ablative laser therapies (e.g., fractional CO₂ or erbium lasers) and radiofrequency treatments to tighten vaginal tissues and improve mucosal health, injectable biologics such as platelet-rich plasma (PRP) or hyaluronic acid fillers to boost collagen and enhance vulvar fullness, and surgical procedures like labiaplasty, vaginoplasty, or clitoral hood reduction for permanent reshaping and functional restoration—each tailored to address personal goals around comfort, aesthetics, and sexual wellness.",
    popularTreatments: [
      {
        title: "Microneedling",
        image: "/concerns/a.webp",
        href: "/treatment/microneedling",
      },
      {
        title: "Neogen Plasma",
        image: "/concerns/b.webp",
        href: "/treatment/neogen-plasma",
      },
      {
        title: "Obagi Blue Radiance",
        image: "/concerns/c.webp",
        href: "/treatment/obagi-blue-radiance",
      },
      {
        title: "Mesotherapy",
        image: "/concerns/d.webp",
        href: "/treatment/mesotherapy",
      },
      {
        title: "Hydrafacial Back",
        image: "/concerns/e.webp",
        href: "/treatment/hydrafacial-full-back",
      },
    ],
    causes:
      "Intimate female rejuvenation is most often sought to address vaginal laxity and pelvic floor weakness following childbirth or aging, manage stress urinary incontinence or vaginal dryness due to menopause or hormonal changes, relieve discomfort or pain during intercourse (dyspareunia), correct scarring from prior surgery or trauma, and improve aesthetic concerns or self-confidence in the genital area.",
    types: [
      {
        heading: "Energy-Based Therapies",
        text: "Non-invasive laser (e.g., fractional CO₂, erbium) and radiofrequency treatments that heat vaginal tissues to stimulate collagen, tighten the canal, and improve mucosal health.",
      },
      {
        heading: "Injectable Biologics & Fillers",
        text: "Autologous platelet-rich plasma (PRP) or hyaluronic acid fillers administered into the vaginal wall or labia to boost collagen, restore volume, enhance lubrication, and increase sensitivity.",
      },
      {
        heading: "Surgical Procedures",
        text: "Operative interventions such as labiaplasty, vaginoplasty, clitoral hood reduction, or perineoplasty for permanent reshaping, tightening, and functional restoration of the female genital anatomy.",
      },
    ],
    treatmentOptions:
      "Intimate female rejuvenation at Facey Clinic may include minimally invasive energy-based therapies—such as fractional CO₂ laser or radiofrequency vaginal tightening—to stimulate collagen, improve elasticity, and reduce dryness; injectable biologics like platelet-rich plasma or hyaluronic acid fillers to restore volume, enhance lubrication, and boost sensitivity; and, when indicated, surgical options such as labiaplasty or vaginoplasty for permanent reshaping and functional support—all personalized to each patient’s anatomy, goals, and recovery preferences.",
  },
  Forma: {
    intro:
      "At Facey Clinic, Forma V treatments use a gentle, temperature-controlled radiofrequency applicator to heat and remodel vaginal and vulvar tissues, stimulating new collagen and elastin for tighter, more lubricated, and more responsive intimate anatomy; sessions are quick (about 20 minutes), virtually painless, require no anesthesia or downtime, and are typically delivered in a series of three to four weekly visits for optimal long-term results.",
    understanding:
      "Forma V is delivered via three protocols: the internal applicator, which heats the vaginal canal to boost collagen and moisture; the external applicator, which tightens and tones the vulvar and perineal skin; and the combined approach, using both devices in one session for comprehensive intravaginal and external tissue remodeling.",
    popularTreatments: [
      {
        title: "Microneedling",
        image: "/concerns/a.webp",
        href: "/treatment/microneedling",
      },
      {
        title: "Neogen Plasma",
        image: "/concerns/b.webp",
        href: "/treatment/neogen-plasma",
      },
      {
        title: "Obagi Blue Radiance",
        image: "/concerns/c.webp",
        href: "/treatment/obagi-blue-radiance",
      },
      {
        title: "Mesotherapy",
        image: "/concerns/d.webp",
        href: "/treatment/mesotherapy",
      },
      {
        title: "Hydrafacial Back",
        image: "/concerns/e.webp",
        href: "/treatment/hydrafacial-full-back",
      },
    ],
    causes:
      "Forma V is most often used to treat mild to moderate vaginal laxity and atrophy following childbirth or aging, vaginal dryness and discomfort due to menopause or hormonal changes, dyspareunia (pain during intercourse), mild stress urinary incontinence, and loss of external tissue tone in the vulvar and perineal regions.",
    types: [
      {
        heading: "Internal RF Therapy",
        text: "Uses the Forma V intracavitary applicator to deliver controlled radiofrequency energy deep into the vaginal canal, stimulating collagen and elastin production for enhanced tightness, lubrication, and mucosal health.",
      },
      {
        heading: "External RF Therapy",
        text: "Employs the surface applicator over the vulvar and perineal skin to remodel superficial collagen, improve tissue tone, and smooth external contours.",
      },
      {
        heading: "Combined Protocol",
        text: "Integrates both internal and external applicators in a single session for full-spectrum vaginal tightening and vulvar rejuvenation, maximizing collagen remodeling both intravaginally and externally.",
      },
    ],
    treatmentOptions:
      "Forma V treatments at Facey Clinic are offered as three customizable protocols—internal RF, external RF, or a combined approach—delivered in a series of three to four weekly 20-minute sessions. Using the intracavitary applicator heats the vaginal canal to boost collagen and moisture, while the surface applicator gently remodels vulvar and perineal tissues for improved tone. Sessions require no anesthesia or downtime, with gradual tightening, enhanced lubrication, and restored tissue elasticity emerging over subsequent weeks.",
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
                    router.push(`/wellness/${c.id}`);
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
            <h3 className="text-2xl font-serif text-green-800 mb-4">
              Popular Treatments
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
