// app/api/products/route.js

import { initmongo } from "../../../lib/mongodb"; // Import the initmongo function

export async function GET() {
  try {
    const { db } = await initmongo(); // Connect to MongoDB
    const products = await db.collection('products').find({}).toArray(); // Fetch products from the 'products' collection

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const { db } = await initmongo(); // Connect to MongoDB
    const newProduct = await req.json(); // Parse incoming JSON product data
    const result = await db.collection('products').insertOne(newProduct); // Insert the new product

    return new Response(JSON.stringify({ message: "Product added", product: result.ops[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

    
