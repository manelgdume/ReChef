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

        const userId = body.params.userId || '';
        const meal = body.params.meal || '';
        const goal = body.params.goal || '';
        const ingredients = body.params.ingredients || '';

        const prompt = `Generate a recipe for ${meal} to help achieve a goal of ${goal} weight, using the following ingredients and their quantities: ${ingredients}. The output should be in JSON format, including the following fields: 'name' (for the recipe name), 'description' (for the recipe description), 'ingredients' (an array of objects with 'ingredient' and 'quantity'), and 'instructions' (an array of step-by-step instructions).`;
 
        const response = await chatModel.invoke(prompt);
 
        const recipeData = JSON.parse(response.content as string);
        
        const recipe = {
            name: recipeData.name,
            description: recipeData.description,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            goal:goal,
            meal: meal,
            creatorID: userId,
        }

        return NextResponse.json(recipe, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
    }
}