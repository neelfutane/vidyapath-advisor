import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.quiz": "Aptitude Quiz",
      "nav.careers": "Career Guide",
      "nav.about": "About",
      "nav.courseMapping": "Course Mapping",
      "nav.colleges": "Government Colleges",
      "nav.timeline": "Timeline Tracker",
      
      // Common
      "common.getStarted": "Get Started",
      "common.learnMore": "Learn More",
      "common.next": "Next",
      "common.back": "Back",
      "common.submit": "Submit",
      "common.loading": "Loading...",
      "common.search": "Search",
      "common.filter": "Filter",
      
      // Hero Section
      "hero.title": "Discover Your Perfect Career Path",
      "hero.subtitle": "AI-powered career guidance to help students make informed decisions about their future",
      
      // Career Streams
      "streams.science": "Science Stream",
      "streams.commerce": "Commerce Stream",
      "streams.arts": "Arts Stream",
      "streams.vocational": "Vocational Stream",
      
      // Course Mapping
      "courseMapping.title": "Course to Career Mapping",
      "courseMapping.subtitle": "Explore how different courses lead to various career opportunities",
      
      // Government Colleges
      "colleges.title": "Government Colleges Directory",
      "colleges.subtitle": "Find government colleges near you with course details and admission information",
      
      // Timeline Tracker
      "timeline.title": "Academic Timeline Tracker",
      "timeline.subtitle": "Stay updated with important dates and deadlines",
      
      // Chatbot
      "chatbot.title": "Career Assistant",
      "chatbot.welcome": "Hi! Ask me anything about careers and education.",
      "chatbot.placeholder": "Ask me anything...",
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.home": "मुख्य पृष्ठ",
      "nav.quiz": "योग्यता परीक्षा",
      "nav.careers": "करियर गाइड",
      "nav.about": "के बारे में",
      "nav.courseMapping": "कोर्स मैपिंग",
      "nav.colleges": "सरकारी कॉलेज",
      "nav.timeline": "समयसीमा ट्रैकर",
      
      // Common
      "common.getStarted": "शुरू करें",
      "common.learnMore": "और जानें",
      "common.next": "अगला",
      "common.back": "वापस",
      "common.submit": "जमा करें",
      "common.loading": "लोड हो रहा है...",
      "common.search": "खोजें",
      "common.filter": "फ़िल्टर",
      
      // Hero Section
      "hero.title": "अपना सही करियर पथ खोजें",
      "hero.subtitle": "AI-आधारित करियर मार्गदर्शन जो छात्रों को अपने भविष्य के बारे में सूचित निर्णय लेने में मदद करता है",
      
      // Career Streams
      "streams.science": "विज्ञान स्ट्रीम",
      "streams.commerce": "वाणिज्य स्ट्रीम",
      "streams.arts": "कला स्ट्रीम",
      "streams.vocational": "व्यावसायिक स्ट्रीम",
      
      // Course Mapping
      "courseMapping.title": "कोर्स से करियर मैपिंग",
      "courseMapping.subtitle": "जानें कि विभिन्न कोर्स कैसे विभिन्न करियर अवसरों की ओर ले जाते हैं",
      
      // Government Colleges
      "colleges.title": "सरकारी कॉलेज निर्देशिका",
      "colleges.subtitle": "कोर्स विवरण और प्रवेश जानकारी के साथ अपने पास के सरकारी कॉलेज खोजें",
      
      // Timeline Tracker
      "timeline.title": "शैक्षणिक समयसीमा ट्रैकर",
      "timeline.subtitle": "महत्वपूर्ण तारीखों और समयसीमा के साथ अपडेट रहें",
      
      // Chatbot
      "chatbot.title": "करियर सहायक",
      "chatbot.welcome": "नमस्ते! करियर और शिक्षा के बारे में कुछ भी पूछें।",
      "chatbot.placeholder": "कुछ भी पूछें...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;