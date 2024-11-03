import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import treeTransition from "./truckFleet3.webp"; // Import the image
import newImage from "./DashboardSS.png"; // Import the image you want to display

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-y-auto">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${treeTransition.src})`,
          backgroundAttachment: 'scroll', // Changed to scroll
          backgroundSize: 'cover',
        }}
      />

      {/* Main Content (Layered above the background) */}
      <div className="relative z-10 flex flex-col"> {/* Removed min-h-screen */}
        {/* Navbar */}
        <header className="transparent shadow-sm w-full px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">FleetPulse</h1>
          <div>
            <SignedOut>
              <SignInButton>
                <button className="px-6 py-2 bg-primary text-white rounded hover:bg-green-600 transition ease-in-out duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center text-center py-24 px-8 mb-24">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-semibold text-black leading-tight mb-6 drop-shadow-lg">
              Reduce Carbon Emissions on Your Route with <span className="text-green-700">FleetPulse</span>
            </h1>

            <p className="text-white text-lg mb-8 drop-shadow-lg">
              Get optimized, eco-friendly route suggestions and vehicle maintenance tips to reduce your carbon footprint.
            </p>

            {/* Button for logged-out users */}
            <SignedOut>
              <SignInButton>
                <button className="py-3 px-8 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-green-800 transition-transform duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            {/* Button for logged-in users */}
            <SignedIn>
              <Link href="/dashboard" passHref>
                <button className="mt-4 py-3 px-8 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-green-800 transition-transform duration-300 transform hover:scale-105">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
          </div>
        </section>

        {/* About Us Section with Wider White Background */}
        <section className="py-42 px-8 text-center">
          <div className="mx-auto bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
            <h2 className="text-4xl font-bold mb-6 text-black">About Us</h2>
            <p className="text-lg mb-4 text-black">
              At FleetPulse, we are dedicated to providing innovative solutions for reducing carbon emissions in the transportation industry.
              Our mission is to empower businesses with the tools and insights needed to operate more sustainably.
            </p>
            <p className="text-lg text-black">
              With a team of passionate experts, we are committed to creating a greener future by optimizing routes and promoting eco-friendly practices.
            </p>
          </div>
        </section>

        {/* Picture Container Section */}
        <section className="py-32 px-8 text-center">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="text-4xl font-bold mb-6 text-black">Overview</h2>
            <div className="flex justify-center">
              <img src={newImage.src} alt="FleetPulse Commitment" className="rounded-lg shadow-md max-w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Add some content here to allow scrolling */}
        <div className="flex-grow" />

        {/* Footer */}
        <footer className="transparent py-6 px-4 shadow-md">
          <div className="text-center text-black text-sm">
            © {new Date().getFullYear()} FleetPulse. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
