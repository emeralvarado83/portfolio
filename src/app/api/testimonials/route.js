import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const all = searchParams.get('all')

  if (all === 'true') {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json(testimonials)
  }

  const testimonials = await prisma.testimonial.findMany({
    where: { status: 'approved' },
    select: { id: true, name: true, role: true, company: true, quote: true, rating: true },
    orderBy: { created_at: 'desc' },
  })
  return NextResponse.json(testimonials)
}

export async function POST(request) {
  const { name, role, company, quote, rating } = await request.json()
  const testimonial = await prisma.testimonial.create({
    data: { name, role, company, quote, rating, status: 'pending' },
  })
  return NextResponse.json(testimonial, { status: 201 })
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const testimonial = await prisma.testimonial.update({ where: { id }, data })
  return NextResponse.json(testimonial)
}
