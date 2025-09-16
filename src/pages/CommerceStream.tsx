import React from 'react';
import { ArrowLeft, BookOpen, TrendingUp, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const CommerceStream = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "Accountancy", description: "Recording, measuring, and communicating financial information" },
    { name: "Business Studies", description: "Understanding business operations and management principles" },
    { name: "Economics", description: "Study of production, distribution, and consumption of goods" },
    { name: "Mathematics", description: "Mathematical applications in business and finance" }
  ];

  const careers = [
    { name: "Chartered Accountant", growth: "High", govt: false, salary: "₹6-18 LPA", description: "Professional accountant providing financial services" },
    { name: "Investment Banker", growth: "High", govt: false, salary: "₹8-25 LPA", description: "Financial advisor for investments and mergers" },
    { name: "Tax Officer", growth: "Medium", govt: true, salary: "₹5-12 LPA", description: "Government official managing tax collections" },
    { name: "Business Analyst", growth: "High", govt: false, salary: "₹6-20 LPA", description: "Analyze business processes and recommend improvements" }
  ];

  const colleges = [
    "Shri Ram College of Commerce (SRCC)",
    "Lady Shri Ram College (LSR)",
    "Institute of Chartered Accountants of India (ICAI)",
    "Faculty of Management Studies (FMS)",
    "Indian Institute of Management (IIM)"
  ];

  const quizQuestions = [
    {
      question: "What is the full form of GDP?",
      options: ["Gross Domestic Product", "General Data Protection", "Global Development Program", "Gross Development Product"],
      correct: 0
    },
    {
      question: "Which of the following is a current asset?",
      options: ["Building", "Machinery", "Cash", "Land"],
      correct: 2
    },
    {
      question: "What is the basic principle of accounting?",
      options: ["Revenue Recognition", "Matching Principle", "Going Concern", "All of the above"],
      correct: 3
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
            <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
            Commerce Stream
          </h1>
          <p className="text-xl text-muted-foreground">
            Master the world of business and finance through commerce education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Information Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Core Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="border-l-4 border-green-600 pl-4">
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
                  <TrendingUp className="w-5 h-5 mr-2" />
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
                  Top Colleges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {colleges.map((college, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-green-600" />
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
                  Commerce Quiz
                </CardTitle>
                <CardDescription>
                  Test your knowledge with these commerce questions
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
                    
                    <div className="p-4 bg-green-50 rounded-lg">
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
                                ? 'bg-green-600 text-white border-green-600' 
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
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-green-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-green-800 mb-2">Quiz Complete!</h3>
                      <p className="text-lg text-green-700">
                        Your Score: {score} out of {quizQuestions.length}
                      </p>
                      <p className="text-sm text-green-600 mt-2">
                        {score === quizQuestions.length 
                          ? "Excellent! You have strong commerce knowledge!" 
                          : score >= quizQuestions.length / 2 
                          ? "Good work! Continue exploring commerce concepts."
                          : "Keep learning! Commerce offers many opportunities."}
                      </p>
                    </div>
                    
                    <Button onClick={resetQuiz} className="w-full bg-green-600 hover:bg-green-700">
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

export default CommerceStream;