import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export const runtime = "edge";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign in to your account</h1>
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl="/onboarding"
          />
    </div>
  );
}
