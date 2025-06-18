import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  courseId: string;
  unitId: string;
  lessonId: string;
  questions: QuizQuestion[];
}

export default function Quiz({ courseId, unitId, lessonId, questions }: QuizProps) {
  const { user } = useUser();
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch existing quiz progress
    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `/api/courses/${courseId}/units/${unitId}/lessons/${lessonId}/progress`
        );
        const data = await response.json();
        
        if (data.quizCompleted) {
          setSubmitted(true);
          setScore(data.quizScore);
        }
      } catch (err) {
        console.error('Error fetching quiz progress:', err);
      }
    };

    fetchProgress();
  }, [courseId, unitId, lessonId]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/courses/${courseId}/units/${unitId}/lessons/${lessonId}/progress`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: true,
            quizAnswers: answers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const data = await response.json();
      setSubmitted(true);
      setScore(data.score);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Quiz Results</h3>
        <div className="mb-4">
          <p className="text-lg">
            Your score: {score} out of {questions.length}
          </p>
          <p className="text-sm text-gray-600">
            {score === questions.length
              ? 'Perfect score! Great job!'
              : 'Keep practicing to improve your score.'}
          </p>
        </div>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="font-medium mb-2">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded ${
                      option === question.correctAnswer
                        ? 'bg-green-100'
                        : option === answers[index] && option !== question.correctAnswer
                        ? 'bg-red-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Quiz</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border rounded-lg p-4">
            <p className="font-medium mb-2">
              {index + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="form-radio"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || answers.some((answer) => !answer)}
        className={`mt-6 px-4 py-2 rounded ${
          loading || answers.some((answer) => !answer)
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
} 