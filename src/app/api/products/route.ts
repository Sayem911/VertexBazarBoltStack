import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const popularity = searchParams.get('popularity');
    const countryCode = searchParams.get('countryCode');

    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (popularity) {
      query.popularity = popularity;
    }
    if (countryCode) {
      query.countryCode = countryCode;
    }

    const products = await Product.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean()
      .timeout(5000); // Add timeout of 5 seconds

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: 'Failed to load products', error: error.message },
      { status: 500 }
    );
  }
}