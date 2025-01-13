import { NextResponse } from 'next/server'
import { generateSecret } from 'node-2fa'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import  prisma  from '@/lib/prisma'
import {setBackupCodes}from '@/lib/utils'
export default async function POST() {
  try {
    const session = await getServerSession(authOptions)
 
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret = generateSecret({
      name: "YourApp",
      account: session.user.email
    })
    console.log('sdfsdfsdf',JSON.stringify(secret.secret))
    // await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { twoFactorSecret: JSON.stringify(secret.secret) }
    // })
console.log(secret.qr)
    return NextResponse.json({ 
      secret: JSON.stringify(secret.secret),
      qrcode: secret.qr
    })
  } catch (error) {
    console.log('eeeee',error)
    //return NextResponse.json({ error: 'Setup failed' }, { status: 500 })
  }
}