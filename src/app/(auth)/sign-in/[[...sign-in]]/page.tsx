import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-white via-[#f5f9ff] to-[#e0f7fa]">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Logo and Welcome Message */}
        <div className="flex flex-col justify-center items-start p-8">
          <Image
            src="/assets/logo.png" // Replace with the path to your logo
            alt="wase.0 Logo"
            width={150}
            height={150}
            className="mb-8"
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to waste.0</h1>
          <p className="text-lg text-gray-700">
            Optimize grocery orders and reduce food waste with the power of AI. Donate surplus food to local charities before it expires, and help make the world a better place.
          </p>
        </div>

        {/* Right Section: Sign In Form */}
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-semibold text-[#ff7043] mb-6 text-center">Sign In</h2>
          
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" forceRedirectUrl="/onboarding" />
            <p className="mt-6 text-sm text-center text-gray-500">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-[#2e7d32] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#2e7d32] hover:underline">
                Privacy Policy
              </a>.
            </p>
          
        </div>
      </div>

      {/* Background Accent Blob - Bottom */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a5d6a7] to-[#ffa726] opacity-10"
          />
        </div>
      </div>
    </div>
  );
}
