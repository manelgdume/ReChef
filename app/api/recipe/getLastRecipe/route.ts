import Recipe from '@/app/models/Recipe'; 
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    
    try {
        await connectDB();
        const page = body.params.page
        const userID = body.params.userID;
        const lastRecipe = await Recipe.findOne({ creatorID: userID }).sort({ _id: -1 }).skip(page).exec();
        const counts = 1
 
        if (!lastRecipe) {
            return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
        }
 
        return NextResponse.json({lastRecipe,counts}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}