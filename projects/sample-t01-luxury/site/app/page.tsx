import MotionRoot from "@/components/MotionRoot";
import { Anatomy, Appointment, Film, Footer, Hero, Manifesto } from "@/components/sections/Sections";

export default function Home() {
  return (
    <MotionRoot>
      <Hero />
      <main id="main">
        <Manifesto />
        <Anatomy />
        <Film />
        <Appointment />
      </main>
      <Footer />
    </MotionRoot>
  );
}
