import Recipe from '@/app/models/Recipe'; 
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    
    try {
        await connectDB();

        const recipeId = body.params.id;
        const res = await Recipe.findByIdAndDelete(recipeId).exec();;
 
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}