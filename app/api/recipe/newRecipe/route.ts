 
import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
 
import User from '@/app/models/User';

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI,
    timeout: 100000
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const userId = body.params.userId || '';

        const query = { idClerk: userId };
        console.log(query)
        const user = await User.findOne(query)
        if (user.subActive == false && user.recipesGenerated > 4) {
            return NextResponse.json([false, 'You need a subscription'], { status: 200 });
        }
        await User.findOneAndUpdate(query,{ $inc: { recipesGenerated: 1 }})
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
            goal: goal,
            meal: meal,
            creatorID: userId,
        }

        return NextResponse.json(recipe, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
    }
}