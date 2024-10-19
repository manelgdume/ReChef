
export interface Recipe {
    _id:string;
    name: string;
    description: string;
    ingredients: [{ingredient:string,quantity:string}];
    instructions: [string];
    meal: string;
    goal: string;
    creatorID:string;
}