"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  duration: string;
  completed: boolean;
}

const courseData = {
  title: "AI-Assisted Software Development",
  description: "Master the art of leveraging AI tools to enhance your software development workflow while maintaining strong programming fundamentals.",
  instructor: "Sarah Chen",
  level: "Intermediate",
  duration: "8 weeks",
  modules: [
    {
      id: 1,
      title: "Introduction to AI Development Tools",
      description: "Learn about the landscape of AI development tools and how they can enhance your workflow.",
      duration: "2 weeks",
      lessons: [
        { id: 1, title: "Overview of AI Development Tools", type: "video", duration: "45 min", completed: false },
        { id: 2, title: "Setting Up Your Development Environment", type: "reading", duration: "30 min", completed: false },
        { id: 3, title: "First Steps with AI Pair Programming", type: "exercise", duration: "1 hour", completed: false },
        { id: 4, title: "Understanding AI Capabilities and Limitations", type: "quiz", duration: "20 min", completed: false }
      ]
    },
    {
      id: 2,
      title: "Effective Prompt Engineering",
      description: "Master the art of writing effective prompts to get the best results from AI tools.",
      duration: "2 weeks",
      lessons: [
        { id: 5, title: "Principles of Good Prompting", type: "video", duration: "50 min", completed: false },
        { id: 6, title: "Common Prompt Patterns", type: "reading", duration: "40 min", completed: false },
        { id: 7, title: "Prompt Engineering Workshop", type: "exercise", duration: "1.5 hours", completed: false },
        { id: 8, title: "Prompt Optimization Techniques", type: "quiz", duration: "25 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "AI-Enhanced Code Review",
      description: "Learn how to use AI tools to improve your code review process and maintain code quality.",
      duration: "2 weeks",
      lessons: [
        { id: 9, title: "Automated Code Review Tools", type: "video", duration: "55 min", completed: false },
        { id: 10, title: "Best Practices for AI Code Review", type: "reading", duration: "35 min", completed: false },
        { id: 11, title: "Code Review Simulation", type: "exercise", duration: "2 hours", completed: false },
        { id: 12, title: "Code Quality Assessment", type: "quiz", duration: "30 min", completed: false }
      ]
    },
    {
      id: 4,
      title: "Project: Building with AI Assistance",
      description: "Apply your knowledge in a real-world project using AI tools effectively.",
      duration: "2 weeks",
      lessons: [
        { id: 13, title: "Project Planning with AI", type: "video", duration: "60 min", completed: false },
        { id: 14, title: "Implementation Strategies", type: "reading", duration: "45 min", completed: false },
        { id: 15, title: "Final Project Development", type: "exercise", duration: "4 hours", completed: false },
        { id: 16, title: "Project Review and Reflection", type: "quiz", duration: "40 min", completed: false }
      ]
    }
  ]
};

export default function CoursePage() {
  const [activeModule, setActiveModule] = useState<number>(1);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with actual AI integration
    console.log('AI Prompt:', aiPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
          <p className="text-xl mb-6 max-w-3xl">{courseData.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-purple-700 px-3 py-1 rounded-full">Instructor: {courseData.instructor}</span>
            <span className="bg-purple-700 px-3 py-1 rounded-full">Level: {courseData.level}</span>
            <span className="bg-purple-700 px-3 py-1 rounded-full">Duration: {courseData.duration}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="space-y-6">
                {courseData.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`border rounded-lg p-4 ${
                      activeModule === module.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setActiveModule(module.id)}
                      className="w-full text-left"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <span className="text-sm text-gray-500">{module.duration}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{module.description}</p>
                      
                      {activeModule === module.id && (
                        <div className="mt-4 space-y-3">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center space-x-3">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {lesson.completed ? '✓' : lesson.type === 'video' ? '▶' : '📝'}
                                </span>
                                <div>
                                  <h4 className="font-medium">{lesson.title}</h4>
                                  <p className="text-sm text-gray-500">{lesson.type} • {lesson.duration}</p>
                                </div>
                              </div>
                              <button className="text-purple-600 hover:text-purple-700">
                                Start
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
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
                      Ask questions about the course content, get help with exercises, or request explanations of concepts.
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
                          onClick={() => setAiPrompt("Can you explain the key concepts from the current module?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Explain key concepts from current module
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setAiPrompt("How can I apply these concepts in a real project?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Real-world application examples
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setAiPrompt("What are some common challenges in this topic?")}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Common challenges and solutions
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Completed: 0/16 lessons</p>
                    <p>Current Module: {courseData.modules[activeModule - 1].title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 