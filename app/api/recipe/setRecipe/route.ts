import Ingredient from '@/app/models/Ingredients'; // Asegúrate de que esto esté configurado para tus ingredientes
import Recipe from '@/app/models/Recipe'; // Asegúrate de tener un modelo de receta
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { useClerk } from '@clerk/nextjs';

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
 
        const connection = await connectDB();
 
        const recipeData = body.params.recipe
        
        const recipe = {
            name: recipeData.name,
            description: recipeData.description,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            goal:recipeData.goal,
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