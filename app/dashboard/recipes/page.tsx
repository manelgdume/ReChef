"use client"

import Sidebar from "../components/sidebar";
import Header from "../components/header";
 
import Link from "next/link"
import {
    ListFilter,
    PlusCircle 
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
 
 
import TableRecipes from "../components/tableRecipes";
import { useState } from "react";

export default function Page() {
    const [meal, setMeal] = useState<string>("");
    const handleMeal = (m: string)=>{
        setMeal(m)
    }
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />

                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="gain">Gain</TabsTrigger>
                                <TabsTrigger value="maintain">Maintain</TabsTrigger>
                                <TabsTrigger value="lose" className="hidden sm:flex">
                                    Lose
                                </TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 gap-1">
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked={meal===''} onCheckedChange={()=>handleMeal('')} >
                                            All
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked={meal==='lunch'} onCheckedChange={()=>handleMeal('lunch')}>Lunch</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked={meal==='dinner'} onCheckedChange={()=>handleMeal('dinner')}>Dinner</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked={meal==='breakfast'} onCheckedChange={()=>handleMeal('breakfast')}>Breakfast</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem checked={meal==='snack'} onCheckedChange={()=>handleMeal('snack')}>Snack</DropdownMenuCheckboxItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
 
                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        <Link href={'/dashboard/new'}>Add Recipe</Link>
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <Card x-chunk="dashboard-06-chunk-0" className="mt-6 ">
                            <CardHeader>
                                <CardTitle>Recipes</CardTitle>
                                <CardDescription>
                                    Manage your recipes and view their stats.
                                </CardDescription>
                            </CardHeader>
                            <TabsContent value="all">
                                <TableRecipes goal={""} meal={meal} pagination={true}></TableRecipes>
                            </TabsContent>
                            <TabsContent value="gain">
                                <TableRecipes goal={"gain"} meal={meal} pagination={true}></TableRecipes>
                            </TabsContent>
                            <TabsContent value="maintain">
                                <TableRecipes goal={"maintain"} meal={meal} pagination={true}></TableRecipes>
                            </TabsContent>  
                            <TabsContent value="lose">
                                <TableRecipes goal={"lose"} meal={meal} pagination={true}></TableRecipes>
                            </TabsContent>
                        </Card>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}
