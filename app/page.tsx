"use client";

import { FormEvent, useState } from "react";

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle) return;

    const now = new Date().toISOString();
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        description: trimmedDescription || undefined,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    setTitle("");
    setDescription("");
  };

  const toggleCompleted = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Todo Test</h1>

      <form onSubmit={addTodo} className="mb-6 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded border px-3 py-2"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add
        </button>
      </form>

      <section>
        <h2 className="mb-2 text-lg font-medium">Todo List</h2>
        {todos.length === 0 ? (
          <p className="text-sm text-gray-500">No todos yet.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="rounded border px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</p>
                    {todo.description ? (
                      <p className="text-sm text-gray-600">{todo.description}</p>
                    ) : null}
                    <p className="text-xs text-gray-500">id: {todo.id}</p>
                    <p className="text-xs text-gray-500">createdAt: {todo.createdAt}</p>
                    <p className="text-xs text-gray-500">updatedAt: {todo.updatedAt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCompleted(todo.id)}
                    className="rounded border px-2 py-1 text-sm"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
