"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { FaUtensils,FaBullseye } from "react-icons/fa6";
import Sidebar from "@/app/dashboard/components/sidebar";
import Header from "@/app/dashboard/components/header";
import { Recipe } from "@/app/interfaces/Recipe";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
    const id = params.id;
    const [recipe, setRecipe] = useState<Recipe>();

    const capitalize = (s: string) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/api/recipe/getRecipe`, {
                    params: { id: id },
                });
                setRecipe(response.data);
            } catch (error) {
                console.error("Error al obtener la receta:", error);
                throw error;
            }
        };
        fetchData();
    }, [id]);

    if (!recipe) {
        return (
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Sidebar />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <Header />
                    <main className="flex-1 bg-white p-8">
                        <header className="mb-16">
                            <h1 className="text-2xl font-semibold">Loading Recipe...</h1>
                        </header>
                    </main> 
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />

                <main className="flex-1 bg-white px-6 mt-4 sm:mt-0">
                    <header className="mb-8">
                        <h1 className="text-lg font-semibold">{capitalize(recipe.name)}</h1>
                        <div className="flex items-center text-sm text-muted-foreground  mt-2">
                            <div className="flex items-center">
                                <FaUtensils />
                                <span className="ml-2">{capitalize(recipe.meal)}</span>
                            </div>
                            <div className="flex items-center ml-8 " >
                                <FaBullseye color="gray-500" />
                                <p className="ml-2"> {capitalize(recipe.goal)} Weight</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm">{recipe.description}</p>
                    </header>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                            <section className="mb-8">
                                <h2 className="font-semibold mb-4">Ingredients</h2>
                                <ul className="list-disc pl-5">
                                    {recipe.ingredients.map((ingredient: any, index: number) => (
                                        <li key={index} className="mt-2">
                                            {ingredient.ingredient} - <span>{ingredient.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                        <div>
                            <section className="mb-8">
                                <h2 className="font-semibold mb-4">Instructions</h2>
                                <ol className="list-decimal pl-5">
                                    {recipe.instructions.map((instruction: string, index: number) => (
                                        <li className="mt-2" key={index}>{instruction}</li>
                                    ))}
                                </ol>
                            </section>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
