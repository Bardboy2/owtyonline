import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MusicSection from "@/components/MusicSection";
import EmailCTA from "@/components/EmailCTA";
import MerchSection from "@/components/MerchSection";
import ProductsSection from "@/components/ProductsSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import NewSongAlert from "@/components/NewSongAlert";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewSongAlert />
      <Navbar />
      <HeroSection />
      <MusicSection />
      <EmailCTA />
      <MerchSection />
      <ProductsSection />
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Index;
