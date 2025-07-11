import ClinicHero from "./components/ClinicHero";
import WellnessSection from "./components/WellnessSection";
import MapSection from "./components/MapSection";

export default function clinic() {
  return (
    <>
      <ClinicHero
        title="London's Best Aesthetics and Beauty Clinic"
        subtitle="Unrivalled aesthetics clinic in London for anti&ndash;wrinkle injections, dermal fillers, and laser treatments"
        imageSrc="/images/11.webp"
      />
      <WellnessSection />
      <MapSection />
    </>
  );
}
