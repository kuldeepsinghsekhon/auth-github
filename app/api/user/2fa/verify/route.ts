import { NextResponse } from 'next/server'
import {generateToken, verifyToken } from 'node-2fa'
import  prisma  from '@/lib/prisma'
//import speakeasy from 'speakeasy';
import{auth} from '@/lib/auth'
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token, isRecoveryCode } = await req.json()

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })
    if (!user?.twoFactorSecret) {
      return NextResponse.json({ error: 'No 2FA secret found' }, { status: 400 })
    }
    let isValid = false
    if (isRecoveryCode) {
      // Verify recovery code
      const recoveryCodes = JSON.parse(user.backupCodes || '[]')
      isValid = recoveryCodes.includes(token)
      
      if (isValid) {
        // Remove used recovery code
        const updatedCodes = recoveryCodes.filter(code => code !== token)
        await prisma.user.update({
          where: { id: user.id },
          data: { backupCodes: JSON.stringify(updatedCodes) }
        })
      }
    } else {
      // Verify TOTP
      const result = verifyToken(user.twoFactorSecret, token)
      isValid = !!result?.delta
    }
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    }
    // Generate a current token to compare with user input
  //   const currentToken = generateToken(user.twoFactorSecret)
      
     //isValid = currentToken?.token === token
    // console.log('user.twoFactorSecret',user.twoFactorSecret)

     // const isValid = speakeasy.totp.verify({
//   secret: user.twoFactorSecret,
//   encoding: 'base32',
//   token,
//   window: 1 // Extends the time window to ±1 step (default step is 30 seconds)
// });
    if (!isValid || !isValid.delta === 0) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
    }
//console.log(currentToken?.token,token)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    }

    // Generate backup codes
    if (!user.backupCodes) {
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).slice(2, 8)
    )

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        backupCodes: JSON.stringify(backupCodes)
      }
    })

    return NextResponse.json({
      success: true,
      backupCodes
    })
  }
  return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
} 