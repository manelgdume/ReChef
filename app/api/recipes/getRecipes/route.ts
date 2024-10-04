import Recipe from '@/app/models/Recipe';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    try {
        await connectDB();
        const nResults = 7
        const userID = body.params.userID;
        const page = body.params.page;
        const skip = (page - 1) * nResults;

        const recipes = await Recipe.find({creatorID: userID}).skip(skip)
            .limit(nResults);
        const counts = await Recipe.countDocuments({ creatorID: userID })

        if (!recipes) {
            return NextResponse.json({ error: 'Receta no encontrada' }, { status: 404 });
        }
        const res = {recipes,counts}
        
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}