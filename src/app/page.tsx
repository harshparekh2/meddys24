import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MenuPreview from "@/components/sections/MenuPreview";
import BoxCricket from "@/components/sections/BoxCricket";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <MenuPreview />
      <BoxCricket />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
