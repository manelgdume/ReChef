"use client"
 
import {
    MoreHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
 
import { Button } from "@/components/ui/button"
import {CardContent} from "@/components/ui/card"
import {
    DropdownMenu,
     DropdownMenuContent,
     DropdownMenuLabel,
     DropdownMenuTrigger,
 
} from "@/components/ui/dropdown-menu"
 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
 
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link"

export default function TableRecipes({ meal, goal, pagination }: any) {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [pages, setPages] = useState<any>(undefined);
    const [page, setPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const filterGoal = goal
    const paginationBool = pagination
    let filterMeal = meal

    useEffect(() => {
        getRecipes(1, true)
    }, [filterMeal]);
    useEffect(() => {
        getRecipes(1, true)
    }, []);
    const getPages = (counts: number, currentPage: number) => {
        const totalPages = Math.ceil(counts / 7);
        setLastPage(totalPages);
    
        const getPageRange = (start: number, end: number) => {
            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
    
        if (totalPages <= 7) {
            return getPageRange(1, totalPages);
        }
    
        if (currentPage <= 4) {
            return getPageRange(1, 7);
        }
    
        if (currentPage >= totalPages - 3) {
            return getPageRange(totalPages - 6, totalPages);
        }
    
        return getPageRange(currentPage - 3, currentPage + 3);
    };
 
    const capitalize = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const getRecipes = async (page: number, getCounts: boolean) => {
        setLoading(true)
        try {
            const response = await fetch('/api/recipes/getRecipesFiltered', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    params: {
                        getCounts: getCounts,
                        userID: userId,
                        page: page,
                        goal: filterGoal,
                        meal: filterMeal
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const data = await response.json();

            if (data.counts) {
                const p = getPages(data.counts, page);  // Calcula las páginas con la lógica actualizada
                
                setPages(p);
            }

            setRecipes(data.recipes);
            setPage(page);  // Actualiza la página actual
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setRecipes(undefined);
            console.error('Error al obtener recetas:', error);
        }
    };

    const changePage = (page: number) => {
        if(page>0 && page< lastPage +1){
            getRecipes(page, false)
            setPage(page)
        }
    }

    const deleteRecipe = async (id: string) => {
        try {
            const response = await fetch('/api/recipe/deleteRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    params: {
                        id: id
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            else {
                recipes.filter((recipe: any) => recipe.id == id)
            }

        } catch (error) {
            console.error('Error al obtener recetas:', error);
        }
    }

    if (!recipes && loading) {
        return <CardContent>
            <Table  >
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Goal</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Meal
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Description
                        </TableHead>
                        <TableHead>
                            <span  >Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(7)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium hover:underline">
                                <Skeleton className="w-[100px] h-[0.75rem] rounded-full bg-gray-100" />
                                <Skeleton className="w-[50px] h-[0.75rem] rounded-full mt-2 bg-gray-100" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[50px] h-[0.75rem] rounded-full bg-gray-100" />
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                                <Skeleton className="w-[60px] h-[0.75rem]  rounded-full bg-gray-100" />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <Skeleton className="w-[300px] h-[0.75rem] rounded-full bg-gray-100" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-[50px] h-[0.75rem] rounded-full bg-gray-100" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>;
    }
 

    return (
        <CardContent>
            <Table  >
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Goal</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Meal
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Description
                        </TableHead>
                        <TableHead>
                            <span  >Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recipes != undefined && (
                        Object.values(recipes).map((recipe: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium hover:underline">
                                    <Link href={"/dashboard/recipes/recipe/" + recipe._id}>{recipe.name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{capitalize(recipe.goal)}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {capitalize(recipe.meal)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {recipe.description}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <AlertDialog>
                                                <AlertDialogTrigger className="text-sm py-1.5 px-2 rounded-sm">Delete</AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your recipe
                                                            and remove your data from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteRecipe(recipe._id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {paginationBool && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className="cursor-pointer" onClick={() => changePage(page-1)} />
                        </PaginationItem>
                        {pages?.map((i: any) => (
                            <PaginationItem className="shadow-transparent" key={i}>
                                <Button className={`${i === page ? 'bg-accent ' : 'bg-background'
                                    } shadow-transparent hover:bg-accent`} onClick={() => changePage(i)}>{i}</Button>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext className="cursor-pointer" onClick={() => changePage(page+1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )
            }
        </CardContent>

    )
}