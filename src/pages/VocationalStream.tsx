import React from 'react';
import { ArrowLeft, BookOpen, Wrench, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const VocationalStream = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "ITI Courses", description: "Industrial Training Institute technical courses" },
    { name: "Polytechnic", description: "Diploma courses in engineering and technology" },
    { name: "Skill Development", description: "Practical skill-based training programs" },
    { name: "Trade Courses", description: "Specialized trade and craft courses" }
  ];

  const careers = [
    { name: "Technician", growth: "Medium", govt: true, salary: "₹3-8 LPA", description: "Technical support and maintenance specialist" },
    { name: "Electrician", growth: "High", govt: false, salary: "₹3-10 LPA", description: "Electrical installation and repair expert" },
    { name: "Computer Operator", growth: "Medium", govt: true, salary: "₹2-6 LPA", description: "Computer system operation specialist" },
    { name: "Automobile Mechanic", growth: "High", govt: false, salary: "₹3-12 LPA", description: "Vehicle maintenance and repair specialist" }
  ];

  const colleges = [
    "Industrial Training Institutes (ITI)",
    "Government Polytechnics",
    "National Skill Development Corporation (NSDC)",
    "State Technical Education Boards",
    "Skill India Centers"
  ];

  const quizQuestions = [
    {
      question: "What does ITI stand for?",
      options: ["Indian Technical Institute", "Industrial Training Institute", "Information Technology Institute", "International Trade Institute"],
      correct: 1
    },
    {
      question: "Which tool is commonly used by electricians?",
      options: ["Screwdriver", "Multimeter", "Wire strippers", "All of the above"],
      correct: 3
    },
    {
      question: "What is the duration of most ITI courses?",
      options: ["6 months", "1 year", "2 years", "3 years"],
      correct: 2
    }
  ];

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
            <Wrench className="w-8 h-8 mr-3 text-purple-600" />
            Vocational Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Develop practical skills for immediate employment and career growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Information Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Course Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold">{subject.name}</h4>
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careers.map((career, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{career.name}</h4>
                        <div className="flex gap-2">
                          <Badge variant="outline">{career.growth}</Badge>
                          {career.govt && <Badge className="bg-blue-100 text-blue-800">Govt</Badge>}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                      <p className="text-sm font-medium text-green-600">{career.salary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Training Centers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {colleges.map((college, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-purple-600" />
                      {college}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Vocational Quiz
                </CardTitle>
                <CardDescription>
                  Test your knowledge with these vocational training questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <Badge variant="outline">Score: {score}</Badge>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold mb-4">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-2">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full p-3 text-left rounded-lg border transition-colors ${
                              selectedAnswer === index 
                                ? 'bg-purple-600 text-white border-purple-600' 
                                : 'bg-white hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-purple-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-purple-800 mb-2">Quiz Complete!</h3>
                      <p className="text-lg text-purple-700">
                        Your Score: {score} out of {quizQuestions.length}
                      </p>
                      <p className="text-sm text-purple-600 mt-2">
                        {score === quizQuestions.length 
                          ? "Perfect! You understand vocational training well!" 
                          : score >= quizQuestions.length / 2 
                          ? "Great job! Vocational skills are valuable."
                          : "Keep learning! Practical skills open many doors."}
                      </p>
                    </div>
                    
                    <Button onClick={resetQuiz} className="w-full bg-purple-600 hover:bg-purple-700">
                      Take Quiz Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocationalStream;