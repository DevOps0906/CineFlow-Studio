import MotionRoot from "@/components/MotionRoot";
import { Demo, Footer, Hero, HowItWorks, Logos, Product } from "@/components/sections/Sections";

export default function Home() {
  return (
    <MotionRoot>
      <Hero />
      <main id="main">
        <Logos />
        <Product />
        <HowItWorks />
        <Demo />
      </main>
      <Footer />
    </MotionRoot>
  );
}
