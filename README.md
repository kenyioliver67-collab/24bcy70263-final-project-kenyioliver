# 📋 My Todo App

A full-stack task manager built with **Next.js**, **Prisma**, and **SQLite**.

---

## ⚠️ Requirements

- **Node.js v20** — [Download here](https://nodejs.org/en/download)

---

## 🚀 Run it locally

### 1. Clone or extract the project

If you downloaded the zip, extract it and open the folder in your terminal.

```bash
cd my-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variables

Create a `.env` file at the root of the project:

```bash
touch .env
```

Then open it and add this line:

```
DATABASE_URL="file:./dev.db"
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the dev server

```bash
npm run dev
```

### 6. Open the app

Go to [http://localhost:3000](http://localhost:3000) in your browser. ✅

---

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org/) — frontend + API routes
- [Prisma 5](https://www.prisma.io/) — database ORM
- [SQLite](https://www.sqlite.org/) — local database (no setup needed)
- [Tailwind CSS](https://tailwindcss.com/) — styling

---

## 📁 Project Structure

```
my-todo-app/
├── app/
│   ├── page.tsx              # Main UI
│   └── api/todos/
│       ├── route.ts          # GET all, POST new todo
│       └── [id]/route.ts     # PATCH (toggle), DELETE
├── components/
│   ├── TodoList.tsx
│   └── TodoItem.tsx
├── lib/
│   └── db.ts                 # Prisma client
└── prisma/
    └── schema.prisma         # Todo model
```

---

## ✨ Features

- Add tasks
- Mark tasks as complete / incomplete
- Delete tasks
- Filter by All / Active / Done
- Dark mode 🌙
- Data persists after page refresh
