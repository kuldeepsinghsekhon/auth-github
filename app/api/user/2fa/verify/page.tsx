import { NextResponse } from 'next/server'
import { verifyToken } from 'node-2fa'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma  from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token } = await req.json()
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    const verified = verifyToken(user?.twoFactorSecret || '', token)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { twoFactorEnabled: true }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}