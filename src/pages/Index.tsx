import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CareerPathsSection from "@/components/CareerPathsSection";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CareerPathsSection />
        <QuizSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
