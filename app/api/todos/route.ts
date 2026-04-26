import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const todos = await db.todo.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(todos)
}

export async function POST(req: Request) {
  const { text } = await req.json()
  const todo = await db.todo.create({ data: { text } })
  return NextResponse.json(todo)
}