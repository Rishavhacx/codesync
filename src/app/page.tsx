import { SignedIn, SignedOut,SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="m-10">
      <SignedOut>
        <SignInButton><Button>log in</Button></SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
