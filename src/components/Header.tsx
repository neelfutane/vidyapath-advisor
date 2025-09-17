import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAuthClick = () => {
    if (user) {
      return; // Handle user dropdown
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">EduPath Advisor</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigate('/')}>{t('nav.home', 'Home')}</Button>
          <Button variant="ghost" onClick={() => navigate('/course-mapping')}>{t('nav.courseMapping', 'Course Mapping')}</Button>
          <Button variant="ghost" onClick={() => navigate('/government-colleges')}>{t('nav.colleges', 'Colleges')}</Button>
          <Button variant="ghost" onClick={() => navigate('/timeline-tracker')}>{t('nav.timeline', 'Timeline')}</Button>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <User className="h-4 w-4" />
                  {user.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => navigate('/auth')}>
              <User className="h-4 w-4" />
              Login
            </Button>
          )}
          <Button variant="hero" size="sm" onClick={user ? () => navigate('/dashboard') : () => navigate('/auth')}>
            {user ? 'Dashboard' : t('common.getStarted', 'Get Started')}
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