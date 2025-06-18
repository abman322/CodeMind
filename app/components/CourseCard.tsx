import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  href: string;
}

export default function CourseCard({
  title,
  description,
  level,
  duration,
  topics,
  href,
}: CourseCardProps) {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[level]}`}>
            {level}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500">Duration: {duration}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Topics covered:</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <Link
          href={href}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Course
        </Link>
      </div>
    </div>
  );
} 