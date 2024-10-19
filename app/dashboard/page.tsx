"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,

  ListFilter,
  MoreVertical,

  Truck,

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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
import Sidebar from "./components/sidebar"
import Header from "./components/header"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import TableRecipes from "./components/tableRecipes"
import { capitalize } from "@/lib/utils"



export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Dashboard() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRecipe, setLastRecipe] = useState<any>({});
  const [pageRecipe, setPageRecipe] = useState<number>(1);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  useEffect(() => {
    setLoading(true)
    getUser()
    getRecipe(pageRecipe, true)
    setLoading(false)
  }, [])
  useEffect(() => {
    getRecipe(pageRecipe, false)
  }, [pageRecipe])
  const handlePage = (page: number) => {
    if (page > 0 && page < totalRecipes) {
      setPageRecipe(page)
    }
  }
  const getRecipe = async (page: number, counts: boolean) => {

    try {
      const response = await fetch('/api/recipe/getLastRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          params: {
            userID: userId,
            page: page,
            counts: counts,
          }

        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const data = await response.json();
      setLastRecipe(data.lastRecipe)
      setTotalRecipes(data.counts)
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  }
  const getUser = async () => {
    try {
      const response = await axios.post('/api/user/getInfo', {
        params: {
          userID: userId,
        }
      });

      if (!response) {
        throw new Error('Error en la solicitud: ' + response);
      }

      console.log(response)
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  }
  if (loading) return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar></Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header></Header>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar></Sidebar>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header></Header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Recipes</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Create recipes that fit your goals and needs with the most advanced artificial intelligence tool
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={'/dashboard/new'}><Button>Create New Recipe</Button></Link>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">0 </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Recipes Generated
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Total</CardDescription>
                  <CardTitle className="text-4xl">{totalRecipes}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Recipes Generated
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="all">
              <div className="flex items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="gain">Gain</TabsTrigger>
                  <TabsTrigger value="maintain">Maintain</TabsTrigger>
                  <TabsTrigger value="lose" className="hidden sm:flex">
                    Lose
                  </TabsTrigger>
                </TabsList>
              </div>
              <Card x-chunk="dashboard-05-chunk-3" className="overflow-y-auto max-h-max">
                <CardHeader className="px-7">
                  <CardTitle>Last Recipes</CardTitle>
                  <CardDescription>
                    Manage your recipes and view their stats.
                  </CardDescription>
                </CardHeader>
                <TabsContent value="all">
                  <TableRecipes goal={""} pagination={false} ></TableRecipes>
                </TabsContent>
                <TabsContent value="gain">
                  <TableRecipes goal={"gain"} pagination={false}></TableRecipes>
                </TabsContent>
                <TabsContent value="maintain">
                  <TableRecipes goal={"maintain"} pagination={false}></TableRecipes>
                </TabsContent>
                <TabsContent value="lose">
                  <TableRecipes goal={"lose"} pagination={false}></TableRecipes>
                </TabsContent>
              </Card>
            </Tabs>
          </div>
          <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {lastRecipe?.name}
                  </CardTitle>
                  <CardDescription>{capitalize(lastRecipe?.goal)} {capitalize(lastRecipe?.meal)}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Ingredients</div>
                  <ul className="grid gap-3">
                    {lastRecipe?.ingredients?.map((i: any) => (
                      <li key={i._id} className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {capitalize(i?.ingredient)}
                        </span>
                        <span>{i.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 ">
                  <div className="font-semibold">Instructions</div>
                  <dl className="grid gap-3">
                    {lastRecipe?.instructions?.map((i: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <dt className="text-muted-foreground">{i}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handlePage(pageRecipe - 1)}>
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handlePage(pageRecipe + 1)} >
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}