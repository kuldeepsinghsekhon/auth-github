'use client'

import { AuthButton } from "@/components/auth-button"
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        redirect: false,
      })

      if (res?.error) {
        setError('Invalid Email Address')
        return
      }

      router.push('/auth/signin')
      router.refresh()
    } catch (error) {
      setError('Something went wrong')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">We will send you a verification email</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
            {error && (
            <div className="text-red-600 text-center text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <Link 
              href="/auth/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Signin?
            </Link>
            <Link 
              href="/auth/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
             SignUp
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Request Password
          </button>
        </form>
      </div>
    </div>
  )
}

