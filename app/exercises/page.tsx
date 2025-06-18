import Link from 'next/link';

const exercises = [
  {
    title: "Prompt Engineering Basics",
    description: "Learn how to write effective prompts for AI coding assistants",
    difficulty: "Beginner",
    duration: "30 mins",
    category: "AI Tools",
    href: "/exercises/prompt-engineering"
  },
  {
    title: "Code Review with AI",
    description: "Practice reviewing and improving AI-generated code",
    difficulty: "Intermediate",
    duration: "45 mins",
    category: "Code Quality",
    href: "/exercises/code-review"
  },
  {
    title: "Debugging AI Suggestions",
    description: "Identify and fix issues in AI-generated code",
    difficulty: "Advanced",
    duration: "60 mins",
    category: "Debugging",
    href: "/exercises/debugging"
  }
];

export default function ExercisesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Exercises</h1>
        <p className="text-xl text-gray-600">
          Practice your skills with AI-assisted coding challenges
        </p>
      </div>

      {/* Exercise Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <button className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
          All Exercises
        </button>
        <button className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors">
          AI Tools
        </button>
        <button className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg hover:bg-pink-200 transition-colors">
          Code Quality
        </button>
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          Debugging
        </button>
      </div>

      {/* Exercise List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{exercise.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">Duration: {exercise.duration}</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
                  {exercise.category}
                </span>
              </div>
              
              <Link
                href={exercise.href}
                className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Exercise
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-16 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
          <p className="text-purple-100 mb-6">
            Complete exercises to earn badges and track your learning journey
          </p>
          <Link
            href="/dashboard"
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors inline-block"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 