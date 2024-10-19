"use client"

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
 import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { capitalize } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
 import { PanelLeft, Package2, Home , Utensils, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect,useState } from "react";
 

export default function Header() {
  const pathname = usePathname();
  const arrPathname = pathname.split('/');
  const [breadcrumb, setBreadcrumb] = useState<any>();

  useEffect(() => {
    let updatedBreadcrumb = arrPathname.slice(1);
    if (updatedBreadcrumb.length > 3) {
      updatedBreadcrumb.pop();  
    }
    setBreadcrumb(updatedBreadcrumb);
  }, [pathname]);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet >
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-foreground text-white">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold   md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 "
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/recipes"
              className="flex items-center gap-4 px-2.5 "
            >
              <Utensils className="h-5 w-5" />
              Recipes
            </Link>
            <Link
              href="/dashboard/new"
              className="flex items-center gap-4 px-2.5 "
            >
              <PlusCircle className="h-5 w-5" />
              New recipe
            </Link>
 
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumb?.map((i: any, index: number) => (
            <React.Fragment key={`frag-${i}-${index}`}>
              <BreadcrumbItem key={`item-${i}-${index}`}>
                <BreadcrumbLink >{capitalize(i)}</BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumb.length - 1 && <BreadcrumbSeparator key={`sep-${i}-${index}`} />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
 
      </div>
      <UserButton />
    </header>
  )
}