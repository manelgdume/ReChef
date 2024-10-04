"use client"

import Sidebar from "./sidebar";
import Header from "./header";

import Image from "next/image"
import Link from "next/link"
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
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

export default function TableRecipes({ meal, goal }: any) {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState<any>(undefined);
    const [pages, setPages] = useState<any>(undefined);
    const filterGoal = goal
    let filterMeal = meal
    console.log(filterMeal)
    useEffect(() => {
        getRecipes(1, true)
    }, [filterMeal]);
    useEffect(() => {
        getRecipes(1, true)
    }, []);
    const getPages = (counts: number) => {
        return Math.ceil(counts / 7);
    }
    const capitalize = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    const getRecipes = async (page: number, getCounts: boolean) => {
        let p = {
            getCounts: getCounts,
            userID: userId,
            page: page,
            goal: filterGoal,
            meal: filterMeal
        }
        console.log(p)
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
            console.log(data)
            if (data.counts) {
                const p = Array.from({ length: getPages(data.counts) }, (_, i) => i + 1);
                setPages(p)
            }
            console.log(data.recipes)
            setRecipes(data.recipes)

        } catch (error) {
            console.error('Error al obtener recetas:', error);
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
    if (!recipes) {
        return <CardContent></CardContent>;
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
                                <TableCell className="font-medium">
                                    {recipe.name}
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
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

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {pages?.map((i: any) => (
                        <PaginationItem className="shadow-transparent" key={i}>
                            <Button className="bg-background shadow-transparent hover:bg-accent" onClick={() => getRecipes(i, false)}>{i}</Button>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </CardContent>

    )
}