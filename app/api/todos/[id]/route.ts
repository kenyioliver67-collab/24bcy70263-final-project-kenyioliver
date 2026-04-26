import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { done } = await req.json()
  const todo = await db.todo.update({ where: { id: Number(id) }, data: { done } })
  return NextResponse.json(todo)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.todo.delete({ where: { id: Number(id) } })
  return NextResponse.json({ success: true })
}