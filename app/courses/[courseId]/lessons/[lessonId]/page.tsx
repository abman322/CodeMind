"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Lesson {
  title: string;
  type: string;
  content: string;
  videoUrl?: string;
  resources?: string[];
  exercise?: {
    description: string;
    tasks: string[];
    hints: string[];
    starterCode: string;
  };
}

interface Course {
  _id: string;
  title: string;
  description: string;
  level: string;
  lessons: Lesson[];
}

export default function LessonPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const { isSignedIn } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Lesson</h2>
          <p className="text-gray-600 mb-4">{error || 'Course not found'}</p>
          <Link
            href="/courses"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const lessonIndex = parseInt(params.lessonId);
  const lesson = course.lessons[lessonIndex];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h2>
          <p className="text-gray-600 mb-4">The requested lesson does not exist.</p>
          <Link
            href={`/courses/${params.courseId}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        );
      case 'reading':
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        );
      case 'exercise':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
            {lesson.exercise && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{lesson.exercise.description}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Tasks:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {lesson.exercise.tasks.map((task, index) => (
                        <li key={index} className="text-gray-700">{task}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Starter Code:</h4>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <code>{lesson.exercise.starterCode}</code>
                    </pre>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {showHints ? 'Hide Hints' : 'Show Hints'}
                    </button>
                    {showHints && (
                      <ul className="list-disc list-inside space-y-2 mt-2">
                        {lesson.exercise.hints.map((hint, index) => (
                          <li key={index} className="text-gray-700">{hint}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div className="prose max-w-none">{lesson.content}</div>;
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
                  href={`/courses/${params.courseId}`}
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

          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Course Navigation</h3>
              <div className="space-y-2">
                {course.lessons.map((l, index) => (
                  <Link
                    key={index}
                    href={`/courses/${params.courseId}/lessons/${index}`}
                    className={`block p-3 rounded-lg ${
                      index === lessonIndex
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{l.title}</span>
                      <span className="text-sm text-gray-500">
                        {l.type.charAt(0).toUpperCase() + l.type.slice(1)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 