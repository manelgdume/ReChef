import Ingredient from '@/app/models/Ingredients';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    const filter: any = {};
    if (query) filter.description = query;

    const items = await Ingredient.find(
      { description: { "$regex": query, "$options": "i" } },
      'description'
    )
      .limit(5)
      .exec();
      
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}

