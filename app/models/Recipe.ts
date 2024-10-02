import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ ingredient: String, quantity: String }],
    instructions: [String],
    meal: {type: String},
    goal: {type: String},
    creatorID: { type: String, required: true },
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
export default Recipe;