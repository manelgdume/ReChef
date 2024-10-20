"use client"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
 
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const handleClick = () => {
      router.push('/dashboard'); // Ruta a la que quieres navegar
    };
    return (
        <header className="bg-foreground text-background">
            <div className="flex justify-between px-8 py-8 max-w-screen-xl mx-auto">
                <div className="flex items-center">
                    <Image
                        src={'/logoipsum-265.svg'}
                        alt="Descripción de la imagen"
                        width={40}
                        height={40}
                    />
                    <h1 className="ml-4 text-xl font-bold">ReChef</h1>
                </div>

                <div className="flex gap-16 text-sm items-center">
                    <div className="hidden md:flex gap-16">
                        <Link href={"/"} className="hidden sm:flex link-underline cursor-pointer">Home</Link>
                        <Link href={"/"} className="hidden sm:flex  link-underline cursor-pointer">Features</Link>
                        <Link href={"/"} className="hidden sm:flex  link-underline cursor-pointer">Contact</Link>
                    </div>

                    <SignedIn >
                    <button onClick={handleClick} className="items-center py-2 px-2 font-bold bg-primary rounded-lg text-black text-sm">
                                Dashboard
                    </button>            
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button className="items-center py-2 px-2 font-bold bg-primary rounded-lg text-black text-sm">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
};

export default Header;