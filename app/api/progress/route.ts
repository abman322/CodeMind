import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import UserProgress from '@/models/UserProgress';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const progress = await UserProgress.findOne({ userId, courseId });
    
    if (!progress) {
      return NextResponse.json(
        { error: 'Progress not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { courseId, lessonId, score } = body;

    if (!courseId || !lessonId) {
      return NextResponse.json(
        { error: 'Course ID and Lesson ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const progress = await UserProgress.findOneAndUpdate(
      { userId, courseId },
      {
        $push: {
          completedLessons: {
            lessonId,
            completedAt: new Date(),
            score: score || null,
          },
        },
        $set: {
          currentLesson: lessonId + 1,
          lastAccessed: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 