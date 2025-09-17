import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ScienceStream from "./pages/ScienceStream";
import CommerceStream from "./pages/CommerceStream";
import ArtsStream from "./pages/ArtsStream";
import VocationalStream from "./pages/VocationalStream";
import CourseMapping from "./pages/CourseMapping";
import GovernmentColleges from "./pages/GovernmentColleges";
import TimelineTracker from "./pages/TimelineTracker";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/science-stream" element={<ScienceStream />} />
              <Route path="/commerce-stream" element={<CommerceStream />} />
              <Route path="/arts-stream" element={<ArtsStream />} />
              <Route path="/vocational-stream" element={<VocationalStream />} />
              <Route path="/course-mapping" element={<CourseMapping />} />
              <Route path="/government-colleges" element={<GovernmentColleges />} />
              <Route path="/timeline-tracker" element={<TimelineTracker />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
