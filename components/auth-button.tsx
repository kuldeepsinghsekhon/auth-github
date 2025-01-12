'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled>Loading...</Button>
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center space-x-4">
        <p>Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    )
  }

  return <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
}

