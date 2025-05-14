import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';
import { ObjectId } from 'mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface Post {
  _id?: ObjectId;
  title: string;
  content: string;
  category: string;
  author: {
    _id: ObjectId;
    name: string;
  };
  createdAt: Date;
  likes: number;
  comments: number;
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

// Helper function to verify JWT token
const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as CustomJwtPayload;
  } catch {
    return null;
  }
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const client = await clientPromise;
    const db = client.db('innerharmony');
    const posts = db.collection<Post>('community');

    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }

    const allPosts = await posts
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the token
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { title, content, category } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('innerharmony');
    const posts = db.collection<Post>('community');
    const users = db.collection('users');

    // Get user details
    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newPost: Post = {
      title,
      content,
      category,
      author: {
        _id: new ObjectId(decoded.userId),
        name: user.name,
      },
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    };

    const result = await posts.insertOne(newPost);
    const insertedPost = await posts.findOne({ _id: result.insertedId });

    return NextResponse.json(
      { message: 'Post created successfully', post: insertedPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 