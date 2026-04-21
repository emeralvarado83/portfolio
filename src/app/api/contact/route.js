import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { created_at: 'desc' },
  })
  return NextResponse.json(messages)
}

export async function POST(request) {
  const { name, email, subject, message } = await request.json()
  const msg = await prisma.contactMessage.create({
    data: { name, email, subject: subject || null, message },
  })
  return NextResponse.json(msg, { status: 201 })
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const msg = await prisma.contactMessage.update({ where: { id }, data })
  return NextResponse.json(msg)
}
