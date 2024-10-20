"use client";

import { useEffect, useState, useCallback } from "react";
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Save } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { capitalize, cn } from "@/lib/utils";
import { Recipe } from "@/app/interfaces/Recipe";

interface Ingredient{
    ingredient:string;
    quantity:string
}

export default function New() {
    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [meal, setMeal] = useState("");
    const [goal, setGoal] = useState("");
    const [tried, setTried] = useState(false);
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState<Recipe>();
    const [recipeGenerated, setRecipeGenerated] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (recipe?.name) setRecipeGenerated(true);
    }, [recipe]);

    const isCompleted = useCallback(() => meal !== "" && goal !== "", [meal, goal]);

    const handleGenerateClick = async () => {
        setTried(true);

        if (isCompleted()) {
            try {
                setLoading(true)
                const response = await axios.post("/api/recipe/newRecipe",
                    {
                        params: { userId, meal, goal, ingredients },
                    }
                );
                
                if(response.data[1]=="You need a subscription"){
                    setLoading(false)
                    toast({
                        title: "Recipe generation failed",
                        description: "You have reached the usage limit",
                        variant: "destructive",
                      })
                      
                }
                else{
                    setRecipe(response.data);
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        }
    };

    const handleDiscardClick = useCallback(() => {
        setRecipeGenerated(false);
        setRecipe(undefined);
        setMeal("");
        setGoal("");
        setIngredients("");
        setTried(false);
    }, []);

    const handleSave = async () => {
        if (recipe) {
            try {
                await axios.post("/api/recipe/setRecipe", {
                    params: { recipe },
                });
                toast({
                    title: "Saved successfully",
                    description: recipe?.name,
                    className: "text-black",
                });
                handleDiscardClick();
            } catch (error) {
                console.error("Error saving recipe:", error);
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative   flex-col items-start gap-8  ">
                        <div className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Settings
                                </legend>
                                <div className="grid gap-3">
                                    <Label
                                        htmlFor="model"
                                        className={`${tried && !meal ? "text-red-600" : "text-black"}`}
                                    >
                                        Meal
                                    </Label>
                                    <Select onValueChange={setMeal} value={meal}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a meal" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                                <SelectItem value="lunch">Lunch</SelectItem>
                                                <SelectItem value="dinner">Dinner</SelectItem>
                                                <SelectItem value="snack">Snack</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label
                                        htmlFor="goal"
                                        className={`${tried && !goal ? "text-red-600" : "text-black"}`}
                                    >
                                        Goal
                                    </Label>
                                    <Select onValueChange={setGoal} value={goal}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a goal" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                <SelectItem value="loss">Weight Loss</SelectItem>
                                                <SelectItem value="gain">Weight Gain</SelectItem>
                                                <SelectItem value="maintain">Weight Maintenance</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Ingredients
                                </legend>
                                <div className="grid gap-3 min-h-fit">
                                    <Label htmlFor="ingredients">Content</Label>
                                    <Textarea
                                        id="ingredients"
                                        maxLength={200}
                                        placeholder="Enter ingredients..."
                                        className="min-h-[12rem]"
                                        onChange={(e) => setIngredients(e.target.value)}
                                        value={ingredients}
                                    />
                                    <div className="mt-4 flex gap-3 justify-end">
                                        <Button
                                            className="w-24 py-2 font-bold border border-grey-600 bg-white hover:bg-gray-200 rounded-lg text-black text-sm"
                                            onClick={handleDiscardClick}
                                        >
                                            Discard
                                        </Button>
                                        <Button
                                            className="w-24 py-2 font-bold bg-primary hover:bg-primary rounded-lg text-black text-sm"
                                            onClick={handleGenerateClick}
                                        >
                                            Generate
                                        </Button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="border relative flex h-[75.5vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 mt-[0.6rem] overflow-y-auto">
                        {loading && (
                            <div className="self-center mt-64">  <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn("animate-spin")}
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg></div>
                        )}
                        {recipeGenerated && (
                            <Button
                                className="sticky top-3 w-10 items-center py-2 px-2 font-bold border border-grey-600 bg-white hover:bg-gray-200 rounded-lg text-black text-sm ml-auto"
                                onClick={handleSave}
                            >
                                <Save />
                            </Button>)}
                        {recipeGenerated && (
                            <div>

                                <div>
                                    <h2 className="text-xl font-semibold">{recipe?.name}</h2>
                                    <div className="flex gap-2 text-xs">
                                        <span>{capitalize(recipe?.meal)}</span>
                                        <span>{capitalize(recipe?.goal)} Weight</span>
                                    </div>
                                    <p className="text-sm mt-4">{recipe?.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-1 mt-4">
                                        <div>
                                            <h3 className="font-semibold">Ingredients</h3>
                                            <ul className="list-disc pl-5 text-sm">
                                                {recipe?.ingredients.map((ingredient: Ingredient, index: number) => (
                                                    <li key={index}>
                                                        {ingredient.ingredient} -{" "}
                                                        <span>{ingredient.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Instructions</h3>
                                            <ol className="list-decimal pl-5 text-sm">
                                                {recipe?.instructions.map(
                                                    (instruction: string, index: number) => (
                                                        <li key={index}>{instruction}</li>
                                                    )
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
