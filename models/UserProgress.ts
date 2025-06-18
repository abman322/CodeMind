import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedLessons: [{
    lessonId: Number,
    completedAt: Date,
    score: Number,
  }],
  currentLesson: {
    type: Number,
    default: 1,
  },
  progress: {
    type: Number,
    default: 0,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index for userId and courseId
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema); 