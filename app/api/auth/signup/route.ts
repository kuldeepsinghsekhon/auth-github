import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'
import { hash } from 'bcryptjs'
import { sendVerificationEmail } from '@/lib/email'
export async function POST(req: Request) {
  try {
    // Get the request body
    const body = await req.json()
  
    // Basic validation
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedPassword = await hash(body.password, 12)
       // Create user with pending status
       try {
        const user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password:hashedPassword,
          //  verificationToken,
            emailVerified: null
          }
        })
          
       } catch (error) {
  console.log(error)      
       }
          // Send verification email
    await sendVerificationEmail(
      body.email,
      `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`
    ).catch(console.error);
    // Return success response with received data
    return NextResponse.json({
      message: 'Data received successfully',
      data: {
        name: body.name,
        email: body.email,
        // Don't log password in production
        passwordReceived: !!body.password
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'error' },
      { status: 400 }
    )
  }
}