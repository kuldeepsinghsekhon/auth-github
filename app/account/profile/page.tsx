'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import Image from 'next/image'
import QRCode from 'qrcode'
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
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isQrError, setIsQrError] = useState(false)
  const [qrCodeSvg, setQrCodeSvg] = useState<string>('')
  const [secret, setSecret] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
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
      setQrCode(response.data.qrcode)
      console.log(response.data)
        //setIs2FAEnabled(response.data.enabled)
        const otpauth_url = `otpauth://totp/Codersgit:${session?.user?.email}?secret=${response.data.secret}&issuer=Codersgit`
        await generateQR(otpauth_url)
    } catch (error) {
      setError('Failed to initialize 2FA')
    } finally {
      setLoading(false)
    }
  }
  const generateQR = async (otpauth_url: string) => {
    try {
      const svg = await QRCode.toString(otpauth_url, {
        type: 'svg',
        width: 256,
        errorCorrectionLevel: 'L'
      })
      setQrCodeSvg(svg)
    } catch (err) {
      setError('Failed to generate QR code')
    }
  }
  const verify2FA = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post('/api/user/2fa/verify', {
        token: verificationCode
      })
      
      if (response.data.backupCodes) {
        setBackupCodes(response.data.backupCodes)
        //setBackupCodes(true)
      }
      setIs2FAEnabled(true)
      setQrCode(null)
      setSecret(null)
    } catch (err) {
      setError('Invalid verification code')
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


        {!is2FAEnabled && !qrCode && (
        <button
          onClick={toggle2FA}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? 'Setting up...' : 'Enable 2FA'}
        </button>
      )}

{qrCode && (
        <div className="space-y-4">
          <div className="relative w-48 h-48 mx-auto bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-center text-gray-600">
            Scan this QR code with your authenticator app
          </p>
          <div 
            className="w-64 h-64 mx-auto"
            dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
          />
       
              {isQrError && (
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                Failed to load QR code
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Or enter this code manually: <code>{secret}</code>
          </p>
          <div className="space-y-2">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={verify2FA}
              disabled={loading || !verificationCode}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md"
            >
              {loading ? 'Verifying...' : 'Verify and Enable'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {backupCodes.length > 0 && (
        <div className="space-y-4 bg-yellow-50 p-4 rounded-md">
          <h3 className="font-medium">Backup Codes</h3>
          <p className="text-sm text-yellow-800">
            Save these backup codes in a secure place. They can be used to access your account if you lose your authenticator device.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {backupCodes.map((code, i) => (
              <code key={i} className="bg-white p-2 rounded text-sm">{code}</code>
            ))}
          </div>
        </div>
      )}

      {is2FAEnabled && (
        <div className="text-green-600">
          ✓ Two-factor authentication is enabled
        </div>
      )}

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