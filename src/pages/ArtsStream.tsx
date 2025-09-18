import React from 'react';
import { ArrowLeft, BookOpen, Palette, Users, Award, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import ChatBot from '@/components/ChatBot';

const ArtsStream = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "History", description: "Study of past events and civilizations" },
    { name: "Political Science", description: "Analysis of political systems and behavior" },
    { name: "Psychology", description: "Understanding human behavior and mental processes" },
    { name: "English Literature", description: "Study of literary works and language" }
  ];

  const careers = [
    { name: "Civil Services", growth: "Medium", govt: true, salary: "₹7-20 LPA", description: "Administrative services for government" },
    { name: "Lawyer", growth: "High", govt: false, salary: "₹5-25 LPA", description: "Legal advocate representing clients" },
    { name: "Journalist", growth: "Medium", govt: false, salary: "₹4-15 LPA", description: "News reporting and media communication" },
    { name: "Content Creator", growth: "Very High", govt: false, salary: "₹3-20 LPA", description: "Creating digital content for various platforms" }
  ];

  const colleges = [
    "Jawaharlal Nehru University (JNU)",
    "Delhi University (DU)",
    "Banaras Hindu University (BHU)",
    "Jadavpur University",
    "Presidency University"
  ];

  const quizQuestions = [
    {
      question: "Who was the first President of India?",
      options: ["Mahatma Gandhi", "Dr. Rajendra Prasad", "Jawaharlal Nehru", "Dr. APJ Abdul Kalam"],
      correct: 1
    },
    {
      question: "What is the study of human behavior called?",
      options: ["Sociology", "Anthropology", "Psychology", "Philosophy"],
      correct: 2
    },
    {
      question: "Which of these is a figure of speech?",
      options: ["Metaphor", "Paragraph", "Sentence", "Grammar"],
      correct: 0
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
            <Palette className="w-8 h-8 mr-3 text-amber-600" />
            Arts Stream
          </h1>
          <p className="text-xl text-muted-foreground">
            Express creativity and understand society through arts and humanities
          </p>
        </div>

        {/* YouTube Video Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Arts Stream Overview
            </CardTitle>
            <CardDescription>
              Discover the creative possibilities in arts and humanities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9bZkp7q19f0" 
                title="Arts Stream Overview"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>

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
                    <div key={index} className="border-l-4 border-amber-600 pl-4">
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
                  <Palette className="w-5 h-5 mr-2" />
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
                      <Award className="w-4 h-4 mr-2 text-amber-600" />
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
                  Arts Quiz
                </CardTitle>
                <CardDescription>
                  Test your knowledge with these arts and humanities questions
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
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
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
                                ? 'bg-amber-600 text-white border-amber-600' 
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
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      {currentQuestion + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-amber-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">Quiz Complete!</h3>
                      <p className="text-lg text-amber-700">
                        Your Score: {score} out of {quizQuestions.length}
                      </p>
                      <p className="text-sm text-amber-600 mt-2">
                        {score === quizQuestions.length 
                          ? "Outstanding! You have excellent arts knowledge!" 
                          : score >= quizQuestions.length / 2 
                          ? "Well done! Keep exploring arts and humanities."
                          : "Keep learning! Arts offers diverse opportunities."}
                      </p>
                    </div>
                    
                    <Button onClick={resetQuiz} className="w-full bg-amber-600 hover:bg-amber-700">
                      Take Quiz Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default ArtsStream;