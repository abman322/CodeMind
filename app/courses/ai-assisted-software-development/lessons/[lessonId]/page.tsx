"use client";

import { useState } from 'react';
import Link from 'next/link';

interface LessonContent {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  content: string;
  resources?: string[];
  exercise?: {
    description: string;
    tasks: string[];
    hints: string[];
  };
}

// This would typically come from an API or database
const lessonContent: Record<number, LessonContent> = {
  1: {
    id: 1,
    title: "Overview of AI Development Tools",
    type: "video",
    content: `
      <h2>Introduction to AI Development Tools</h2>
      <p>In this lesson, we'll explore the landscape of AI development tools and how they're transforming the way we write and maintain code.</p>
      
      <h3>Key Topics:</h3>
      <ul>
        <li>Understanding AI pair programming tools</li>
        <li>Code completion and suggestion systems</li>
        <li>Automated testing and debugging tools</li>
        <li>Code review and quality assessment</li>
      </ul>

      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/placeholder" title="AI Development Tools Overview" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    `,
    resources: [
      "AI Development Tools Comparison Guide",
      "Getting Started with AI Pair Programming",
      "Best Practices for AI-Assisted Development"
    ]
  },
  3: {
    id: 3,
    title: "First Steps with AI Pair Programming",
    type: "exercise",
    content: `
      <h2>Hands-on Exercise: AI Pair Programming</h2>
      <p>In this exercise, you'll work with an AI assistant to complete a simple programming task. This will help you understand how to effectively collaborate with AI tools.</p>
    `,
    exercise: {
      description: "Create a simple task management application using AI assistance",
      tasks: [
        "Set up a new project with basic structure",
        "Implement task creation and listing functionality",
        "Add task completion and deletion features",
        "Implement basic error handling"
      ],
      hints: [
        "Start by describing your requirements to the AI assistant",
        "Break down the task into smaller, manageable steps",
        "Review and understand the AI-generated code",
        "Test each feature as you implement it"
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

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/courses/ai-assisted-software-development" className="text-purple-600 hover:text-purple-700">
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
                  href="/courses/ai-assisted-software-development"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Back to Course
                </Link>
              </div>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />

              {lesson.exercise && (
                <div className="mt-8 space-y-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Exercise: {lesson.exercise.description}</h3>
                    <div className="space-y-4">
                      {lesson.exercise.tasks.map((task, index) => (
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
                  </div>
                </div>
              )}

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