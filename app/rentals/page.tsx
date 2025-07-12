import RentalHero from "./components/RentalHero";
import LookSection from "./components/Look";

export default function rentals() {
  return (
    <>
      <RentalHero
        title="Room Rentals"
        imageSrc="/images/14.webp"
      />
      <LookSection />
    </>
  );
}
