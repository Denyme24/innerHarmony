import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/app/lib/db';
import { ObjectId } from 'mongodb';

interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export async function POST(req: Request) {
  try {
    console.log('Starting signup process...');
    const { name, email, password } = await req.json();
    console.log('Received signup data:', { name, email });

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('Successfully connected to MongoDB');

    // List all databases to verify connection
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    console.log('Available databases:', dbs.databases.map(db => db.name));

    // Explicitly create the database and collection
    const db = client.db('innerharmony');
    console.log('Using database: innerharmony');
    
    // Create the users collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === 'users');
    
    if (!collectionExists) {
      console.log('Creating users collection...');
      await db.createCollection('users');
      console.log('Users collection created successfully');
    }
    
    const users = db.collection<User>('users');
    console.log('Using collection: users');

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create user
    const user: User = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    console.log('Attempting to insert new user...');
    const result = await users.insertOne(user);
    console.log('User inserted successfully with ID:', result.insertedId);

    // Verify the user was inserted
    const insertedUser = await users.findOne({ _id: result.insertedId });
    console.log('Verified user in database:', insertedUser ? 'Yes' : 'No');

    const insertedUserWithId = { ...user, _id: result.insertedId };

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { userId: insertedUserWithId._id, email: insertedUserWithId.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    console.log('JWT token generated successfully');

    return NextResponse.json(
      { message: 'User created successfully', token },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 