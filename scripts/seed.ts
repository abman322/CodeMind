import mongoose from 'mongoose';
import Course from '../models/Course';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const sampleCourses = [
  {
    title: "Programming Fundamentals with AI",
    description: "Start your programming journey with a modern approach that combines traditional programming concepts with AI-assisted development tools. Learn how to leverage AI to enhance your learning and development process.",
    level: "beginner",
    prerequisites: [],
    learningObjectives: [
      "Understand basic programming concepts and how they relate to modern development",
      "Learn to use AI tools effectively for learning and problem-solving",
      "Develop a strong foundation in Python programming",
      "Master the art of prompt engineering for AI assistance",
      "Build and debug programs with AI pair programming"
    ],
    aiTools: [
      "GitHub Copilot",
      "ChatGPT",
      "Cursor IDE",
      "Codeium"
    ],
    estimatedDuration: 40,
    tags: ["python", "ai", "beginner", "programming-basics"],
    aiAssistant: {
      enabled: true,
      model: "gpt-4",
      context: "You are an AI programming tutor specializing in Python and AI-assisted development. Help students understand concepts and solve problems while teaching them how to effectively use AI tools.",
      capabilities: [
        "explain-concepts",
        "debug-code",
        "generate-examples",
        "answer-questions",
        "provide-feedback"
      ]
    },
    units: [
      {
        title: "Getting Started with Programming and AI",
        description: "Learn the fundamentals of programming and how AI can enhance your learning journey.",
        order: 1,
        estimatedDuration: 8,
        lessons: [
          {
            title: "Introduction to Programming in the AI Age",
            type: "reading",
            content: `
              <h2>Welcome to Programming in the AI Age!</h2>
              <p>In this lesson, we'll explore how AI is transforming the way we learn and practice programming.</p>
              
              <h3>Key Topics:</h3>
              <ul>
                <li>The Evolution of Programming Education</li>
                <li>How AI is Changing Software Development</li>
                <li>Understanding AI Development Tools</li>
                <li>Setting Up Your AI-Enhanced Development Environment</li>
              </ul>

              <h3>Why Learn Programming with AI?</h3>
              <p>AI tools can help you:</p>
              <ul>
                <li>Learn faster by providing instant feedback</li>
                <li>Understand complex concepts through AI explanations</li>
                <li>Debug code more effectively</li>
                <li>Generate code examples and solutions</li>
                <li>Get personalized learning assistance</li>
              </ul>
            `,
            resources: [
              "Programming Basics Cheat Sheet",
              "AI Tools Comparison Guide",
              "Getting Started with AI Development Tools"
            ],
            estimatedDuration: 45,
            difficulty: "beginner",
            interactiveQuiz: {
              questions: [
                {
                  question: "What is the main advantage of learning programming with AI tools?",
                  options: [
                    "Faster learning through instant feedback",
                    "No need to understand programming concepts",
                    "AI will write all your code",
                    "Programming becomes easier than ever"
                  ],
                  correctAnswer: 0,
                  explanation: "AI tools provide instant feedback and explanations, making the learning process more efficient.",
                  points: 2
                },
                {
                  question: "Which of these is NOT a recommended practice when using AI for learning?",
                  options: [
                    "Understanding the AI's explanations",
                    "Using AI to generate code examples",
                    "Blindly copying AI-generated code",
                    "Asking AI for clarification on concepts"
                  ],
                  correctAnswer: 2,
                  explanation: "Always understand the code you're working with, even if it's AI-generated.",
                  points: 2
                }
              ],
              passingScore: 70,
              timeLimit: 10,
              allowRetries: true
            }
          },
          {
            title: "Setting Up Your AI-Enhanced Development Environment",
            type: "exercise",
            content: "Learn how to set up your development environment with AI tools to enhance your learning experience.",
            exercise: {
              description: "Set up your development environment with AI tools",
              tasks: [
                "Install Python 3.x",
                "Set up Visual Studio Code with AI extensions",
                "Configure GitHub Copilot",
                "Install and configure Cursor IDE",
                "Set up a ChatGPT account for programming assistance"
              ],
              hints: [
                "Use the official Python installer from python.org",
                "Install the 'GitHub Copilot' extension in VS Code",
                "Make sure to enable AI features in your IDE settings"
              ],
              starterCode: `# Python version check
import sys
print(f"Python version: {sys.version}")

# Test your environment
def test_environment():
    print("Your AI-enhanced development environment is ready!")
    print("You can now start coding with AI assistance.")
`,
              solution: `# Python version check
import sys
print(f"Python version: {sys.version}")

# Test your environment
def test_environment():
    print("Your AI-enhanced development environment is ready!")
    print("You can now start coding with AI assistance.")

if __name__ == "__main__":
    test_environment()`,
              aiPrompts: [
                "How do I check my Python version?",
                "What are the best AI extensions for VS Code?",
                "How do I configure GitHub Copilot for Python development?"
              ],
              testCases: [
                {
                  input: "python test_environment.py",
                  expectedOutput: "Your AI-enhanced development environment is ready!\nYou can now start coding with AI assistance.",
                  explanation: "The program should print a success message when run"
                }
              ],
              interactiveElements: [
                {
                  type: "code-editor",
                  content: {
                    language: "python",
                    initialCode: `# Python version check
import sys
print(f"Python version: {sys.version}")

# Test your environment
def test_environment():
    # Your code here
    pass`,
                    expectedOutput: "Your AI-enhanced development environment is ready!\nYou can now start coding with AI assistance."
                  },
                  feedback: "Great job! You've successfully set up your development environment."
                },
                {
                  type: "multiple-choice",
                  content: {
                    question: "Which of these is NOT a required step in setting up your environment?",
                    options: [
                      "Installing Python",
                      "Configuring GitHub Copilot",
                      "Learning advanced Python concepts",
                      "Setting up VS Code"
                    ],
                    correctAnswer: 2
                  },
                  feedback: "Learning advanced concepts comes later. First, we need to set up the basic tools."
                }
              ]
            },
            estimatedDuration: 60,
            difficulty: "beginner"
          }
        ]
      },
      {
        title: "Python Basics with AI Assistance",
        description: "Master fundamental Python concepts with the help of AI tools.",
        order: 2,
        estimatedDuration: 12,
        lessons: [
          {
            title: "Understanding Variables and Data Types",
            type: "video",
            content: "Learn about variables and data types in Python with AI assistance.",
            videoUrl: "https://www.youtube.com/embed/placeholder1",
            resources: [
              "Python Data Types Cheat Sheet",
              "Variable Naming Conventions",
              "Type Conversion Guide"
            ],
            estimatedDuration: 45,
            difficulty: "beginner",
            interactiveQuiz: {
              questions: [
                {
                  question: "Which of these is a valid Python variable name?",
                  options: [
                    "123variable",
                    "my-variable",
                    "my_variable",
                    "@variable"
                  ],
                  correctAnswer: 2,
                  explanation: "Python variable names can contain letters, numbers, and underscores, but must start with a letter or underscore.",
                  points: 1
                },
                {
                  question: "What is the data type of the result of 5 / 2 in Python?",
                  options: [
                    "int",
                    "float",
                    "double",
                    "decimal"
                  ],
                  correctAnswer: 1,
                  explanation: "Division in Python 3 always returns a float, even when dividing integers.",
                  points: 1
                }
              ],
              passingScore: 70,
              timeLimit: 10,
              allowRetries: true
            }
          },
          {
            title: "Control Flow with AI Assistance",
            type: "exercise",
            content: "Practice using control flow statements with AI guidance.",
            exercise: {
              description: "Create a program that uses if-else statements and loops",
              tasks: [
                "Create a number guessing game",
                "Use if-else statements for game logic",
                "Implement a loop for multiple guesses",
                "Add AI-generated hints for the player"
              ],
              hints: [
                "Use the random module for generating numbers",
                "Implement a while loop for multiple guesses",
                "Use if-else statements to check the guess"
              ],
              starterCode: `import random

def number_guessing_game():
    # Your code here
    pass`,
              solution: `import random

def number_guessing_game():
    number = random.randint(1, 100)
    attempts = 0
    
    while True:
        guess = int(input("Guess a number between 1 and 100: "))
        attempts += 1
        
        if guess < number:
            print("Too low! Try a higher number.")
        elif guess > number:
            print("Too high! Try a lower number.")
        else:
            print(f"Congratulations! You guessed it in {attempts} attempts!")
            break`,
              aiPrompts: [
                "How do I generate a random number in Python?",
                "What's the best way to implement a number guessing game?",
                "How can I add hints to my number guessing game?"
              ],
              testCases: [
                {
                  input: "50\n75\n25\n37\n42\n45\n43\n44",
                  expectedOutput: "Congratulations! You guessed it in 8 attempts!",
                  explanation: "The program should guide the player to the correct number"
                }
              ],
              interactiveElements: [
                {
                  type: "code-editor",
                  content: {
                    language: "python",
                    initialCode: `import random

def number_guessing_game():
    # Your code here
    pass`,
                    testCases: [
                      {
                        input: "50\n75\n25\n37\n42\n45\n43\n44",
                        expectedOutput: "Congratulations! You guessed it in 8 attempts!"
                      }
                    ]
                  },
                  feedback: "Great job! Your number guessing game is working correctly."
                },
                {
                  type: "drag-drop",
                  content: {
                    title: "Arrange the control flow statements in the correct order",
                    items: [
                      "Generate random number",
                      "Get user input",
                      "Check if guess is correct",
                      "Provide feedback",
                      "Update attempt counter"
                    ],
                    correctOrder: [0, 1, 2, 3, 4]
                  },
                  feedback: "Perfect! You've arranged the game logic in the correct order."
                }
              ]
            },
            estimatedDuration: 60,
            difficulty: "beginner"
          }
        ]
      },
      {
        title: "Advanced Python Concepts with AI",
        description: "Explore advanced Python concepts and learn how to use AI for complex programming tasks.",
        order: 3,
        estimatedDuration: 20,
        lessons: [
          {
            title: "Functions and AI Code Generation",
            type: "ai-workshop",
            content: "Learn to write and use functions with AI assistance.",
            aiWorkshop: {
              scenario: "Building a Library Management System",
              learningObjectives: [
                "Understand function definition and usage",
                "Learn to use AI for function generation",
                "Practice code organization",
                "Implement error handling"
              ],
              aiTools: ["GitHub Copilot", "ChatGPT"],
              steps: [
                {
                  title: "Function Planning",
                  description: "Use AI to plan the library system functions",
                  aiPrompt: "What functions would I need for a simple library management system?",
                  expectedOutcome: "A list of required functions and their purposes"
                },
                {
                  title: "Function Implementation",
                  description: "Use AI to generate function implementations",
                  aiPrompt: "Generate Python functions for adding, removing, and searching books in a library system",
                  expectedOutcome: "Working functions with proper error handling"
                },
                {
                  title: "Testing and Documentation",
                  description: "Use AI to help test and document the functions",
                  aiPrompt: "Help me write tests and documentation for my library functions",
                  expectedOutcome: "Test cases and function documentation"
                }
              ]
            },
            estimatedDuration: 90,
            difficulty: "beginner",
            interactiveQuiz: {
              questions: [
                {
                  question: "What is the main benefit of using AI for function generation?",
                  options: [
                    "It writes perfect code every time",
                    "It helps understand function structure and best practices",
                    "It eliminates the need to learn programming",
                    "It makes debugging unnecessary"
                  ],
                  correctAnswer: 1,
                  explanation: "AI helps understand function structure and best practices, but you still need to review and understand the code.",
                  points: 2
                }
              ],
              passingScore: 70,
              timeLimit: 10,
              allowRetries: true
            }
          }
        ]
      }
    ]
  }
];

async function seed() {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed(); 