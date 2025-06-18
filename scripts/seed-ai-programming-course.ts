import mongoose from 'mongoose';
import Course from '../models/Course';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const aiProgrammingCourse = {
  title: "Programming in the AI Age",
  description: "A comprehensive course that teaches programming fundamentals while leveraging AI tools and understanding their impact on modern software development.",
  level: "beginner",
  units: [
    {
      title: "Foundations of Programming in the AI Age",
      description: "Understanding the basics of programming and how AI is transforming the field",
      order: 1,
      lessons: [
        {
          title: "What is Programming? (Historical and practical overview)",
          type: "reading",
          content: `## Introduction
Programming is the art and science of instructing a computer to carry out specific tasks. From smartphones to satellites, nearly every modern device depends on software created by programmers. This lesson introduces the fundamentals of programming: what it is, how it evolved, and how it forms the foundation of digital literacy today.

## What is a Program?
A program is a set of precise instructions that a computer can execute to achieve a goal. These instructions are written in programming languages, which act as a bridge between human ideas and machine execution.

Think of a recipe:
- The chef is the computer.
- The recipe is the program.
- The ingredients are the data.

If the recipe is missing steps or unclear, the dish may fail—just like code that doesn’t work due to bugs or logical errors.

## Programming vs. Coding
Coding refers to writing instructions in a specific language (e.g., Python, Java).

Programming includes coding, but also problem-solving, planning, testing, and debugging.

Analogy: Coding is like typing words, while programming is like writing an entire novel.

## A Brief History of Programming
- 1940s – Machine code (0s and 1s)
- 1950s–60s – FORTRAN, COBOL (first high-level languages)
- 1970s–80s – C, Pascal (structured programming)
- 1990s–2000s – Java, Python (object-oriented, accessible)
- Today – AI-assisted development using tools like GitHub Copilot, ChatGPT, and Replit Ghostwriter

## Algorithmic Thinking
An algorithm is a step-by-step process to solve a problem. For example:

**Algorithm: Making a Cup of Coffee**
1. Boil water.
2. Place coffee grounds in filter.
3. Pour hot water over grounds.
4. Wait for brew to finish.
5. Serve and enjoy.

This logical sequencing is the essence of programming, whether in coffee-making or building an app.

## Activity: Write Pseudocode
Write down steps for a familiar task (e.g., brushing your teeth). Avoid vagueness—be specific.

\`\`\`markdown
1. Pick up toothbrush
2. Apply toothpaste
3. Turn on faucet
4. Wet brush
5. Brush top and bottom teeth for 2 minutes
6. Rinse and clean up
\`\`\`
This exercise mirrors the mindset of a programmer: breaking tasks into logical, repeatable steps.

## Key Takeaways
- Programming allows us to control technology logically.
- Coding is a part of programming, but programming is a broader process.
- Learning to program is learning how to think computationally.
`,
          estimatedDuration: 45,
          difficulty: "beginner"
        },
        {
          title: "How AI Is Changing the Landscape of Coding",
          type: "reading",
          content: `## Introduction
Artificial Intelligence is no longer just a buzzword. It’s rapidly transforming how software is written, tested, and maintained. In this lesson, we explore how AI is reshaping programming and what it means for beginners.

## The Rise of AI-Powered Code Tools
AI tools like ChatGPT, GitHub Copilot, and Amazon CodeWhisperer use large language models to generate code suggestions based on user input.

How it works:
1. You describe what you want (a function to sort a list).
2. The AI predicts and writes the most likely code.
3. You review and edit the results.

These tools are trained on millions of lines of code, enabling them to autocomplete, translate, and explain programming tasks.

## Benefits for Beginners
- Speeds up learning: AI can explain concepts and write basic programs.
- Reduces frustration: Suggests syntax corrections and alternative solutions.
- Improves productivity: Automates repetitive or boilerplate code.

Example: A student asks, “How do I reverse a string in Python?” ChatGPT gives:

\`\`\`python
my_string = "hello"
reversed_string = my_string[::-1]
\`\`\`

## Challenges and Risks
- Over-reliance: Using AI without understanding can create dependency.
- Blind trust: AI can generate buggy or insecure code.
- Learning gap: If beginners skip foundational learning, they may struggle with debugging or complex tasks.

## The AI-Programmer Relationship
Instead of viewing AI as a replacement, think of it as a collaborator or co-pilot.

“AI helps you fly, but you still need to know how to land.”

Use AI to:
- Brainstorm solutions.
- Learn new syntax.
- Generate templates or scaffolding.

Avoid using AI to:
- Solve problems you don’t understand.
- Submit AI-generated code as your own learning.

## Best Practices
- Always review and test AI-generated code.
- Understand the code before copying.
- Use AI to learn, not to avoid learning.
`,
          estimatedDuration: 45,
          difficulty: "beginner"
        },
        {
          title: "Cognitive Models of AI (Co-creation vs. Automation)",
          type: "reading",
          content: `## Introduction
Generative AI tools are not magic—they\'re trained on massive datasets to predict the next word or line of code. Understanding this helps us interact with them more effectively. This lesson explores how to work with AI as a partner, not a substitute.

## How AI Models Work (Simplified)
AI models like ChatGPT and Copilot are language models trained on patterns in human-written code and text. When you provide a prompt, the AI predicts what code should come next based on probability.

Example:
Prompt: “Write a Python function to check if a number is prime.”
The AI searches its internal model of code and returns:

\`\`\`python
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True
\`\`\`

The AI didn’t think—it recognized a familiar pattern.

## Prompt Engineering: The New Programming Skill
The quality of the result depends on how you ask.

Vague: “Make a website”

Better: “Create a single-page HTML portfolio website with sections for About, Projects, and Contact.”

Best: “Create an HTML page titled \'My Portfolio\' with a navigation bar, three sections (\'About Me\', \'Projects\', and \'Contact\'), using simple CSS for styling.”

Prompting is like giving clear instructions to a junior developer.

## Collaborative Mindset: Human + AI
AI can:
- Generate starter code.
- Explain unfamiliar code.
- Suggest optimizations.

You must:
- Evaluate accuracy.
- Refine and debug.
- Consider ethical and security implications.

This mindset shift—from AI as a threat to AI as a tool—will define your success in this new programming era.

## Practice Exercise
Try this:
1. Give ChatGPT the prompt: “Write a function to find the most frequent element in a list.”
2. Modify the prompt to specify using a dictionary.
3. Compare both outputs. Which is clearer? Which is faster?

## Reflection: What Makes a Good Prompt?
Describe in your own words what you learned about:
- Prompt clarity.
- AI’s limitations.
- When you need to take control of the process.
`,
          estimatedDuration: 45,
          difficulty: "beginner"
        }
      ]
    },
    {
      title: "Setting Up Your Programming Environment",
      description: "Getting started with the right tools and AI assistants",
      order: 2,
      lessons: [
        {
          title: "Choosing Your Tools: Python, IDEs, and AI Plugins",
          type: "reading",
          content: "Setting up your development environment with AI capabilities",
          estimatedDuration: 60,
          difficulty: "beginner"
        },
        {
          title: "AI Development Assistants (e.g., GitHub Copilot, ChatGPT)",
          type: "reading",
          content: "Overview of popular AI programming assistants",
          estimatedDuration: 45,
          difficulty: "beginner"
        },
        {
          title: "Prompt Engineering for Programmers",
          type: "reading",
          content: "Learning to effectively communicate with AI assistants",
          estimatedDuration: 60,
          difficulty: "beginner"
        }
      ]
    },
    {
      title: "Core Programming Concepts",
      description: "Essential programming concepts with AI assistance",
      order: 3,
      lessons: [
        {
          title: "Variables, Types, and Expressions",
          type: "reading",
          content: "Understanding basic programming elements",
          estimatedDuration: 60,
          difficulty: "beginner"
        },
        {
          title: "Control Flow with AI-Aided Logic Validation",
          type: "reading",
          content: "Learning control structures with AI assistance",
          estimatedDuration: 60,
          difficulty: "beginner"
        },
        {
          title: "Functions, Scope, and Refactoring with AI Help",
          type: "reading",
          content: "Understanding functions and code organization",
          estimatedDuration: 60,
          difficulty: "beginner"
        },
        {
          title: "Learning Syntax through AI Suggestions: Good or Bad?",
          type: "reading",
          content: "Evaluating AI-assisted syntax learning",
          estimatedDuration: 45,
          difficulty: "beginner"
        }
      ]
    },
    {
      title: "Data Structures and Algorithms",
      description: "Understanding fundamental data structures and algorithms with AI assistance",
      order: 4,
      lessons: [
        {
          title: "Arrays, Lists, Dictionaries, Sets",
          type: "reading",
          content: "Core data structures in programming",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Searching & Sorting: Human Design vs AI Code Gen",
          type: "reading",
          content: "Comparing human and AI approaches to algorithms",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Complexity Analysis with AI-Augmented Explanations",
          type: "reading",
          content: "Understanding algorithm efficiency",
          estimatedDuration: 60,
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Object-Oriented Programming (OOP)",
      description: "Learning OOP concepts with AI assistance",
      order: 5,
      lessons: [
        {
          title: "Classes and Objects",
          type: "reading",
          content: "Introduction to OOP concepts",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Inheritance and Polymorphism",
          type: "reading",
          content: "Advanced OOP concepts",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Using AI to Design Class Hierarchies and UML",
          type: "reading",
          content: "AI-assisted OOP design",
          estimatedDuration: 60,
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Debugging and Testing",
      description: "Modern debugging and testing approaches with AI",
      order: 6,
      lessons: [
        {
          title: "Common Bugs and AI-Based Debugging",
          type: "reading",
          content: "Using AI to identify and fix bugs",
          estimatedDuration: 60,
          difficulty: "intermediate"
        },
        {
          title: "Unit Testing: Write & Evaluate with AI",
          type: "reading",
          content: "AI-assisted testing strategies",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Red-Teaming AI: When the Assistant Is Wrong",
          type: "reading",
          content: "Critical evaluation of AI suggestions",
          estimatedDuration: 60,
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Working with APIs and Data",
      description: "Practical applications with APIs and data processing",
      order: 7,
      lessons: [
        {
          title: "REST APIs and JSON Basics",
          type: "reading",
          content: "Understanding API communication",
          estimatedDuration: 60,
          difficulty: "intermediate"
        },
        {
          title: "Using OpenAI API, Weather API, etc.",
          type: "reading",
          content: "Working with popular APIs",
          estimatedDuration: 90,
          difficulty: "intermediate"
        },
        {
          title: "Data Cleaning and AI-Augmented Visualization",
          type: "reading",
          content: "Data processing and visualization techniques",
          estimatedDuration: 90,
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Projects and Creativity",
      description: "Hands-on projects with AI assistance",
      order: 8,
      lessons: [
        {
          title: "Build an AI-Powered Chatbot",
          type: "reading",
          content: "Creating a chatbot using AI tools",
          estimatedDuration: 120,
          difficulty: "advanced"
        },
        {
          title: "Build a Data Dashboard using APIs and LLM Help",
          type: "reading",
          content: "Creating interactive data visualizations",
          estimatedDuration: 120,
          difficulty: "advanced"
        },
        {
          title: "Final Project: Student-Defined, AI-Augmented",
          type: "reading",
          content: "Capstone project with AI assistance",
          estimatedDuration: 180,
          difficulty: "advanced"
        }
      ]
    },
    {
      title: "Ethics, Policy, and the Future of Programming",
      description: "Understanding the broader implications of AI in programming",
      order: 9,
      lessons: [
        {
          title: "Algorithmic Bias and Fairness",
          type: "reading",
          content: "Ethical considerations in AI-assisted programming",
          estimatedDuration: 60,
          difficulty: "advanced"
        },
        {
          title: "AI and Academic Integrity (Plagiarism vs Collaboration)",
          type: "reading",
          content: "Understanding proper use of AI in learning",
          estimatedDuration: 60,
          difficulty: "advanced"
        },
        {
          title: "The Future of AI and Developer Roles",
          type: "reading",
          content: "Looking ahead at the evolution of programming",
          estimatedDuration: 60,
          difficulty: "advanced"
        }
      ]
    }
  ],
  learningObjectives: [
    "Understand fundamental programming concepts",
    "Learn to effectively use AI programming assistants",
    "Develop practical programming skills with AI support",
    "Create real-world projects using AI tools",
    "Understand ethical considerations in AI-assisted programming"
  ],
  aiTools: [
    "GitHub Copilot",
    "ChatGPT",
    "OpenAI API",
    "Code completion tools"
  ],
  estimatedDuration: 1800, // 30 hours total
  tags: [
    "programming",
    "artificial intelligence",
    "python",
    "ai-assisted development",
    "software engineering"
  ],
  aiAssistant: {
    enabled: true,
    model: "gpt-4",
    context: "You are an AI programming tutor specializing in teaching programming with AI tools. Help students understand both programming concepts and how to effectively use AI assistants.",
    capabilities: [
      "explain-concepts",
      "debug-code",
      "generate-examples",
      "answer-questions",
      "provide-feedback"
    ]
  }
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Create new course
    const course = await Course.create(aiProgrammingCourse);
    console.log('Created AI Programming course:', course.title);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();