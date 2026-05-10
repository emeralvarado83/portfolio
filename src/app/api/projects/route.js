import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

function errorResponse(error, fallback = 'No se pudo procesar el proyecto') {
  console.error(error)
  return NextResponse.json(
    { error: process.env.NODE_ENV === 'production' ? fallback : error.message },
    { status: 500 }
  )
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }],
    })
    return NextResponse.json(projects)
  } catch (error) {
    return errorResponse(error, 'No se pudieron cargar los proyectos')
  }
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return errorResponse(error, 'No se pudo crear el proyecto')
  }
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id, ...data } = await request.json()
    const project = await prisma.project.update({ where: { id }, data })
    return NextResponse.json(project)
  } catch (error) {
    return errorResponse(error, 'No se pudo actualizar el proyecto')
  }
}

export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return errorResponse(error, 'No se pudo eliminar el proyecto')
  }
}
