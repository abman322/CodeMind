'use client';

import { useEffect, useState, use } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Quiz from '@/app/components/Quiz';
import AIAssistant from '@/components/AIAssistant';
import ReactMarkdown from 'react-markdown';
import Chatbot from '@/components/Chatbot';

interface Lesson {
  _id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  content: string;
  videoUrl?: string;
  exercise?: {
    task: string;
    starterCode: string;
    hints: string[];
  };
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  estimatedDuration?: number;
  difficulty?: string;
}

interface Unit {
  _id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  title: string;
  description: string;
  units: Unit[];
  aiAssistant?: {
    enabled: boolean;
    context: string;
    capabilities: string[];
  };
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; unitId: string; lessonId: string }>;
}) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonResponse, courseResponse] = await Promise.all([
          fetch(`/api/courses/${resolvedParams.courseId}/units/${resolvedParams.unitId}/lessons/${resolvedParams.lessonId}`),
          fetch(`/api/courses/${resolvedParams.courseId}`),
        ]);

        if (!lessonResponse.ok || !courseResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [lessonData, courseData] = await Promise.all([
          lessonResponse.json(),
          courseResponse.json(),
        ]);

        setLesson(lessonData);
        setCourse(courseData);
      } catch (err) {
        setError('Failed to load lesson. Please try again.');
        console.error('Error fetching lesson:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.courseId, resolvedParams.unitId, resolvedParams.lessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || 'Lesson not found'}</div>
      </div>
    );
  }

  const unit = course.units.find((u) => u._id === resolvedParams.unitId);
  if (!unit) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Unit not found</div>
      </div>
    );
  }

  const currentLessonIndex = unit.lessons.findIndex((l) => l._id === resolvedParams.lessonId);
  const prevLesson = currentLessonIndex > 0 ? unit.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < unit.lessons.length - 1 ? unit.lessons[currentLessonIndex + 1] : null;

  // Badge color by lesson type
  const typeColors: Record<string, string> = {
    video: 'bg-blue-100 text-blue-800',
    reading: 'bg-green-100 text-green-800',
    exercise: 'bg-yellow-100 text-yellow-800',
    quiz: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href={`/courses/${resolvedParams.courseId}/units/${resolvedParams.unitId}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Unit
          </Link>
          <div className="flex space-x-4">
            {prevLesson && (
              <Link
                href={`/courses/${resolvedParams.courseId}/units/${resolvedParams.unitId}/lessons/${prevLesson._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Previous
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${resolvedParams.courseId}/units/${resolvedParams.unitId}/lessons/${nextLesson._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main lesson content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              {/* Lesson Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className={`px-3 py-1 rounded-full font-semibold ${typeColors[lesson.type]}`}>
                      {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                    </span>
                    {lesson.estimatedDuration && (
                      <span className="text-gray-500">⏱ {lesson.estimatedDuration} min</span>
                    )}
                    {lesson.difficulty && (
                      <span className="text-gray-500">• {lesson.difficulty}</span>
                    )}
                    <span className="text-gray-400">
                      Lesson {currentLessonIndex + 1} of {unit.lessons.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="prose max-w-none text-lg text-gray-800">
                {lesson.type === 'video' && lesson.videoUrl && (
                  <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={lesson.videoUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                )}

                {lesson.type === 'reading' && (
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 mt-6" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2 mt-4" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        code: ({ node, inline, ...props }) => (
                          inline ? (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />
                          ) : (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                              <code className="text-sm" {...props} />
                            </pre>
                          )
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                        ),
                      }}
                    >
                      {lesson.content}
                    </ReactMarkdown>
                  </div>
                )}

                {lesson.type === 'exercise' && lesson.exercise && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Task</h3>
                      <p className="text-gray-700">{lesson.exercise.task}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Starter Code</h3>
                      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-base">
                        <code>{lesson.exercise.starterCode}</code>
                      </pre>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Hints</h3>
                      <div className="space-y-2">
                        {lesson.exercise.hints.map((hint, index) => (
                          <details key={index} className="bg-gray-50 p-3 rounded-lg text-gray-700">
                            <summary className="cursor-pointer font-medium">Hint {index + 1}</summary>
                            <div className="mt-2">{hint}</div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {lesson.type === 'quiz' && lesson.quiz && (
                  <div className="my-6">
                    <Quiz
                      courseId={resolvedParams.courseId}
                      unitId={resolvedParams.unitId}
                      lessonId={resolvedParams.lessonId}
                      questions={lesson.quiz.questions}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Coding Assistant Card */}
            <div className="rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-2xl">💡</span>
                  <h2 className="text-white text-lg font-semibold">AI Coding Assistant</h2>
                </div>
                <p className="text-white text-sm mt-1">Ask for hints, code reviews, or explanations</p>
              </div>
              <div className="bg-white p-4 h-[400px] flex flex-col">
                <Chatbot
                  lessonContent={lesson.content}
                  courseId={resolvedParams.courseId}
                  unitId={resolvedParams.unitId}
                  lessonId={resolvedParams.lessonId}
                />
              </div>
            </div>
            {/* Unit Progress */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Unit Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Lessons</span>
                  <span className="text-blue-600 font-medium">
                    {currentLessonIndex + 1} of {unit.lessons.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${((currentLessonIndex + 1) / unit.lessons.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Course Navigation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Course Navigation</h2>
              <div className="space-y-6">
                {course.units.map((unit) => (
                  <div key={unit._id} className="space-y-2">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {unit.title}
                    </h3>
                    <div className="pl-6 space-y-1 border-l-2 border-gray-100">
                      {unit.lessons.map((lesson) => (
                        <Link
                          key={lesson._id}
                          href={`/courses/${resolvedParams.courseId}/units/${unit._id}/lessons/${lesson._id}`}
                          className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
                            lesson._id === resolvedParams.lessonId
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                          }`}
                        >
                          {lesson.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 