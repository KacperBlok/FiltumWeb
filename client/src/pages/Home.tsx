import HeroPremium from '@/components/HeroPremium';
import Navigation from '@/components/Navigation';
import AboutPremium from '@/components/AboutPremium';
import ServicesPremium from '@/components/ServicesPremium';
import GalleryPremium from '@/components/GalleryPremium';
import Booking from '@/components/Booking';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full">
      <Navigation />
      <div id="hero">
        <HeroPremium />
      </div>
      <div id="about">
        <AboutPremium />
      </div>
      <div id="services">
        <ServicesPremium />
      </div>
      <div id="gallery">
        <GalleryPremium />
      </div>
      <div id="booking">
        <Booking />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
