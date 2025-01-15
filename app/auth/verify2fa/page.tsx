'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'

export default function Verify2FA() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get('userId')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/auth/verify-2fa', {
        userId,
        code
      })
      router.push('/dashboard')
    } catch (error) {
      setError('Invalid code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 2FA code"
          className="block w-full rounded-lg border p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-500 p-2 text-white"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  )
}