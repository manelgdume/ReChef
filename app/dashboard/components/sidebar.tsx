"use client"

import Image from 'next/image';
import Link from 'next/link';
 
import { Home, PlusCircle , Utensils } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
 

export default function Sidebar() {
 
 
  return (
    <aside className="text-white fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-foreground sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={'/logoipsum-265.svg'}
            alt="Descripción de la imagen"
            width={25}
            height={25}
          />
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg   transition-colors hover:text-white md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/recipes"
              className="flex h-9 w-9 items-center justify-center rounded-lg   transition-colors hover:text-white md:h-8 md:w-8"
            >
              <Utensils className="h-5 w-5" />
              <span className="sr-only">Recipes</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Recipes</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/new"
              className="flex h-9 w-9 items-center justify-center rounded-lg   transition-colors hover:text-white md:h-8 md:w-8"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">New recipe</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">New recipe</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
 
      </nav>
    </aside>
  )
}