import Recipe from '@/app/models/Recipe';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        await connectDB();

        const recipeData = body.params.recipe

        const recipe = {
            name: recipeData.name,
            description: recipeData.description,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            goal: recipeData.goal,
            meal: recipeData.meal,
            creatorID: recipeData.creatorID,
        }
        const newRecipe = new Recipe(recipe);
        await newRecipe.save();
        return NextResponse.json("elro", { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
    }
}