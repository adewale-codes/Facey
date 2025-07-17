import AboutHero from "./components/AboutHero";
import WellnessSection from "./components/WellnessSection";
import Team from "./components/Team";
import StaffSection from "./components/Staffs";
import LogoSlider from "../components/LogoSlider";
import AppointmentSection from "../components/Appointment";

export default function clinic() {
  return (
    <>
      <AboutHero
        title="Home of Beauty and Aesthetics"
        subtitle="Facey's clinic is the home of beauty and aesthetics, offering a range of treatments to enhance your natural beauty."
        imageSrc="/images/clinic-background.jpg"
      />
      <WellnessSection />
      <Team />
      <StaffSection />
      <LogoSlider />
      <AppointmentSection />
    </>
  );
}
