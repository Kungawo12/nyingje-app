import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Philosophy from "./components/Philosophy";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Philosophy />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
