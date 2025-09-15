import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Brain, ChevronRight, RotateCcw } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "What type of activities do you enjoy most?",
    options: [
      { text: "Solving math problems and experiments", stream: "science", points: 3 },
      { text: "Managing money and business planning", stream: "commerce", points: 3 },
      { text: "Reading, writing, and discussing ideas", stream: "arts", points: 3 },
      { text: "Building and fixing things with hands", stream: "vocational", points: 3 }
    ]
  },
  {
    id: 2,
    question: "Which subject do you find most interesting?",
    options: [
      { text: "Physics, Chemistry, Biology", stream: "science", points: 3 },
      { text: "Mathematics, Economics, Accounting", stream: "commerce", points: 3 },
      { text: "History, Literature, Psychology", stream: "arts", points: 3 },
      { text: "Computer Skills, Technical Drawing", stream: "vocational", points: 3 }
    ]
  },
  {
    id: 3,
    question: "What's your preferred learning style?",
    options: [
      { text: "Experiments and logical analysis", stream: "science", points: 2 },
      { text: "Case studies and data analysis", stream: "commerce", points: 2 },
      { text: "Discussions and creative projects", stream: "arts", points: 2 },
      { text: "Hands-on practical training", stream: "vocational", points: 2 }
    ]
  },
  {
    id: 4,
    question: "What motivates you the most?",
    options: [
      { text: "Making scientific discoveries", stream: "science", points: 2 },
      { text: "Building successful business", stream: "commerce", points: 2 },
      { text: "Helping society and expressing creativity", stream: "arts", points: 2 },
      { text: "Creating something useful with skills", stream: "vocational", points: 2 }
    ]
  },
  {
    id: 5,
    question: "Where do you see yourself working?",
    options: [
      { text: "Hospital, Lab, or Tech Company", stream: "science", points: 3 },
      { text: "Bank, Corporate Office, or Startup", stream: "commerce", points: 3 },
      { text: "Government, Media, or NGO", stream: "arts", points: 3 },
      { text: "Workshop, Factory, or Field Work", stream: "vocational", points: 3 }
    ]
  }
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const option = quizQuestions[currentQuestion].options[selectedOption];
      setAnswers(prev => ({
        ...prev,
        [option.stream]: (prev[option.stream] || 0) + option.points
      }));

      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const getRecommendation = () => {
    const maxScore = Math.max(...Object.values(answers));
    const recommended = Object.entries(answers).find(([_, score]) => score === maxScore)?.[0];
    return recommended;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedOption(null);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const recommendation = getRecommendation();
    const streamNames = {
      science: "Science Stream",
      commerce: "Commerce Stream", 
      arts: "Arts Stream",
      vocational: "Vocational Courses"
    };

    return (
      <section id="quiz" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-success rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Based on your answers, here's our recommendation</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-primary rounded-lg text-white">
                <h3 className="text-xl font-bold mb-2">Recommended Path</h3>
                <p className="text-2xl font-bold">{streamNames[recommendation as keyof typeof streamNames]}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Your Score Breakdown:</h4>
                <div className="space-y-2">
                  {Object.entries(answers).map(([stream, score]) => (
                    <div key={stream} className="flex justify-between items-center">
                      <span className="capitalize">{streamNames[stream as keyof typeof streamNames]}</span>
                      <Badge variant={stream === recommendation ? "default" : "outline"}>
                        {score} points
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="hero" size="lg" className="w-full">
                  Explore {streamNames[recommendation as keyof typeof streamNames]} Details
                </Button>
                <Button variant="outline" onClick={resetQuiz} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Aptitude Quiz
          </h2>
          <p className="text-lg text-muted-foreground">
            Answer 5 simple questions to get personalized career stream recommendations
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </CardTitle>
              <Badge variant="outline">
                <Brain className="h-3 w-3 mr-1" />
                Aptitude Quiz
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedOption === index
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion + 1 === quizQuestions.length ? 'Get Results' : 'Next Question'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuizSection;