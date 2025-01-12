'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewUser() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.emailVerified) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please verify your email address to continue
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-600">
            We sent a verification link to your email address.
            Please check your inbox and click the link to verify your account.
          </p>
          
          <div className="mt-4">
            <Link
              href="/auth/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Return to sign in
            </Link>
          </div>
        </div>

        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}
      </div>
    </div>
  )
}