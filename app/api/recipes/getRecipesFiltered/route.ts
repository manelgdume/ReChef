import Recipe from '@/app/models/Recipe';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    try {
        await connectDB();

        const nResults = 7;
        const { userID, goal, meal, page } = body.params;  
        const skip = (page - 1) * nResults;
 
        const query: any = { creatorID: userID }; 

        if (goal) query.goal = goal;  
        if (meal) query.meal = meal;  
        console.log(query)
        console.log(body.params)
        const recipes = await Recipe.find(query).skip(skip).limit(nResults);
        const counts = await Recipe.countDocuments({ creatorID: userID, ...(goal && { goal }), ...(meal && { meal }) });

        if (recipes.length === 0) {
            return NextResponse.json({ error: 'Recetas no encontradas' }, { status: 404 });
        }

        return NextResponse.json({ recipes, counts }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}