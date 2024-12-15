// lib/mongodb.js

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const MONGODB_DB = process.env.MONGODB_DB || 'myDatabase'; // Replace with your database name

let client;
let db;

export async function initmongo() {
  if (db) {
    // If db is already initialized, return it
    return { client, db };
  }

  // Create a new MongoClient and connect to the database
  client = new MongoClient(MONGODB_URI);

  try {
    await client.connect(); // Connect to MongoDB server
    db = client.db(MONGODB_DB); // Select the database
    console.log('Connected to MongoDB successfully!');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
