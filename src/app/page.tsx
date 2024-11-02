import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm w-full px-8 py-4 flex justify-between items-center">
        <SignedOut>
          <SignInButton>
            <button className="px-6 py-2 bg-[#f87315] text-white rounded hover:bg-orange-600">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
        <section>
          {/* Button for logged-out users */}
          <SignedOut>
            <SignInButton>
              <button
                className="mt-5 py-3 px-6 bg-[#f87315] text-black rounded-lg text-lg font-semibold shadow-lg hover:bg-orange-800 hover:shadow-orange-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
              >
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          

          {/* Button for logged-in users */}
          <SignedIn>
            <Link href="/dashboard" passHref>
            
            <div className="my-8">
            </div>
            
            <div className="w-full mx-auto">
            <button
                className="mx-auto mt-5 py-3 px-6 bg-[#f87315] text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-orange-800 hover:shadow-orange-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
              >
                Dashboard
              </button>
            </div>
              
            </Link>
          </SignedIn>
        </section>
    </div>
  );
}
