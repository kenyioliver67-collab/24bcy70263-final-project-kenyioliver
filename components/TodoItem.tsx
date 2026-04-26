type Todo = {
  id: number
  text: string
  done: boolean
}

type Props = {
  todo: Todo
  onToggle: (id: number, done: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group transition-colors">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id, !todo.done)}
          className="w-5 h-5 accent-violet-500 cursor-pointer"
        />
        <span className={`text-sm ${todo.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg font-bold"
      >
        ✕
      </button>
    </div>
  )
}