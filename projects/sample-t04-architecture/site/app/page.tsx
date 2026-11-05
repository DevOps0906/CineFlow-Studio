import MotionRoot from "@/components/MotionRoot";
import { Contact, Footer, Hero, Principles, Process, Proof, Works } from "@/components/sections/Sections";

export default function Home() {
  return (
    <MotionRoot>
      <Hero />
      <main id="main">
        <Proof />
        <Principles />
        <Process />
        <Works />
        <Contact />
      </main>
      <Footer />
    </MotionRoot>
  );
}
