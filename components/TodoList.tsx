import TodoItem from './TodoItem'

type Todo = {
  id: number
  text: string
  done: boolean
}

type Props = {
  todos: Todo[]
  onToggle: (id: number, done: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 text-sm">
        No tasks yet. Add one above! 👆
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}