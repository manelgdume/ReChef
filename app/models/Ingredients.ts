import mongoose from 'mongoose';

const IngredientsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // ID automático generado por MongoDB
  foodClass: { type: String, required: true },
  description: { type: String, required: true },
  foodNutrients: [
    {
      type: mongoose.Schema.Types.Mixed, // Puedes cambiar esto si sabes la estructura exacta
    },
  ],
  foodAttributes: [{ type: mongoose.Schema.Types.Mixed }], // Lista vacía pero preparada para datos
  nutrientConversionFactors: [
    {
      type: mongoose.Schema.Types.Mixed, // Puedes ajustarlo según sea necesario
    },
  ],
  isHistoricalReference: { type: Boolean, default: false },
  ndbNumber: { type: Number },
  foodPortions: [
    {
      type: mongoose.Schema.Types.Mixed, // Puedes cambiar esto si sabes la estructura exacta
    },
  ],
  publicationDate: { type: String }, // Puedes cambiar a Date si quieres que MongoDB lo maneje como fecha
  inputFoods: [
    {
      type: mongoose.Schema.Types.Mixed, // Puedes cambiar esto según la estructura de inputFoods
    },
  ],
  foodCategory: {
    fdcId: { type: Number, required: true },
    dataType: { type: String, required: true },
  },
});

const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientsSchema);

export default Ingredient;