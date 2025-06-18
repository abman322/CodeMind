import Link from 'next/link';

const resources = [
  {
    title: "AI Tools Guide",
    description: "Comprehensive guide to popular AI coding assistants and their features",
    type: "Guide",
    tags: ["AI Tools", "Getting Started"],
    href: "/resources/ai-tools-guide"
  },
  {
    title: "Prompt Engineering Tips",
    description: "Best practices for writing effective prompts for AI coding assistants",
    type: "Article",
    tags: ["Prompt Engineering", "Best Practices"],
    href: "/resources/prompt-engineering"
  },
  {
    title: "Code Review Checklist",
    description: "Essential checklist for reviewing AI-generated code",
    type: "Template",
    tags: ["Code Review", "Quality"],
    href: "/resources/code-review"
  }
];

const tools = [
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write better code",
    category: "Code Assistant",
    link: "https://github.com/features/copilot"
  },
  {
    name: "ChatGPT",
    description: "Versatile AI assistant for coding and problem-solving",
    category: "AI Assistant",
    link: "https://chat.openai.com"
  },
  {
    name: "DeepSeek",
    description: "Advanced AI coding assistant with specialized features",
    category: "Code Assistant",
    link: "https://deepseek.com"
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
        <p className="text-xl text-gray-600">
          Explore guides, articles, and tools to enhance your AI-assisted programming skills
        </p>
      </div>

      {/* Resources Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {resource.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={resource.href}
                  className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Resource
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {tool.category}
                </span>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Visit Tool →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-purple-100 mb-6">
            Subscribe to our newsletter for the latest resources and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 