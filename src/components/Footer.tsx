import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">EduPath Advisor</span>
            </div>
            <p className="text-primary-foreground/80">
              Empowering Indian students to make informed career decisions with personalized guidance and comprehensive resources.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#quiz" className="hover:text-white transition-colors">Aptitude Quiz</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Career Guide</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Scholarship Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">College Directory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Study Materials</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@edupathadvisor.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 EduPath Advisor. All rights reserved. Built to empower Indian students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;