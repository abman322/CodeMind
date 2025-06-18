import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; unitId: string; lessonId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { completed, quizAnswers } = body;

    await connectDB();

    const course = await Course.findById(params.courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const unit = course.units.id(params.unitId);
    if (!unit) {
      return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
    }

    const lesson = unit.lessons.id(params.lessonId);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Update lesson progress
    if (completed) {
      lesson.completed = true;
    }

    // Handle quiz submissions
    if (quizAnswers && lesson.type === 'quiz') {
      const correctAnswers = lesson.quiz.questions.map((q: QuizQuestion) => q.correctAnswer);
      const score = quizAnswers.filter((answer: string, index: number) => 
        answer === correctAnswers[index]
      ).length;
      
      lesson.quiz.score = score;
      lesson.quiz.completed = true;
    }

    await course.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { courseId: string; unitId: string; lessonId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const course = await Course.findById(params.courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const unit = course.units.id(params.unitId);
    if (!unit) {
      return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
    }

    const lesson = unit.lessons.id(params.lessonId);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({
      completed: lesson.completed,
      quizScore: lesson.type === 'quiz' ? lesson.quiz.score : null,
      quizCompleted: lesson.type === 'quiz' ? lesson.quiz.completed : null
    });
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 