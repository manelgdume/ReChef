"use client"

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import Image from 'next/image';
import { FaHouse, FaGear, FaUtensils, FaList } from "react-icons/fa6";

export default function Dashboard() {
    const [recipes, setRecipes] = useState([
        { id: 1, name: 'Pasta Carbonara', description: 'A classic Italian dish.' },
        { id: 2, name: 'Chicken Curry', description: 'A spicy and flavorful curry.' },
    ]);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-foreground text-white p-8">
                <div className="flex items-center mb-16">
                    <Image
                        src={'/logoipsum-265.svg'}
                        alt="Descripción de la imagen"
                        width={30}
                        height={30}
                    />
                    <h1 className="ml-4 text-xl font-bold">ReChef</h1>
                </div>
                <nav className="flex-grow pl-1 ">
                    <ul className="text-sm">
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:text-gray-300">
                                <span><FaHouse className="mr-4"/></span>Dashboard
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:text-gray-300">
                                <span><FaList className="mr-4"/></span>Recipes
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:text-gray-300">
                                <span><FaUtensils className="mr-4"/></span>New recipe
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:text-gray-300">
                                <span><FaGear className="mr-4"/></span>Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-3xl font-semibold">Welcome Back</h1>
                </header>

                {/* Recipe List */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Generated Recipes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white shadow-md rounded-md p-4">
                                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                                <p>{recipe.description}</p>
                                <button className="mt-4 px-4 py-2 bg-accent text-black font-semibold rounded-md hover:bg-strongAccent-700">
                                    View Recipe
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}