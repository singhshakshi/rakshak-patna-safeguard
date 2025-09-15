import React, { useState } from 'react';
import { Quiz } from '@/types/threat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizCardProps {
  quiz: Quiz;
  onComplete?: (correct: boolean) => void;
}

export default function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an answer",
        description: "Please select an option before submitting",
        variant: "destructive",
      });
      return;
    }

    const correct = selectedAnswer === quiz.correctAnswerId;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: `You earned ${quiz.points} points!`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Review the explanation to learn more",
        variant: "destructive",
      });
    }

    onComplete?.(correct);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Card className="bg-gradient-card shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quick Quiz</CardTitle>
          <Badge className="bg-warning text-warning-foreground">
            <Trophy className="h-3 w-3 mr-1" />
            {quiz.points} pts
          </Badge>
        </div>
        <CardDescription className="text-base mt-2 font-medium">
          {quiz.question}
        </CardDescription>
        {quiz.questionHi && (
          <p className="text-sm text-muted-foreground italic">{quiz.questionHi}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          disabled={submitted}
        >
          {quiz.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                submitted
                  ? option.id === quiz.correctAnswerId
                    ? 'bg-success/20 border border-success'
                    : option.id === selectedAnswer && !isCorrect
                    ? 'bg-destructive/20 border border-destructive'
                    : ''
                  : 'hover:bg-muted'
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label
                htmlFor={option.id}
                className="flex-1 cursor-pointer font-normal"
              >
                <span>{option.text}</span>
                {option.textHi && (
                  <span className="block text-xs text-muted-foreground mt-1">
                    {option.textHi}
                  </span>
                )}
              </Label>
              {submitted && (
                <>
                  {option.id === quiz.correctAnswerId && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {option.id === selectedAnswer && !isCorrect && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </>
              )}
            </div>
          ))}
        </RadioGroup>

        {submitted && (
          <div className="p-3 bg-muted rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm font-medium mb-1">Explanation:</p>
            <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
          </div>
        )}

        <div className="flex gap-2">
          {!submitted ? (
            <Button onClick={handleSubmit} className="flex-1" variant="hero">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleReset} className="flex-1" variant="outline">
              Try Another Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const Badge = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </div>
);