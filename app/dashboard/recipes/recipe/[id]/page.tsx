"use client"

 import axios from "axios";
import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { FaBullseye } from "react-icons/fa6";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Sidebar from "@/app/dashboard/components/sidebar";

export default function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [recipe, setRecipe] = useState<any>(null);

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
            <div className="min-h-screen flex">
                <Sidebar />
                <main className="flex-1 bg-white p-8">
                    <header className="mb-16">
                        <h1 className="text-2xl font-semibold">Loading Recipe...</h1>
                    </header>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 bg-white p-8 mr-32">

                <header className="mt-16 mb-8">
                    <h1 className="text-2xl font-semibold">{capitalize(recipe.name)}</h1>
                    <div className="flex items-center text-gray-500 text-sm  mt-2">
                        <div className="flex items-center">
                            <FaUtensils />
                            <span className="ml-2">{capitalize(recipe.meal)}</span>
                        </div>
                        <div className="flex items-center ml-8 " >
                            <FaBullseye color="gray-500" />
                            <p className="ml-2"> {capitalize(recipe.goal)} Weight</p>
                        </div>
                    </div>
                    <p className="mt-4 text-md">{recipe.description}</p>
                </header>
                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
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
                            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
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
    );
}
