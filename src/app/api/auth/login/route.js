import { NextResponse } from 'next/server'
import { verifyCredentials, createToken } from '@/lib/auth'

export async function POST(request) {
  const { email, password } = await request.json()

  const valid = await verifyCredentials(email, password)
  if (!valid) {
    return NextResponse.json({ error: 'Credenciales incorrectas.' }, { status: 401 })
  }

  const token = await createToken(email)
  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return response
}
