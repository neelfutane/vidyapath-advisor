import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatBot } from "@/components/ChatBot";
import { BookOpen, Calculator, Palette, Wrench, ArrowRight, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const careerPaths = [
  {
    id: "science",
    title: "Science Stream",
    description: "Explore the world of discovery and innovation",
    icon: Calculator,
    color: "#3b82f6",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    careers: [
      { name: "Doctor", growth: "High", govt: true },
      { name: "Engineer", growth: "High", govt: true },
      { name: "Researcher", growth: "Medium", govt: true },
      { name: "Data Scientist", growth: "Very High", govt: false }
    ],
    topColleges: ["IIT", "AIIMS", "IISc"],
    averageSalary: "₹6-15 LPA"
  },
  {
    id: "commerce",
    title: "Commerce Stream", 
    description: "Master the world of business and finance",
    icon: TrendingUp,
    color: "#10b981",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    careers: [
      { name: "Chartered Accountant", growth: "High", govt: false },
      { name: "Investment Banker", growth: "High", govt: false },
      { name: "Tax Officer", growth: "Medium", govt: true },
      { name: "Business Analyst", growth: "High", govt: false }
    ],
    topColleges: ["SRCC", "LSR", "ICAI"],
    averageSalary: "₹4-12 LPA"
  },
  {
    id: "arts",
    title: "Arts Stream",
    description: "Express creativity and understand society",
    icon: Palette,
    color: "#f59e0b",
    subjects: ["History", "Political Science", "Psychology", "English"],
    careers: [
      { name: "Civil Services", growth: "Medium", govt: true },
      { name: "Lawyer", growth: "High", govt: false },
      { name: "Journalist", growth: "Medium", govt: false },
      { name: "Content Creator", growth: "Very High", govt: false }
    ],
    topColleges: ["JNU", "DU", "BHU"],
    averageSalary: "₹3-10 LPA"
  },
  {
    id: "vocational",
    title: "Vocational Courses",
    description: "Develop practical skills for immediate employment",
    icon: Wrench,
    color: "#8b5cf6",
    subjects: ["ITI", "Polytechnic", "Skill Development", "Trade Courses"],
    careers: [
      { name: "Technician", growth: "Medium", govt: true },
      { name: "Electrician", growth: "High", govt: false },
      { name: "Computer Operator", growth: "Medium", govt: true },
      { name: "Automobile Mechanic", growth: "High", govt: false }
    ],
    topColleges: ["ITI", "Polytechnics", "NSDC"],
    averageSalary: "₹2-6 LPA"
  }
];

const CareerPathsSection = () => {
  return (
    <section id="careers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Explore Career Paths
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what each stream can lead to and make an informed decision about your future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {careerPaths.map((path, index) => (
            <Card key={path.id} className="group hover:shadow-medium transition-all duration-300 animate-scale-in border-l-4 border-l-primary" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: path.color }}
                    >
                      <path.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {path.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {path.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {path.averageSalary}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Key Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Top Careers
                  </h4>
                  <div className="space-y-2">
                    {path.careers.slice(0, 3).map((career) => (
                      <div key={career.name} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{career.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={career.growth === "Very High" ? "default" : career.growth === "High" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {career.growth}
                          </Badge>
                          {career.govt && (
                            <Badge variant="outline" className="text-xs text-success">
                              Govt
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Top Colleges
                  </h4>
                  <p className="text-sm text-foreground">{path.topColleges.join(", ")}</p>
                </div>

                <Button variant="outline" className="w-full group">
                  Learn More About {path.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
              
              <ChatBot stream={path.title} streamColor={path.color} />
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="px-8">
            Take Aptitude Quiz to Find Your Best Fit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerPathsSection;