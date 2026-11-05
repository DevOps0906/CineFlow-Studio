import MotionRoot from "@/components/MotionRoot";
import { CTA, Features, Footer, Hero, Proof, Showcase } from "@/components/sections/Sections";

export default function Home() {
  return (
    <MotionRoot>
      <Hero />
      <main id="main">
        <Proof />
        <Features />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </MotionRoot>
  );
}
