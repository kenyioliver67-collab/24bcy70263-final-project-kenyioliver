'use client'

import { useEffect, useState } from 'react'
import TodoList from '@/components/TodoList'

type Todo = {
  id: number
  text: string
  done: boolean
}

type Filter = 'all' | 'active' | 'done'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [dark, setDark] = useState(false)

  // Applique le dark mode sur le html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => { setTodos(data); setLoading(false) })
  }, [])

  async function handleAdd() {
    const text = input.trim()
    if (!text) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const newTodo = await res.json()
    setTodos(prev => [newTodo, ...prev])
    setInput('')
  }

  async function handleToggle(id: number, done: boolean) {
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    })
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done } : t))
  }

  async function handleDelete(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const doneCount = todos.filter(t => t.done).length

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center py-16 px-4 transition-colors">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
            <p className="text-sm text-gray-400 mt-1">{doneCount} of {todos.length} completed</p>
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="text-2xl p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white dark:bg-gray-800 transition-colors"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-500 hover:bg-violet-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Add
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl transition-colors">
          {(['all', 'active', 'done'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-10">Loading...</p>
        ) : (
          <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
        )}

      </div>
    </main>
  )
}