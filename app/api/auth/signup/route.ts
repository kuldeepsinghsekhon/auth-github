import { NextResponse } from 'next/server'
//import prisma from '@/lib/prisma'
import { PrismaClient } from "@prisma/client"
import crypto from 'crypto'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()
export async function POST(req: Request) {
  try {
    // Get the request body
    const body = await req.json()
    
    // Log the received data
    console.log('Received signup data:', body)

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
       const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
         // hashedPassword,
        //  verificationToken,
          emailVerified: null
        }
      })
    // Return success response with received data
    return NextResponse.json({
      message: 'Data received successfully',
      data: {
        name: body.name,
        email: body.email,
        // Don't log password in production
        passwordReceived: !!body.password
      }
    }, { status: 400 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error },
      { status: 400 }
    )
  }
}