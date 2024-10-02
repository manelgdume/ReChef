import Recipe from '@/app/models/Recipe'; 
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    
    try {
        await connectDB();

        const recipeId = body.params.id;
        const recipe = await Recipe.findById(recipeId).exec();;
        
 
        if (!recipe) {
            return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
        }
 
        return NextResponse.json(recipe, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}