import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">EduPath Advisor</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#quiz" className="text-foreground hover:text-primary transition-colors">Aptitude Quiz</a>
          <a href="#careers" className="text-foreground hover:text-primary transition-colors">Career Guide</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <User className="h-4 w-4" />
            Login
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;