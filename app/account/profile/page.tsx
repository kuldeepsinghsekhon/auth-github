'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [sessions, setSessions] = useState([])
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    }
  })

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema)
  })

  const updateProfile = async (data) => {
    try {
      setLoading(true)
      await axios.patch('/api/user/profile', data)
      await update()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (data) => {
    try {
      setLoading(true)
      await axios.post('/api/user/change-password', data)
      passwordForm.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const toggle2FA = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/user/2fa/toggle')
      setIs2FAEnabled(response.data.enabled)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const logoutAllDevices = async () => {
    try {
      setLoading(true)
      await axios.post('/api/auth/logout-all')
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      
      {/* Profile Update Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={profileForm.handleSubmit(updateProfile)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              {...profileForm.register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              {...profileForm.register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update Profile
          </button>
        </form>
      </section>

      {/* Password Change Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={passwordForm.handleSubmit(changePassword)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input 
              type="password"
              {...passwordForm.register('currentPassword')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input 
              type="password"
              {...passwordForm.register('newPassword')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password"
              {...passwordForm.register('confirmPassword')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* 2FA Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
        <button
          onClick={toggle2FA}
          disabled={loading}
          className={`px-4 py-2 rounded-md ${
            is2FAEnabled ? 'bg-red-600' : 'bg-green-600'
          } text-white`}
        >
          {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
        </button>
      </section>

      {/* Session Management */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
        <button
          onClick={logoutAllDevices}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout from all devices
        </button>
      </section>
    </div>
  )
}