import { NextResponse } from 'next/server'
import { generateSecret , generateToken} from 'node-2fa'
import { auth} from "@/lib/auth"

import prisma from '@/lib/prisma'
import { setBackupCodes } from '@/lib/utils'
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // If 2FA is enabled, disable it
    if (user.twoFactorEnabled) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
          backupCodes: null
        }
      })
      return NextResponse.json({ enabled: false })
    }
    // Generate new 2FA secret
    const secret = generateSecret({
      name: "Codersgit",
      account: user.email || undefined
    })
    await prisma.user.update({
      where: { id: session.user.id },
      data: { twoFactorSecret: secret.secret }
    })
    console.log('secret.secret', secret.secret)
    // Store temporary secret
    
    return NextResponse.json({
      enabled: false,
      secret: secret.secret,
      qrcode: secret.qr
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to toggle 2FA' },
      { status: 500 }
    )
  }
}