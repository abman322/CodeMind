"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Unit {
  _id: string;
  title: string;
  description: string;
  lessons: Array<{
    _id: string;
    title: string;
    type: string;
  }>;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  units: Unit[];
}

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to load course. Please try again.');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || 'Course not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/courses" className="text-blue-600 hover:text-blue-800">
            ← Back to Courses
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.level === 'beginner'
                  ? 'bg-green-100 text-green-800'
                  : course.level === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </span>
            <span className="text-gray-500">
              {course.units.reduce(
                (acc, unit) => acc + unit.lessons.length,
                0
              )}{' '}
              lessons
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {course.units.map((unit) => (
                <div
                  key={unit._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {unit.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{unit.description}</p>
                    <div className="space-y-3">
                      {unit.lessons.map((lesson) => (
                        <Link
                          key={lesson._id}
                          href={`/courses/${params.courseId}/units/${unit._id}/lessons/${lesson._id}`}
                          className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900">{lesson.title}</span>
                            <span className="text-sm text-gray-500">
                              {lesson.type}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="text-blue-600 font-medium">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Completed Lessons
                  </h3>
                  <p className="text-gray-500">No lessons completed yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 