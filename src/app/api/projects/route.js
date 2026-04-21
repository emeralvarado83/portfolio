import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }],
  })
  return NextResponse.json(projects)
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const data = await request.json()
  const project = await prisma.project.create({ data })
  return NextResponse.json(project, { status: 201 })
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const project = await prisma.project.update({ where: { id }, data })
  return NextResponse.json(project)
}

export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await request.json()
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
