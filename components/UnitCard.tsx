import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';

interface Unit {
  _id: string;
  title: string;
  description: string;
  order: number;
  estimatedDuration: number;
  lessons: any[];
}

interface UnitCardProps {
  unit: Unit;
  courseId: string;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, courseId }) => {
  return (
    <Link
      href={`/courses/${courseId}/units/${unit._id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Unit {unit.order}: {unit.title}
            </h3>
            <p className="text-gray-600 mb-4">{unit.description}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{unit.estimatedDuration} hours</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{unit.lessons.length} lessons</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {unit.lessons.map((lesson, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {lesson.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UnitCard; 