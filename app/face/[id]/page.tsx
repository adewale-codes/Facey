"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import AppointmentSection from "@/app/components/Appointment";
import LogoSlider from "@/app/components/LogoSlider";
import FaqSection from "../components/FaqSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PopularTreatment from "../components/PopularTreatment";

interface Concern {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CONCERNS: Concern[] = [
  {
    id: "Facial",
    title: "Facial Skin Analysis",
    description:
      "Unlock the secrets to your best skin with our Facial Skin Analysis.",
    image: "/face/1.jpg",
  },
  {
    id: "Botox",
    title: "Botox Injectables",
    description:
      "Reveal your natural beauty with the power of Botox. At Face Weybridge, our Botox Injectable treatments are designed to reduce the appearance of fine lines and wrinkles, leaving you with a refreshed and youthful look.",
    image: "/face/2.jpg",
  },
  {
    id: "Dermal",
    title: "Dermal Fillers",
    description:
      "Rediscover your youthful appearance with Dermal Fillers, a non-surgical solution to restore volume, enhance contours, and smooth out fine lines and wrinkles.",
    image: "/face/3.jpg",
  },
  {
    id: "Dermaforce",
    title: "Dermaforce RF (aka Morpheus8)",
    description:
      "Achieve transformative results with Dermaforce RF (also known as Morpheus8), a groundbreaking skin rejuvenation treatment available at Face Weybridge.",
    image: "/face/5.jpg",
  },
  {
    id: "Hydrafacial",
    title: "Hydrafacial – The Ultimate Skin Refresh",
    description:
      "Transform your skin with the Hydrafacial, an advanced multi-step facial designed to deeply cleanse, exfoliate, extract impurities, and hydrate all in one treatment.",
    image: "/face/6.png",
  },
  {
    id: "Polynucleotides",
    title: "Polynucleotides – The Next Generation of Skin Regeneration",
    description:
      "Revitalise, repair, and rejuvenate your skin with Polynucleotides, the latest innovation in regenerative aesthetics.",
    image: "/face/7.jpg",
  },
  {
    id: "Profhilo",
    title: "Profhilo – The Ultimate Skin Hydration & Rejuvenation Treatment",
    description:
      "Give your skin the ultimate hydration and anti-ageing boost with Profhilo, an advanced injectable skin treatment designed to stimulate collagen, improve skin elasticity, and deeply hydrate from within.",
    image: "/face/8.jpg",
  },
  {
    id: "Rejuvenation",
    title: "Facial Skin Rejuvenation",
    description:
      "Restore your skin’s natural glow, elasticity, and vitality with our Facial Skin Rejuvenation treatments at Face Weybridge.",
    image: "/face/9.jpg",
  },
  {
    id: "Mesotherapy",
    title: "Facial Skin Mesotherapy",
    description:
      "Revitalise and rejuvenate your skin with Facial Skin Mesotherapy, an advanced, non-surgical treatment that delivers intense hydration, essential nutrients, and skin-boosting ingredients directly into the skin.",
    image: "/face/10.webp",
  },
  {
    id: "Eye",
    title: "Eye Rejuvenation",
    description:
      "Restore a brighter, youthful, and refreshed appearance with our Eye Rejuvenation treatments at Face Weybridge. The delicate skin around the eyes is often the first to show signs of ageing, fatigue, and stress, leading to dark circles, fine lines, puffiness, and sagging.",
    image: "/face/11.jpg",
  },
  {
    id: "Advanced",
    title: "Advanced Peels",
    description:
      "Reveal a brighter, smoother, and more youthful complexion with our Advanced Peels at Face Weybridge. Chemical peels are one of the most effective treatments for skin resurfacing, exfoliation, and rejuvenation, helping to target concerns such as fine lines, acne, pigmentation, and dull skin.",
    image: "/face/12.jpg",
  },
  {
    id: "Skin",
    title: "Advanced Skin Treatments",
    description:
      "Unlock the full potential of your skin with our Advanced Skin Treatments at Face Weybridge.",
    image: "/face/13.jpg",
  },
  {
    id: "Massage",
    title: "Facial Massage",
    description:
      "Relax, rejuvenate, and restore your skin with a luxurious Facial Massage at Face Weybridge. Our expert facial massage treatments are designed to relieve tension, improve circulation, and promote a youthful, radiant complexion.",
    image: "/face/14.jpg",
  },
  {
    id: "Waxing",
    title: "Waxing",
    description:
      "Achieve silky-smooth, hair-free skin with our professional Face Waxing services at Face Weybridge. Whether you want to shape your brows, remove unwanted facial hair, or achieve a polished, flawless look, our expert waxing treatments provide long-lasting, smooth results with minimal discomfort. Unlike shaving, which can cause irritation and stubble, waxing removes hair from the root, ensuring a soft, hair-free finish that lasts for weeks.",
    image: "/face/20.jpg",
  },
  {
    id: "SPMU",
    title: "SPMU",
    description:
      "Wake up with effortlessly beautiful, perfectly defined features every day with Semi-Permanent Makeup (SPMU) at Face Weybridge. Whether you want to enhance your eyebrows, define your eyes, or achieve fuller-looking lips, our expert SPMU treatments offer a natural-looking, long-lasting solution. Using advanced micropigmentation techniques, we create subtle, flawless enhancements tailored to your facial features, ensuring stunning results with minimal maintenance.",
    image: "/face/21.jpg",
  },
  {
    id: "Removal",
    title: "Laser Hair Removal",
    description:
      "Say goodbye to unwanted facial hair with Laser Hair Removal at Face Weybridge. Our advanced laser technology provides a long-lasting, safe, and effective solution for removing hair from areas such as the upper lip, chin, jawline, and cheeks. Unlike traditional methods like waxing and shaving, laser hair removal reduces hair growth permanently, leaving your skin smooth, clear, and free from irritation.",
    image: "/face/13.jpg",
  },
  {
    id: "Brow",
    title: "Lash & Brow Treatments",
    description:
      "Enhance the natural beauty of your eyes with our Lash & Brow Treatments at Face Weybridge. Beautifully shaped brows and defined lashes can completely transform your look, giving you a youthful, polished, and effortlessly glamorous appearance. Whether you’re looking for fuller, well-defined brows or longer, lifted lashes, our expert treatments are designed to enhance your features while maintaining a natural, flattering result.",
    image: "/face/15.jpg",
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
  Facial: {
    intro:
      "At Facey Clinic, facial skin analysis begins with a comprehensive digital imaging assessment (e.g., VISIA®) that maps pores, pigmentation, wrinkles, UV damage, and texture. Based on your individual profile, we customize treatments such as targeted chemical peels to renew skin layers, microneedling with PRP for collagen stimulation, IPL or fractional laser for pigment and vascular concerns, and tailored home-care regimens (medical-grade cleansers, serums, and sun protection) to address your specific needs and optimize long-term skin health.",
    understanding:
      "Facial skin analysis combines several advanced techniques into a comprehensive assessment: high-resolution digital imaging (e.g., VISIA®) and Wood’s-lamp examination to map pores, pigmentation, UV damage and porphyrins; instrumental biophysical measurements (sebumetry, corneometry, TEWL) to quantify oiliness, hydration and barrier integrity; dermatoscopic inspection for microtextural and vascular detail; 3D profilometry for wrinkle depth and surface roughness; and AI-driven apps or handheld devices for real-time analysis of tone, texture and fine lines.",

    causes:
      "Facial skin analysis is typically undertaken when patients notice uneven tone or texture, persistent acne or congestion, premature lines or wrinkles, sun-induced pigmentation, unexplained dryness or sensitivity, or when they want an objective baseline to guide prevention and tailor skincare regimens—helping clinicians pinpoint issues early, customize treatments, and monitor progress for healthier, more resilient skin.",
    types: [
      {
        heading: "Digital Imaging Systems",
        text: "High-resolution cameras with multispectral lighting (e.g., VISIA®) that capture detailed maps of pores, pigmentation, wrinkles, UV damage, and porphyrins for objective skin assessment.",
      },
      {
        heading: "Wood’s Lamp Examination",
        text: "UV-A light inspection that highlights subclinical pigmentation anomalies, acne-causing bacteria fluorescence, and porphyrin deposits to reveal issues invisible under normal lighting.",
      },
      {
        heading: "Instrumental Biophysical Measurements",
        text: "Quantitative sensors—such as sebumeters for oiliness, corneometers for hydration, and TEWL probes for barrier integrity—to precisely gauge skin surface properties and guide personalized care.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, treatment plans guided by facial skin analysis often combine targeted chemical peels to resurface and even out tone; fractional laser or IPL therapies to correct pigmentation and vascular concerns; microneedling with PRP to stimulate collagen and refine texture; LED phototherapy to calm inflammation and boost healing; and bespoke medical-grade topical regimens—retinoids, antioxidants, and hydrating actives—to reinforce barrier function and maintain long-term skin health.",
  },
  Botox: {
    intro:
      "At Facey Clinic, Botox® treatments are performed by our skilled aesthetic physicians who assess your facial anatomy and customize dosing of onabotulinumtoxinA to target dynamic muscles—commonly in the glabella, forehead, and crow’s-feet—to smooth wrinkles and lines. In just a 10–20 minute session using fine-gauge needles, micro-droplet injections create a natural relaxation of overactive muscles, with results appearing in 3–7 days and lasting about 3–4 months. The procedure is minimally invasive, requires no downtime, and can also be adapted for therapeutic uses such as hyperhidrosis or bruxism.",
    understanding:
      "Botulinum-toxin injectables include onabotulinumtoxinA (Botox®), the original formulation with accessory proteins approved for glabellar, forehead, and crow’s-feet lines; abobotulinumtoxinA (Dysport®), which has a broader diffusion and slightly quicker onset ideal for larger areas like the forehead; and incobotulinumtoxinA (Xeomin®), a “naked” toxin free of complexing proteins that lowers the risk of antibody formation and is preferred for patients with prior resistance or concerns about immunogenicity.",

    causes:
      "Botulinum-toxin injections are most commonly used to soften dynamic facial lines—such as glabellar “frown” lines, forehead creases, and crow’s-feet—arising from repetitive muscle contractions; to treat hyperhidrosis (excessive sweating) by blocking sweat-gland activity; to manage bruxism (teeth grinding) through masseter muscle relaxation; and in therapeutic contexts like chronic migraine prevention or focal muscle spasticity by reducing overactive neuromuscular signaling.",
    types: [
      {
        heading: "OnabotulinumtoxinA (Botox®)",
        text: "The original botulinum toxin type A formulation containing accessory proteins, used to relax targeted facial muscles in areas like glabellar lines, forehead creases, and crow’s-feet.",
      },
      {
        heading: "AbobotulinumtoxinA (Dysport®)",
        text: "A toxin complex with wider diffusion and a slightly faster onset than Botox®, often chosen for larger treatment zones such as the forehead or masseter.",
      },
      {
        heading: "IncobotulinumtoxinA (Xeomin®)",
        text: "A “naked” form of botulinum toxin type A free of complexing proteins, reducing the potential for antibody development and ideal for patients with prior resistance or immunogenicity concerns.",
      },
    ],
    treatmentOptions:
      "Botulinum toxin injections can be customized for both cosmetic and therapeutic goals: cosmetically, tiny doses are placed into muscles responsible for glabellar frown lines, forehead creases, and crow’s-feet to soften dynamic wrinkles; therapeutically, injections into the masseter relieve bruxism, intradermal axillary injections reduce excessive sweating, and pericranial placement can help prevent chronic migraines—each protocol tailored by toxin type (Botox®, Dysport®, Xeomin®), dose, and injection pattern to meet individual needs.",
  },
  Dermal: {
    intro:
      "At Facey Clinic, dermal-filler treatments are performed by our expert injectors using premium hyaluronic-acid and collagen-stimulating formulations tailored to each patient’s anatomy and goals—whether it’s restoring midface volume, smoothing nasolabial folds, enhancing lips, or contouring the jawline. In a 20–30-minute session, micro-boluses are precisely placed with fine cannulas or needles under topical anesthesia for comfort, delivering immediate lift and hydration with subtle, natural-looking results that last 6–18 months depending on the product and treatment area.",
    understanding:
      "Dermal fillers broadly fall into three categories: hyaluronic acid gels (e.g., Juvederm, Restylane) that deliver immediate hydration and soft-tissue volume lasting 6–12 months; calcium hydroxylapatite (Radiesse) which provides structural lift and stimulates collagen for 12–18 months; and poly-l-lactic acid (Sculptra), a biostimulatory agent that gradually induces collagen over several sessions for long-lasting rejuvenation.",

    causes:
      "Dermal fillers are most often used to address age-related volume loss—replenishing fullness in the cheeks, temples, and midface—as well as to smooth static wrinkles and folds (like nasolabial and marionette lines), enhance lip volume and definition, correct under-eye hollows (tear-troughs), contour features such as the jawline and chin, and soften atrophic scars or depressions for a more youthful, balanced appearance.",
    types: [
      {
        heading: "Hyaluronic Acid Fillers (HA)",
        text: "Gel-based formulations (e.g., Juvederm, Restylane) that instantly volumize and hydrate by binding water, ideal for smoothing fine lines, enhancing lips, and filling tear troughs, with effects lasting 6–12 months.",
      },
      {
        heading: "Calcium Hydroxylapatite Fillers (CaHA)",
        text: "Thicker, scaffold-forming gels (e.g., Radiesse) that provide immediate lift and stimulate collagen production, suited for deeper folds and structural contouring, with results persisting 12–18 months.",
      },
      {
        heading: "Poly-L-Lactic Acid Fillers (PLLA)",
        text: "Biostimulatory injections (e.g., Sculptra) that gradually trigger collagen synthesis over multiple sessions, offering subtle, long-lasting volume restoration for up to two years.",
      },
    ],
    treatmentOptions:
      "Treatment options for dermal fillers include midface volumization, where HA or CaHA fillers restore cheek fullness and lift the midface; fold and wrinkle correction, targeting nasolabial and marionette lines for a smoother appearance; lip enhancement, using precise HA micro-boluses to add volume, define borders, and improve symmetry; tear-trough filling to brighten under-eye hollows; and facial contouring, sculpting the jawline, chin, or temples for balanced, youthful proportions.",
  },
  Dermaforce: {
    intro:
      "At Facey Clinic, Dermaforce RF (Morpheus8) is delivered as a fractional microneedling-RF treatment using adjustable, gold-plated needles to safely convey radiofrequency energy into the dermis, stimulating neocollagenesis and elastin remodeling. In each 30–45 minute session—typically performed in a series of three spaced 4–6 weeks apart—patients experience tighter, smoother skin with improved texture, minimized pores, and reduction of fine lines; recovery is swift, with only mild redness or swelling that subsides within 24–48 hours.",
    understanding:
      "Dermaforce RF (Morpheus8) treatments can be tailored using the face handpiece, with a 12-pin, 0.5–3.5 mm microneedle array for fine‐line smoothing and pore refinement; the body handpiece, featuring a 24-pin, up to 8 mm depth array for firming larger areas and reducing cellulite; or a multi-depth hybrid protocol, which sequentially combines shallow and deep passes in one session to deliver both surface resurfacing and volumetric dermal tightening.",

    causes:
      "Dermaforce RF (Morpheus8) is most often used to address skin laxity and mild to moderate sagging; fine lines and deeper wrinkles; uneven texture and enlarged pores; acne scarring and stretch marks; and cellulite or crepey skin on the body—leveraging fractional RF energy at variable depths to remodel collagen and elastin for firmer, smoother, more even skin.",
    types: [
      {
        heading: "Face Handpiece",
        text: "Utilizes a 12-pin, 0.5–3.5 mm microneedle array for delicate facial areas, targeting fine lines, pore size, and superficial texture.",
      },
      {
        heading: "Body Handpiece",
        text: "Employs a 24-pin array with needle depths up to 8 mm for larger regions (abdomen, thighs, arms), focusing on skin laxity, cellulite reduction, and deeper tissue remodeling.",
      },
      {
        heading: "Multi-Depth Hybrid Protocol",
        text: "Combines sequential passes at varying depths—shallow for epidermal resurfacing and deep for volumetric tightening—in a single session to maximize both surface renewal and collagen stimulation.",
      },
    ],
    treatmentOptions:
      "Dermaforce RF (Morpheus8) treatments at Facey Clinic can be tailored with our face handpiece—ideal for fine‐line smoothing, pore reduction, and superficial textural improvements; the body handpiece—designed for deeper collagen remodeling in areas like the abdomen, thighs, and arms to tighten skin and reduce cellulite; or a multi‐depth hybrid protocol—which combines shallow and deep passes in a single session for both epidermal resurfacing and volumetric tissue tightening. Sessions are typically scheduled in a series of three, spaced 4–6 weeks apart, with minimal downtime and progressive improvements in firmness, tone, and texture.",
  },
  Hydrafacial: {
    intro:
      "At Facey Clinic, the Hydrafacial “Ultimate Skin Refresh” is a 30-minute, four-step treatment that uses gentle vortex-fusion technology to deeply cleanse and exfoliate, painlessly extract impurities, infuse potent antioxidant and hyaluronic-acid serums, and deliver tailored boosters for concerns like pigmentation or fine lines—all with no downtime, immediate plumping hydration, and a glowing, refreshed complexion that lasts for weeks.",
    understanding:
      "HydraFacial “The Ultimate Skin Refresh” is offered in three tiers: the Signature, a 30-minute vortex-fusion treatment that cleanses, exfoliates, extracts, and infuses antioxidant serums; the Deluxe, which adds a personalized booster (brightening, firming, or clarifying) plus LED light therapy for targeted concerns; and the Platinum, our most comprehensive package featuring a pre-treatment lymphatic drainage massage before the Signature steps, followed by booster infusions and LED to maximize detoxification, circulation, and radiance.",

    causes:
      "HydraFacial “Ultimate Skin Refresh” is most often chosen to combat dull, dehydrated skin; clear clogged pores and reduce enlarged pores; smooth fine lines and wrinkles; even out tone, texture, and hyperpigmentation; and calm redness or sensitivity—delivering deep cleansing, gentle exfoliation, painless extractions, and infusion of hydrating, antioxidant-rich serums for an instant boost in radiance and long-term skin health.",
    types: [
      {
        heading: "Signature Hydrafacial",
        text: "A 30-minute vortex-fusion treatment that cleanses, gently exfoliates, painlessly extracts impurities, and infuses antioxidant-rich and hydrating serums for an immediate glow.",
      },
      {
        heading: "Deluxe Hydrafacial",
        text: "Builds on the Signature by adding one targeted booster (e.g., brightening, firming, or clarifying) and LED light therapy to address specific concerns like pigmentation or acne.",
      },
      {
        heading: "Platinum Hydrafacial",
        text: "Our most comprehensive protocol, beginning with a lymphatic drainage massage, followed by the Signature treatment, a choice of booster infusion, and LED therapy for enhanced detoxification, circulation, and long-lasting radiance.",
      },
    ],
    treatmentOptions:
      "HydraFacial “The Ultimate Skin Refresh” at Facey Clinic starts with the signature vortex-fusion cycle—deep cleansing, gentle exfoliation, painless extraction, and hydrating serum infusion—and can be tailored with targeted boosters (e.g., brightening antioxidants, firming peptides, or clarifying blends) plus optional LED light therapy or lymphatic drainage to enhance collagen stimulation, detoxification, and long-lasting glow.",
  },
  Polynucleotides: {
    intro:
      "At Facey Clinic, polynucleotide therapy uses ultra-pure DNA fragments delivered via superfine micro-injections in a microdroplet “mesotherapy” technique—typically in a series of 3–4 treatments spaced 2–3 weeks apart—to jump-start fibroblast activity, boost hydration, and remodel collagen and elastin. Sessions are performed under topical anesthesia, require virtually no downtime, and yield progressive improvements in skin firmness, texture, and radiance over subsequent weeks.",
    understanding:
      "Polynucleotide skin regeneration comes in three main formats: pure mesotherapy, which uses ultra-pure DNA fragments to directly stimulate fibroblasts and collagen/elastin synthesis; polynucleotide–hyaluronic acid hybrids, combining DNA strands with HA for both immediate hydration and regenerative remodeling; and cross-linked polynucleotide fillers, where stabilized DNA networks remain in the dermis longer for sustained nucleotide release, prolonged fibroblast activation, and gentle volumization.",

    causes:
      "Polynucleotide therapy is most often chosen to counteract age-related and photoaging changes—such as loss of skin elasticity and firmness—by stimulating fibroblast activity; to smooth fine lines, wrinkles, and surface texture irregularities; to improve hydration and barrier function in chronically dry or sensitive skin; to remodel atrophic scars and stretch marks; and to accelerate healing and tissue regeneration following laser, peel, or microneedling procedures.",
    types: [
      {
        heading: "Pure Polynucleotide Mesotherapy",
        text: "Injections of ultra-pure DNA fragments via superfine needles to directly activate fibroblasts, boost collagen/elastin synthesis, and enhance hydration without added volumizers.",
      },
      {
        heading: "Polynucleotide–Hyaluronic Acid Hybrids",
        text: "Combines regenerative DNA strands with hyaluronic acid for immediate skin plumping and long-term tissue remodeling in a single treatment.",
      },
      {
        heading: "Cross-Linked Polynucleotide Fillers",
        text: "Stabilized, cross-linked DNA networks that remain in the dermis longer, providing sustained nucleotide release for prolonged fibroblast stimulation and gentle volumization.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, polynucleotide treatments are offered in three tailored formats: pure mesotherapy, where ultra-pure DNA fragments are injected via superfine microdroplets in a series of 3–4 sessions (spaced 2–4 weeks apart) to boost collagen and elastin; polynucleotide–hyaluronic acid hybrids, delivering both immediate hydration and long-term tissue remodeling in one step; and cross-linked polynucleotide fillers, which remain in the dermis longer for sustained nucleotide release, gentle volumization, and prolonged fibroblast activation—all performed under topical anesthesia with virtually no downtime and progressive improvements in skin firmness, texture, and radiance.",
  },
  Profhilo: {
    intro:
      "At Facey Clinic, Profhilo® treatments employ a patented “Bio Aesthetic Point” (BAP) injection technique, placing five micro-boluses of ultra-pure, high- and low-molecular-weight hyaluronic acid at five key points per side of the face (10 total). Delivered in two 30-minute sessions spaced four weeks apart, Profhilo® intensely hydrates, stimulates collagen and elastin remodeling, and improves skin firmness and luminosity with virtually no downtime—visible tightening and glow emerge within weeks, with optimal results maintained by a single “top-up” every 6–9 months.",
    understanding:
      "Profhilo® treatments are tailored to different areas: Profhilo® Face uses the 10-point Bio Aesthetic Point technique to deliver dual-weight hyaluronic acid for intense facial hydration and collagen/elastin stimulation; Profhilo® Body applies larger HA boluses at standardized sites on arms, abdomen, or knees to tighten and rejuvenate lax skin; and Profhilo® Neck & Décolletage targets micro-bolus injections along neck and chest lines to smooth crepiness, boost moisture, and improve firmness in these delicate zones.",

    causes:
      "Profhilo® is most often chosen to combat chronic skin dehydration and loss of elasticity—addressing dull, crepey or thin skin on the face, neck, and décolletage—by smoothing fine lines and superficial wrinkles, restoring firmness and plumpness, and boosting overall radiance and tissue hydration in patients experiencing age- or photo-aging-related dryness and laxity.",
    types: [
      {
        heading: "Profhilo® Face",
        text: "Ultra-pure, high- and low-molecular-weight hyaluronic acid delivered via the 10-point Bio Aesthetic Point (BAP) technique on the face to deeply hydrate, stimulate collagen and elastin remodeling, and improve facial firmness and glow.",
      },
      {
        heading: "Profhilo® Body",
        text: "Larger-volume HA boluses injected at standardized BAP sites on areas like the arms, abdomen, and knees to tighten lax skin, boost elasticity, and revitalize body tissue.",
      },
      {
        heading: "Profhilo® Neck & Décolletage",
        text: "Targeted micro-bolus injections along the neck and chest BAP lines for intense moisture, reduced crepiness, and enhanced skin firmness in these delicate zones.",
      },
    ],
    treatmentOptions:
      "Profhilo® at Facey Clinic is delivered in two 30-minute sessions, four weeks apart, using the patented Bio Aesthetic Point (BAP) injection technique—whether on the face (10 micro-boluses for deep hydration, collagen/elastin stimulation, and contour improvement), the body (larger HA deposits at strategic BAP sites on arms, abdomen, or knees for skin tightening and elasticity), or the neck & décolletage (micro-boluses along neck and chest lines to smooth crepiness and boost firmness). Results—intense hydration, improved tone, and luminosity—emerge within weeks, with a single maintenance “top-up” every 6–9 months to sustain benefits.",
  },
  Rejuvenation: {
    intro:
      "At Facey Clinic, facial skin rejuvenation combines advanced in-office and at-home therapies personalized to your skin’s needs—ranging from targeted chemical peels (glycolic, salicylic or TCA) and fractional laser or IPL resurfacing for tone and texture; microneedling with or without PRP to boost collagen and firmness; LED phototherapy to calm inflammation and stimulate healing; to bespoke medical-grade topical regimens (retinoids, antioxidants, hydrating serums) for ongoing barrier support and age-defying maintenance—all orchestrated into a cohesive plan for smoother, brighter, and more youthful-looking skin.",
    understanding:
      "Facial skin rejuvenation spans three core approaches: chemical exfoliation (glycolic, salicylic or TCA peels) to slough off damaged epidermal layers and even pigmentation; energy-based resurfacing (ablative/non-ablative lasers, IPL) for deeper wrinkle reduction, pigment and vascular correction; and collagen-induction therapies (microneedling, radiofrequency microneedling, focused ultrasound) that create controlled micro-injuries or thermal zones to stimulate fibroblasts, tighten skin, and boost firmness—often complemented by LED phototherapy and customized topical regimens to optimize healing and long-term skin health.",

    causes:
      "Facial skin rejuvenation is most often pursued to counteract age- and environment-related changes—such as fine lines and wrinkles from repeated expression and collagen decline, sun-induced hyperpigmentation and rough texture, acne or surgical scarring that leaves uneven relief, chronic dryness and dullness from barrier dysfunction, and loss of firmness or elasticity due to natural collagen and elastin degradation—helping restore a smoother, more even, and radiant complexion.",
    types: [
      {
        heading: "Chemical Exfoliation",
        text: "Superficial to medium-depth peels (glycolic, salicylic, or TCA) that dissolve damaged epidermal layers, even out pigmentation, and smooth fine lines.",
      },
      {
        heading: "Energy-Based Resurfacing",
        text: "Ablative (fractional CO₂, erbium) and non-ablative (IPL, diode lasers) systems that target collagen remodelling, pigment, and vascular issues for deeper wrinkle reduction and tone correction.",
      },
      {
        heading: "Collagen-Induction Therapies",
        text: "Mechanical and thermal modalities—microneedling, RF microneedling (e.g., Morpheus8), or focused ultrasound (Ultherapy)—that create controlled micro-injuries or thermal zones to stimulate fibroblasts, tighten skin, and boost firmness.",
      },
    ],
    treatmentOptions:
      "Facial skin rejuvenation at Facey Clinic combines medium-depth chemical peels (glycolic, salicylic, TCA) for exfoliation and pigment correction; energy-based resurfacing (fractional CO₂ or erbium lasers, IPL, focused ultrasound) to boost collagen and soften wrinkles; collagen-induction methods (microneedling ± PRP, RF microneedling) for texture and firmness; adjunct LED phototherapy to reduce inflammation; and bespoke medical-grade topicals (retinoids, antioxidants, peptides) to support barrier function and prolong results.",
  },
  Mesotherapy: {
    intro:
      "Facial mesotherapy at Facey Clinic uses a customized cocktail of vitamins, minerals, amino acids, and hyaluronic acid delivered via superfine, micro-droplet injections (often with a meso-pen) into the superficial dermis. In a series of 3–6 treatments spaced 1–2 weeks apart, this approach nourishes and hydrates skin from within, stimulates collagen and elastin production, improves texture and tone, and reduces fine lines with virtually no downtime—leaving the complexion visibly plumper, brighter, and more youthful.",
    understanding:
      "Facial mesotherapy techniques range from manual microinjection, where fine needles deliver bespoke serums of vitamins, minerals, and hyaluronic acid into the superficial dermis; automated meso-pen or meso-gun delivery, which uses electronic control of depth and pressure for uniform, rapid micro-droplet injections; to needle-free methods like electroporation or ultrasound, which temporarily open cell membranes to drive bioactive molecules into the skin without puncturing—each offering targeted nourishment, hydration, and collagen stimulation with minimal downtime.",

    causes:
      "Facial mesotherapy is most often chosen to combat superficial dehydration and dullness by delivering hydrating actives directly into the dermis; to smooth fine lines and improve skin texture by stimulating collagen and elastin production; to even out tone and reduce mild hyperpigmentation or post-inflammatory marks; and to restore firmness and plumpness in skin weakened by age, environmental stress, or barrier dysfunction.",
    types: [
      {
        heading: "Manual Microinjection Mesotherapy",
        text: "Fine needles deliver customized cocktails of vitamins, minerals, antioxidants, and hyaluronic acid into the superficial dermis via micro-droplet injections for targeted hydration, nourishment, and fibroblast stimulation.",
      },
      {
        heading: "Automated Mesotherapy (Meso-Pen/Meso-Gun)",
        text: "Electronic devices regulate needle depth and injection pressure to uniformly administer revitalizing serums over larger areas more quickly and with increased comfort.",
      },
      {
        heading: "Needle-Free Mesotherapy (Electroporation/Ultrasound)",
        text: "Uses electrical pulses or ultrasonic waves to transiently open cell membranes and drive bioactive molecules into the skin without puncturing, offering a painless, no-downtime alternative.",
      },
    ],
    treatmentOptions:
      "Facial mesotherapy at Facey Clinic can be tailored with three main treatment options: hydrating cocktails—blends of hyaluronic acid, amino acids, and vitamins to deeply moisturize and plump the skin; antioxidant-brightening formulas—serums containing vitamin C, glutathione, and botanical extracts to even tone and combat free radicals; and bio-stimulating mixtures—peptides, growth factors, or autologous PRP/polynucleotides to kick-start collagen and elastin production for firmer, smoother texture. These are delivered via manual microinjections or meso-pen devices in 3–6 sessions spaced 1–2 weeks apart, with virtually no downtime.",
  },
  Eye: {
    intro:
      "At Facey Clinic, eye rejuvenation blends surgical and non-surgical approaches: upper and lower blepharoplasty to remove excess skin and fat and restore clean eyelid contours; tear-trough HA filler to refill under-eye hollows and soften dark circles; PRP or polynucleotide injections to kick-start collagen and improve skin texture; and energy-based therapies (fractional CO₂ laser or Morpheus8 RF microneedling) to tighten delicate periorbital skin and smooth fine lines—all customized to your anatomy, performed under local or topical anesthesia, and designed for minimal downtime and natural-looking results.",
    understanding:
      "Eye rejuvenation spans three core approaches: surgical blepharoplasty, which removes or repositions excess eyelid skin and fat for lasting contour improvement; injectable therapies—including hyaluronic-acid tear-trough fillers, neuromodulators like Botox® for crow’s-feet, and PRP or polynucleotides to boost collagen and smooth texture; and energy-based treatments such as fractional CO₂ laser, RF microneedling (Morpheus8), or Ultherapy to tighten delicate periorbital skin and soften fine lines with minimal downtime.",

    causes:
      "Eye rejuvenation is most often sought to correct age-related and structural changes around the eyes—such as upper-lid hooding and excess skin that droops with collagen loss; under-eye bags and tear-trough hollows from fat herniation or volume depletion; fine lines and crow’s-feet caused by repetitive muscle movement and sun damage; dark circles from thin, translucent skin or hyperpigmentation; and general periorbital skin laxity and crepiness that contribute to a tired, aged appearance.",
    types: [
      {
        heading: "Surgical Blepharoplasty",
        text: "Operative removal or repositioning of excess eyelid skin and fat to correct hooding, under‐eye bags, and restore clean, youthful eyelid contours.",
      },
      {
        heading: "Injectable Therapies",
        text: "Use of hyaluronic-acid tear-trough fillers to refill hollows and soften dark circles, neuromodulators (e.g., Botox®) to smooth crow’s-feet, and biologics like PRP or polynucleotides to stimulate collagen for improved texture.",
      },
      {
        heading: "Energy-Based Treatments",
        text: "Non-surgical modalities—fractional CO₂ or erbium laser resurfacing, RF microneedling (e.g., Morpheus8), or focused ultrasound (Ultherapy)—to tighten delicate periorbital skin, reduce fine lines, and enhance overall firmness.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, eye rejuvenation can be achieved with surgical blepharoplasty to remove or reposition excess eyelid skin and fat for lasting contour improvement; injectable therapies—including hyaluronic-acid tear-trough fillers to refill hollows, neuromodulators like Botox® for crow’s-feet, and PRP or polynucleotides to boost collagen and smooth texture; and energy-based treatments such as fractional CO₂ laser, RF microneedling (Morpheus8), or Ultherapy to tighten delicate periorbital skin and soften fine lines with minimal downtime.",
  },
  Advanced: {
    intro:
      "Using medical-grade formulas, our expertly performed peels remove dead skin cells, promote cell renewal, and leave your skin looking radiant, fresh, and revitalised. Whether you’re looking for a mild refresh or a more intensive resurfacing, we have the perfect peel for your skin type.",
    understanding:
      "Advanced chemical peels range from the superficial Jessner’s peel, which layers salicylic acid, lactic acid, and resorcinol to gently exfoliate, brighten pigmentation, and clear mild acne; to medium-depth TCA peels (20–35%), which reach the papillary dermis for smoothing fine lines, evening skin tone, and improving moderate scarring; up to deep phenol peels, which remove the full epidermis and upper dermis for dramatic correction of deep wrinkles and severe photo-damage, albeit with longer recovery and anesthesia requirements.",

    causes:
      "Advanced chemical peels are most often chosen to address stubborn photo-aging (deep wrinkles, leathery texture, and sun spots), moderate to severe acne scarring, melasma and other refractory hyperpigmentation, rough or uneven skin tone, and precancerous actinic keratoses—offering graduated depths of exfoliation to resurface and renew skin when milder treatments fall short.",
    types: [
      {
        heading: "Jessner’s Peel",
        text: "A layered, superficial-to-medium-depth formula combining salicylic acid, lactic acid, and resorcinol to exfoliate the epidermis, improve pigmentation, and clear acne.",
      },
      {
        heading: "Medium-Depth TCA Peel",
        text: "Uses 20–35% trichloroacetic acid to penetrate into the papillary dermis for smoothing fine lines, evening skin tone, and reducing moderate scarring.",
      },
      {
        heading: "Deep Phenol Peel",
        text: "Employs a high-strength phenol solution to remove the full epidermis and upper dermis, delivering dramatic correction of deep wrinkles and severe photo-damage with longer recovery.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, advanced peel options include the Jessner’s peel, ideal for superficial-to-medium exfoliation, pigmentation correction, and mild acne clearance; medium-depth TCA peels (20–35%), which reach the papillary dermis to smooth fine lines, even tone, and improve moderate scarring; and deep phenol peels, the most intensive option for dramatic correction of deep wrinkles and severe photo-damage—each customized in strength and layering, performed under appropriate anesthesia, and paired with a tailored post-peel regimen (sun avoidance, barrier-repair emollients, and periodic follow-up) to ensure optimal renewal and minimize downtime.",
  },
  Skin: {
    intro:
      "Designed to go beyond traditional facials, our cutting-edge skin therapies use medical-grade technology and professional techniques to address a wide range of skin concerns, from ageing and pigmentation to acne and dehydration. Whether you’re looking for collagen stimulation, deep skin resurfacing, or intensive hydration, our expert treatments deliver visible, long-lasting results with minimal downtime.",
    understanding:
      "Advanced skin rejuvenation encompasses advanced peels (medium- to deep-depth TCA, Jessner’s, or phenol) for dermal resurfacing and scar remodeling; energy-based therapies (fractional CO₂/erbium lasers, RF microneedling, IPL, Ultherapy) that deliver controlled thermal or ablative micro-injuries to tighten skin and stimulate collagen; and regenerative biologics & injectables (PRP, polynucleotides, Profhilo®, mesotherapy cocktails) that infuse growth factors, DNA fragments, and hyaluronic acid to boost hydration, fibroblast activity, and long-term tissue regeneration.",

    causes:
      "Advanced skin treatments are most often pursued when more superficial therapies fall short—such as for stubborn photo-aging with deep wrinkles and leathery texture, moderate to severe acne or surgical scarring, significant skin laxity or crepiness, refractory hyperpigmentation (melasma, sun spots), and precancerous lesions like actinic keratoses—offering dermal resurfacing, collagen remodeling, and targeted renewal when milder approaches can’t fully restore tone, texture, or firmness.",
    types: [
      {
        heading: "Chemical Exfoliation (Advanced Peels)",
        text: "Medium- to deep-depth formulations—such as TCA (20–35%), Jessner’s, or phenol—that penetrate into the dermis for resurfacing, wrinkle smoothing, pigmentation correction, and scar remodeling.",
      },
      {
        heading: "Energy-Based Therapies",
        text: "High-tech modalities—including fractional CO₂/erbium lasers, RF microneedling (e.g., Morpheus8), IPL, and focused ultrasound (Ultherapy)—that deliver controlled thermal or ablative micro-injuries to tighten skin, stimulate collagen remodeling, and improve tone and texture.",
      },
      {
        heading: "Regenerative Biologics & Injectables",
        text: "Treatments like platelet-rich plasma (PRP), polynucleotides, Profhilo®, and mesotherapy cocktails that infuse growth factors, DNA fragments, and hyaluronic acid to boost hydration, accelerate healing, enhance fibroblast activity, and promote long-term tissue regeneration.",
      },
    ],
    treatmentOptions:
      "Advanced skin treatments at Facey Clinic include advanced peels (Jessner’s, medium-depth TCA, or deep phenol) for graduated resurfacing and scar remodeling; energy-based therapies (fractional CO₂/erbium lasers, RF microneedling, IPL, Ultherapy) to induce controlled micro-injuries, tighten skin, and boost collagen; and regenerative biologics & injectables (PRP, polynucleotides, Profhilo®, mesotherapy cocktails) to infuse growth factors, DNA fragments, and hyaluronic acid for hydration, fibroblast activation, and long-term tissue renewal.",
  },
  Massage: {
    intro:
      "At Face Weybridge, we offer a holistic approach to skincare, combining relaxation with expert massage techniques to improve your skin’s health and appearance. Our highly trained therapists use specialised movements designed to stimulate circulation, relieve stress, and enhance your natural glow. In a serene, spa-like environment, we ensure that every facial massage is tailored to your needs, helping you look and feel your best.",
    understanding:
      "Facial massage techniques range from lymphatic drainage, which uses gentle, rhythmic strokes to reduce puffiness and promote detoxification; deep-tissue facial massage, applying firmer pressure and targeted kneading to release tension in muscles and improve circulation; and Gua Sha or facial cupping, which use smooth-edged tools or suction cups to stimulate blood flow, sculpt contours, and enhance skin firmness—all tailored to boost relaxation, lymphatic flow, and collagen health.",

    causes:
      "or TMJ tightness), stimulate sluggish circulation for a brighter, more even complexion, encourage lymphatic drainage to reduce puffiness and detoxify, enhance absorption of serums and oils for better skincare results, and promote collagen and elastin synthesis to improve firmness and counteract early signs of aging.",
    types: [
      {
        heading: "Lymphatic Drainage Massage",
        text: "Gentle, rhythmic strokes that encourage lymph flow to reduce facial puffiness, flush toxins, and improve fluid balance.",
      },
      {
        heading: "Deep-Tissue Facial Massage",
        text: "Uses firmer pressure and targeted kneading to release muscle tension, break up adhesions, and boost circulation for a sculpted, revitalized appearance.",
      },
      {
        heading: "Gua Sha/Facial Cupping",
        text: "Employs smooth-edged tools or silicone cups to glide across the skin, stimulating blood flow, enhancing contour definition, and promoting collagen synthesis.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, facial massage options include lymphatic drainage, using gentle, rhythmic strokes to de-puff and detoxify; deep-tissue sculpting, applying targeted kneading and acupressure to relieve muscle tension and sharpen contours; and Gua Sha or cupping, employing smooth-edged tools or silicone cups to stimulate circulation, boost collagen production, and enhance skin firmness—often paired with customized serums or LED therapy for amplified rejuvenation.",
  },
  Brow: {
    intro:
      "At Face Weybridge, our lash and brow specialists are trained to create beautifully enhanced yet natural-looking results. Using high-quality products and precise techniques, we ensure each treatment is customised to suit your unique features and style. Whether you’re after bold, dramatic brows or a subtle, effortless lash lift, we provide expert care in a relaxing, professional environment. Your confidence is our priority, and we’re dedicated to giving you the perfect lash and brow look that complements your natural beauty.",
    understanding:
      "Lash and brow treatments come in several types: tinting, which uses semi-permanent dye to enhance color and definition; lifting or lamination, where lashes or brows are gently shaped and set to create a fuller, more lifted look; and extensions or enhancements, such as individual lash extensions or brow microblading, which add volume, length, or structure for long-lasting, polished results tailored to your facial features.",

    causes:
      "Lash and brow treatments are often sought to enhance natural definition, correct uneven or sparse hair growth, create a fuller or more lifted appearance, and reduce the need for daily makeup application. They can also address thinning due to over-plucking, aging, or medical conditions, helping restore shape, color, and symmetry for a more youthful, expressive look.",
    types: [
      {
        heading: "Lash & Brow Tinting",
        text: "Uses semi-permanent dye to darken lashes or brows, enhancing definition and visibility without daily makeup.",
      },
      {
        heading: "Lash Lift & Brow Lamination",
        text: "Involves setting lashes in an upward curl or brow hairs in a lifted, uniform shape to create a fuller, more polished appearance.",
      },
      {
        heading: "Extensions & Microblading",
        text: "Adds volume and length through individual lash extensions or reshapes sparse brows using semi-permanent tattooing techniques for long-lasting definition.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, lash and brow treatments include tinting to enhance natural color and definition; lash lifts and brow laminations to shape and set hairs for a fuller, lifted appearance; and lash extensions or brow microblading for clients seeking long-lasting volume, symmetry, and structure—all tailored to your facial features for a polished, low-maintenance look.",
  },
  Removal: {
    intro:
      "At Face Weybridge, we use state-of-the-art laser technology to provide safe, comfortable, and highly effective treatments. Our experienced practitioners ensure that each session is tailored to your skin type and hair growth pattern, maximising results while minimising discomfort. With our personalised approach, you can expect a professional and welcoming experience, achieving smooth, hair-free skin with confidence.",
    understanding:
      "Laser hair removal is a non-invasive procedure that uses concentrated light beams to target and destroy hair follicles, preventing future hair growth. The laser emits a specific wavelength of light that is absorbed by the pigment in the hair, damaging the follicle while leaving surrounding skin unharmed. This method is effective for various skin types and hair colors, with multiple sessions typically required for optimal results as hair grows in cycles.",

    causes:
      "Laser hair removal is often chosen to achieve long-term hair reduction in areas such as the face, underarms, bikini line, legs, and back. It is particularly beneficial for those with dark, coarse hair and lighter skin tones, as the contrast allows for more effective targeting of the hair follicles. Many clients prefer this method over traditional hair removal techniques like shaving or waxing due to its convenience and lasting results.",
    types: [
      {
        heading: "Alexandrite Laser",
        text: "Ideal for lighter skin tones, this laser uses a specific wavelength to target melanin in the hair, providing quick and effective hair removal with minimal discomfort.",
      },
      {
        heading: "Diode Laser",
        text: "Suitable for a wide range of skin types, this laser emits a longer wavelength that penetrates deeper into the skin, making it effective for both light and dark hair.",
      },
      {
        heading: "Ruby Laser",
        text: "Best for fine, light hair, this laser uses a shorter wavelength to target hair follicles with precision, offering effective results for those with lighter hair colors.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, we offer advanced laser hair removal options including Alexandrite laser for lighter skin tones, providing quick and effective results; Diode laser suitable for a wide range of skin types, effectively targeting both light and dark hair; and Ruby laser for fine, light hair, delivering precise follicle targeting. Each treatment is personalised to your skin type and hair growth pattern, ensuring optimal results with minimal discomfort in a professional and welcoming environment.",
  },
  SPMU: {
    intro:
      "At Face Weybridge, we specialise in delivering natural-looking semi-permanent makeup enhancements tailored to each individual. Our trained and experienced professionals use high-quality pigments and precision techniques to ensure flawless, long-lasting results. We prioritise safety, hygiene, and artistry to give you a personalised, confidence-boosting experience in our welcoming clinic. Whether you’re enhancing your brows, eyes, or lips, you can trust us to create a look that complements your natural beauty.",
    understanding:
      "Semi-Permanent Makeup (SPMU), is a cosmetic tattooing technique used to enhance facial features by implanting pigment into the skin. It mimics makeup but lasts much longer—typically 1 to 3 years depending on skin type, lifestyle, and pigment retention. SPMU can be applied to eyebrows (microblading or ombre shading), eyeliner (eyelash enhancement or winged liner), and lips (lip blush or full lip colour), providing a polished, low-maintenance look that reduces the need for daily makeup application.",

    causes:
      "SPMU is often chosen to enhance natural features, correct asymmetry, or fill in sparse areas without the daily effort of applying traditional makeup. It can also be beneficial for those with allergies to conventional cosmetics, busy lifestyles that make daily application impractical, or medical conditions that affect hair growth (like alopecia) or pigmentation (like vitiligo). SPMU provides a long-lasting solution for achieving defined, polished features effortlessly.",
    types: [
      {
        heading: "Eyebrow Enhancements",
        text: "Microblading or ombre shading techniques to create natural-looking, fuller brows by depositing pigment in hair-like strokes or soft gradients.",
      },
      {
        heading: "Eyeliner Tattooing",
        text: "Eyelash enhancement or winged liner techniques to define the eyes with long-lasting pigment, reducing the need for daily eyeliner application.",
      },
      {
        heading: "Lip Enhancements",
        text: "Lip blush or full lip colour techniques to add definition, shape, and a subtle tint to the lips, enhancing their natural colour and fullness.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, semi-permanent makeup options include eyebrow enhancements (microblading or ombre shading) for natural, fuller brows; eyeliner tattooing (eyelash enhancement or winged liner) to define the eyes with long-lasting pigment; and lip enhancements (lip blush or full lip colour) to add shape and a subtle tint to the lips—all performed by skilled professionals using high-quality pigments for a polished, low-maintenance look that complements your features.",
  },
  Waxing: {
    intro:
      "At Face Weybridge, we provide expert waxing treatments in a clean, professional, and relaxing environment. Our trained specialists use gentle yet effective waxing techniques to ensure a quick, comfortable experience with minimal irritation. We use high-quality, skin-friendly wax suitable for even the most sensitive skin, leaving you with perfectly smooth, radiant skin every time.",
    understanding:
      "Waxing is a popular method for temporary hair removal that pulls hair out from the root, leaving the skin smooth for 2–6 weeks. There are several types of waxing techniques and waxes, each suited for different skin types, hair textures, and body areas.",

    causes:
      "Waing are done for several personal, aesthetic, and hygienic reasons: Smooth, Hair-Free Skin: Waxing removes hair from the root, leaving skin smooth and hair-free for weeks, which many find more aesthetically pleasing than shaving. Reduced Ingrown Hairs: Waxing can help reduce the occurrence of ingrown hairs compared to shaving, as it removes hair from the root rather than cutting it at the surface. Longer-Lasting Results: Waxing typically lasts longer than shaving, with results lasting 2–6 weeks depending on individual hair growth cycles. Exfoliation: Waxing also exfoliates the skin by removing dead skin cells along with hair, leaving the skin feeling softer and smoother.",
    types: [
      {
        heading: "Soft Wax (Strip Wax)",
        text: "A thin layer of warm wax is applied to the skin and removed with a cloth or paper strip, ideal for larger areas like legs and arms.",
      },
      {
        heading: "Hard Wax (Stripless Wax)",
        text: "A thicker layer of wax is applied and allowed to harden before being pulled off without strips, suitable for sensitive areas like the bikini line and underarms.",
      },
      {
        heading: "Sugar Wax (Sugaring)",
        text: "A natural paste made from sugar, lemon juice, and water is applied to the skin and removed by hand, providing a gentler option for sensitive skin.",
      },
    ],
    treatmentOptions:
      "At Facey Clinic, we offer a range of waxing options tailored to your needs, including soft wax for larger areas like legs and arms; hard wax for sensitive areas such as the bikini line and underarms; and sugar waxing for those with sensitive skin or who prefer natural ingredients. Our trained specialists ensure a comfortable, efficient experience with minimal irritation, leaving your skin smooth and radiant.",
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
                    router.push(`/face/${c.id}`);
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
