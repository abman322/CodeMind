import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: Number,
  explanation: String,
  points: {
    type: Number,
    default: 1
  }
});

const exerciseSchema = new mongoose.Schema({
  description: String,
  tasks: [String],
  hints: [String],
  starterCode: String,
  solution: String,
  aiPrompts: [String],
  testCases: [{
    input: String,
    expectedOutput: String,
    explanation: String
  }],
  interactiveElements: [{
    type: {
      type: String,
      enum: ['code-editor', 'drag-drop', 'fill-blank', 'multiple-choice'],
      required: true
    },
    content: mongoose.Schema.Types.Mixed,
    feedback: String
  }]
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'reading', 'exercise', 'quiz', 'ai-workshop'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: String,
  resources: [String],
  exercise: exerciseSchema,
  quiz: {
    questions: [quizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70
    },
    timeLimit: Number, // in minutes
    allowRetries: {
      type: Boolean,
      default: true
    }
  },
  aiWorkshop: {
    scenario: String,
    learningObjectives: [String],
    aiTools: [String],
    steps: [{
      title: String,
      description: String,
      aiPrompt: String,
      expectedOutcome: String
    }]
  },
  estimatedDuration: Number,
  prerequisites: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  interactiveQuiz: {
    questions: [quizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70
    },
    timeLimit: Number,
    allowRetries: {
      type: Boolean,
      default: true
    }
  }
});

const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  lessons: [lessonSchema],
  order: {
    type: Number,
    required: true
  },
  estimatedDuration: Number,
  prerequisites: [String]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  units: [unitSchema],
  prerequisites: [String],
  learningObjectives: [String],
  aiTools: [String],
  estimatedDuration: Number,
  tags: [String],
  aiAssistant: {
    enabled: {
      type: Boolean,
      default: true
    },
    model: {
      type: String,
      default: 'gpt-4'
    },
    context: {
      type: String,
      default: 'You are an AI programming tutor. Help students understand programming concepts and solve problems.'
    },
    capabilities: [{
      type: String,
      enum: ['explain-concepts', 'debug-code', 'generate-examples', 'answer-questions', 'provide-feedback']
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course; 