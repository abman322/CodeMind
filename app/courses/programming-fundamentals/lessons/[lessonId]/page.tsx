"use client";

import { useState } from 'react';
import Link from 'next/link';

interface LessonContent {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  content: string;
  videoUrl?: string;
  resources?: string[];
  exercise?: {
    description: string;
    tasks: string[];
    hints: string[];
    starterCode?: string;
  };
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

// This would typically come from an API or database
const lessonContent: Record<number, LessonContent> = {
  // Video Lesson
  1: {
    id: 1,
    title: "Introduction to Programming Concepts",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    content: `
      <h2>Welcome to Programming!</h2>
      <p>In this lesson, we'll explore the fundamental concepts of programming and how they relate to modern software development.</p>
      
      <h3>Key Topics:</h3>
      <ul>
        <li>What is Programming?</li>
        <li>How Computers Process Information</li>
        <li>Basic Programming Concepts</li>
        <li>Introduction to AI-Assisted Development</li>
      </ul>
    `,
    resources: [
      "Programming Basics Cheat Sheet",
      "Common Programming Terms",
      "Getting Started with AI Tools"
    ]
  },
  // Reading Lesson
  2: {
    id: 2,
    title: "Setting Up Your Development Environment",
    type: "reading",
    content: `
      <h2>Setting Up Your Development Environment</h2>
      <p>Before you start coding, you need to set up your development environment. This includes installing the necessary tools and configuring your workspace.</p>
      
      <h3>Required Tools:</h3>
      <ul>
        <li>Python 3.x</li>
        <li>Visual Studio Code</li>
        <li>Git</li>
        <li>AI Development Tools</li>
      </ul>

      <h3>Installation Steps:</h3>
      <ol>
        <li>Download and install Python from python.org</li>
        <li>Install Visual Studio Code</li>
        <li>Set up Git for version control</li>
        <li>Configure AI development tools</li>
      </ol>
    `,
    resources: [
      "Python Installation Guide",
      "VS Code Setup Tutorial",
      "Git Configuration Guide"
    ]
  },
  // Exercise Lesson
  4: {
    id: 4,
    title: "Your First Program with AI Assistance",
    type: "exercise",
    content: `
      <h2>Hands-on Exercise: Your First Program</h2>
      <p>In this exercise, you'll create your first program with the help of AI tools. We'll build a simple calculator that can perform basic arithmetic operations.</p>
    `,
    exercise: {
      description: "Create a simple calculator program using Python",
      tasks: [
        "Set up a new Python project",
        "Create a function to handle basic arithmetic operations",
        "Implement user input handling",
        "Add error handling for invalid inputs"
      ],
      hints: [
        "Start by defining your main function",
        "Use Python's input() function to get user input",
        "Consider using a dictionary to map operations to functions",
        "Use try-except blocks for error handling"
      ],
      starterCode: `def calculator():
    # Your code here
    pass

if __name__ == "__main__":
    calculator()`
    }
  },
  // Quiz Lesson
  8: {
    id: 8,
    title: "Working with AI to Debug Code",
    type: "quiz",
    content: `
      <h2>Quiz: Debugging with AI</h2>
      <p>Test your understanding of using AI tools for debugging and code improvement.</p>
    `,
    quiz: {
      questions: [
        {
          question: "What is the first step when debugging code with AI assistance?",
          options: [
            "Ask the AI to fix the code immediately",
            "Understand the error message and context",
            "Delete the problematic code",
            "Start a new project"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is NOT a good practice when using AI for debugging?",
          options: [
            "Providing clear error messages",
            "Understanding the AI's suggestions",
            "Blindly accepting all AI suggestions",
            "Testing the fixed code"
          ],
          correctAnswer: 2
        }
      ]
    }
  }
};

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const lessonId = parseInt(params.lessonId);
  const lesson = lessonContent[lessonId];
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showHint, setShowHint] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [code, setCode] = useState(lesson?.exercise?.starterCode || '');

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/courses/programming-fundamentals" className="text-purple-600 hover:text-purple-700">
            Return to Course
          </Link>
        </div>
      </div>
    );
  }

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with actual AI integration
    console.log('AI Prompt:', aiPrompt);
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">AI-Powered Summary</h3>
              <p className="text-gray-600">
                Click the button below to get an AI-generated summary of this video lesson.
              </p>
              <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Generate Summary
              </button>
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">AI Reading Assistant</h3>
              <p className="text-gray-600">
                Need help understanding any part of this reading? Ask the AI assistant for clarification.
              </p>
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Exercise: {lesson.exercise?.description}</h3>
              <div className="space-y-4">
                {lesson.exercise?.tasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="flex-grow">
                      <p className="text-gray-700">{task}</p>
                      <button
                        onClick={() => setShowHint(showHint === index ? null : index)}
                        className="text-sm text-purple-600 hover:text-purple-700 mt-2"
                      >
                        {showHint === index ? 'Hide Hint' : 'Show Hint'}
                      </button>
                      {showHint === index && (
                        <p className="mt-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
                          {lesson.exercise?.hints[index]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Code Editor</h4>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
                <div className="mt-4 flex space-x-4">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Run Code
                  </button>
                  <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200">
                    Get AI Help
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-6">
                {lesson.quiz?.questions.map((question, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={selectedAnswers[index] === optionIndex}
                            onChange={() => {
                              const newAnswers = [...selectedAnswers];
                              newAnswers[index] = optionIndex;
                              setSelectedAnswers(newAnswers);
                            }}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {showResults && (
                      <div className={`mt-2 p-3 rounded-lg ${
                        selectedAnswers[index] === question.correctAnswer
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedAnswers[index] === question.correctAnswer
                          ? 'Correct!'
                          : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                  <p className="text-gray-600">{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</p>
                </div>
                <Link
                  href="/courses/programming-fundamentals"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Back to Course
                </Link>
              </div>

              {renderLessonContent()}

              {lesson.resources && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                  <ul className="space-y-2">
                    {lesson.resources.map((resource, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-purple-600">📚</span>
                        <span className="text-gray-700">{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI Learning Assistant</h3>
                <button
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {showAIAssistant ? 'Hide' : 'Show'}
                </button>
              </div>

              {showAIAssistant && (
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Get help with this lesson, ask questions, or request explanations of concepts.
                    </p>
                  </div>

                  <form onSubmit={handleAISubmit} className="space-y-4">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ask your question..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Get AI Assistance
                    </button>
                  </form>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Suggested Questions:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          onClick={() => setAiPrompt("Can you explain the main concept of this lesson?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Explain main concept
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setAiPrompt("How can I apply this in a real project?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Real-world application
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setAiPrompt("What are some common mistakes to avoid?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Common mistakes
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Lesson Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Completion Status</span>
                    <span>Not Started</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 