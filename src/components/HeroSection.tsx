import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Target, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-accent"> Career Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Confused about which stream to choose after Class 10 or 12? 
            Get personalized guidance to make the right career decisions.
          </p>
        </div>
        
        <div className="animate-scale-in delay-300">
          <Button variant="secondary" size="lg" className="text-lg px-8 py-4 mb-12 group">
            Take Career Quiz Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in delay-500">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <Compass className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Smart Guidance</h3>
            <p className="text-white/80">AI-powered recommendations based on your interests and aptitude</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <Target className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Career Mapping</h3>
            <p className="text-white/80">Visual guides showing paths from subjects to careers</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Local Support</h3>
            <p className="text-white/80">Support for Indian education system and multiple languages</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;