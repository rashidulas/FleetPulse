import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-y-auto bg-[#1B1F2B]">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <header className="bg-[#1E2433] shadow-lg w-full px-8 py-4 flex justify-between items-center border-b border-[#2D3343]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded"></div>
            <h1 className="text-2xl font-bold text-gray-100">FleetPulse</h1>
          </div>
          <div>
          <SignedOut>
              <SignInButton>
                <button className="px-6 py-2 bg-transparent border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500/10 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* <button className="px-6 py-2 bg-transparent border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500/10 transition-colors duration-200">
              Sign In
            </button> */}
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center text-center py-24 px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-semibold text-gray-100 leading-tight mb-6">
              Fleet Management with <span className="text-teal-400">AI-Powered</span> Insights
            </h1>

            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Get optimized, eco-friendly route suggestions and vehicle maintenance tips for your fleet operations.
            </p>

            <div className="space-x-4">
              {/* <button className="py-2.5 px-6 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600 transition-colors duration-200"> */}
              <SignedOut>
              <SignInButton>
                <button className="py-2.5 px-6 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600 transition-colors duration-200">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" passHref>
                <button className="py-2.5 px-6 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600 transition-colors duration-200">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
              {/* </button> */}
              <button className="py-2.5 px-6 bg-transparent border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500/10 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="px-8 py-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Learn Card */}
            <div className="bg-[#1E2433] border border-[#2D3343] rounded-lg p-6 hover:border-teal-500/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Learn</h3>
              <div className="text-sm text-gray-400 mb-4">
                For fleet managers and operators looking to optimize their operations
              </div>
              <p className="text-gray-300 mb-6">
                Easy access to fleet management tools and resources for accelerated decision making.
              </p>
              <button className="py-2 px-4 bg-transparent border border-teal-500 text-teal-500 rounded-md text-sm hover:bg-teal-500/10 transition-colors duration-200">
                Get Started
              </button>
            </div>

            {/* Evaluate Card */}
            <div className="bg-[#1E2433] border border-[#2D3343] rounded-lg p-6 hover:border-teal-500/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Evaluate</h3>
              <div className="text-sm text-gray-400 mb-4">
                For enterprise fleet operations and logistics companies
              </div>
              <p className="text-gray-300 mb-6">
                Early access to the latest fleet management features and performance analytics.
              </p>
              <button className="py-2 px-4 bg-transparent border border-teal-500 text-teal-500 rounded-md text-sm hover:bg-teal-500/10 transition-colors duration-200">
                Get Started
              </button>
            </div>

            {/* Deploy Card */}
            <div className="bg-[#1E2433] border border-[#2D3343] rounded-lg p-6 hover:border-teal-500/50 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Deploy</h3>
              <div className="text-sm text-gray-400 mb-4">
                For large-scale fleet operations and logistics networks
              </div>
              <p className="text-gray-300 mb-6">
                Optimized infrastructure and tools for managing fleet operations at scale.
              </p>
              <button className="py-2 px-4 bg-transparent border border-teal-500 text-teal-500 rounded-md text-sm hover:bg-teal-500/10 transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-8 bg-[#1E2433]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-100 mb-8">About FleetPulse</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  At FleetPulse, we are dedicated to providing innovative solutions for fleet management and logistics optimization.
                  Our platform leverages AI and real-time analytics to help businesses operate more efficiently.
                </p>
                <p className="text-gray-300">
                  With a team of industry experts, we are committed to transforming fleet operations through technology.
                </p>
              </div>
              <div className="bg-[#1B1F2B] rounded-lg p-8 border border-[#2D3343]">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-gray-100 font-medium">Real-time Analytics</h4>
                      <p className="text-gray-400 text-sm">Monitor your fleet performance in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-gray-100 font-medium">Route Optimization</h4>
                      <p className="text-gray-400 text-sm">AI-powered route planning and optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1E2433] py-8 px-4 border-t border-[#2D3343]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FleetPulse. All Rights Reserved.
            </div>
            <div className="mt-4 space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}