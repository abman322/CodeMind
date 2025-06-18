'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface UserProgress {
  courseId: string;
  currentLesson: number;
  progress: number;
  completedLessons: {
    lessonId: number;
    completedAt: string;
    score: number | null;
  }[];
}

interface Course {
  _id: string;
  title: string;
  description: string;
  lessons: any[];
}

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});
  const [courses, setCourses] = useState<Record<string, Course>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) return;

      try {
        // Fetch all courses
        const coursesResponse = await fetch('/api/courses');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const coursesData = await coursesResponse.json();
        
        // Create a map of courses by ID
        const coursesMap = coursesData.reduce((acc: Record<string, Course>, course: Course) => {
          acc[course._id] = course;
          return acc;
        }, {});
        setCourses(coursesMap);

        // Fetch progress for each course
        const progressPromises = coursesData.map((course: Course) =>
          fetch(`/api/progress?courseId=${course._id}`)
            .then(res => res.json())
            .catch(() => null)
        );

        const progressResults = await Promise.all(progressPromises);
        const progressMap = progressResults.reduce((acc: Record<string, UserProgress>, result, index) => {
          if (result && !result.error) {
            acc[coursesData[index]._id] = result;
          }
          return acc;
        }, {});

        setProgress(progressMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-4">Sign in to view your dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName}!</h1>
          <p className="mt-2 text-gray-600">Track your learning progress and continue your courses.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {Object.entries(courses).map(([courseId, course]) => {
            const courseProgress = progress[courseId];
            const progressPercentage = courseProgress
              ? (courseProgress.completedLessons.length / course.lessons.length) * 100
              : 0;

            return (
              <div key={courseId} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="text-gray-600 mt-1">{course.description}</p>
                  </div>
                  <Link
                    href={`/courses/${courseId}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    {courseProgress ? 'Continue Learning' : 'Start Course'}
                  </Link>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {courseProgress && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                      {courseProgress.completedLessons.slice(-3).map((lesson, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Completed Lesson {lesson.lessonId}</span>
                          <span className="ml-auto">
                            {new Date(lesson.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 