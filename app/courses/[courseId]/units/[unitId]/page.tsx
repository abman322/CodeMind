'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, CheckCircle } from 'lucide-react';

interface Lesson {
  _id: string;
  title: string;
  type: string;
  content: string;
  estimatedDuration: number;
  difficulty: string;
}

interface Unit {
  _id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  title: string;
  aiAssistant: {
    enabled: boolean;
    context: string;
    capabilities: string[];
  };
}

export default function UnitPage({
  params,
}: {
  params: { courseId: string; unitId: string };
}) {
  const { user } = useUser();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResponse, courseResponse] = await Promise.all([
          fetch(`/api/courses/${params.courseId}/units/${params.unitId}`),
          fetch(`/api/courses/${params.courseId}`),
        ]);

        if (!unitResponse.ok || !courseResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [unitData, courseData] = await Promise.all([
          unitResponse.json(),
          courseResponse.json(),
        ]);

        setUnit(unitData);
        setCourse(courseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.courseId, params.unitId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !unit || !course) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">
              {error || 'Failed to load unit. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <Link
          href={`/courses/${params.courseId}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Unit {unit.order}: {unit.title}
          </h1>
          <p className="text-gray-600 mb-6">{unit.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{unit.estimatedDuration} hours</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-5 h-5 mr-2" />
              <span>{unit.lessons.length} lessons</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons</h2>
          {unit.lessons.map((lesson, index) => (
            <Link
              key={lesson._id}
              href={`/courses/${params.courseId}/units/${params.unitId}/lessons/${lesson._id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {index + 1}. {lesson.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{lesson.content}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {lesson.estimatedDuration} min
                    </span>
                    <span className="text-sm text-gray-500">
                      {lesson.difficulty}
                    </span>
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 