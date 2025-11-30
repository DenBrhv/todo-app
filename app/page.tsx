"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      setTodos(
        parsed.map((todo: Todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }))
      );
    }
    setMounted(true);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 tracking-tight">
            Todo App
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium">
            Organize your tasks and stay productive
          </p>
        </div>

        {/* Input Card */}
        <div className="glass dark:glass-dark rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 animate-slide-up backdrop-blur-xl border border-white/20 dark:border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800/50 dark:text-white transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base font-medium"
            />
            <button
              onClick={addTodo}
              disabled={inputValue.trim() === ""}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-base"
            >
              Add Task
            </button>
          </div>

          {todos.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-fade-in">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  filter === "all"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50 hover:scale-105"
                }`}
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  filter === "active"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50 hover:scale-105"
                }`}
              >
                Active ({activeTodosCount})
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  filter === "completed"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50 hover:scale-105"
                }`}
              >
                Completed ({completedTodosCount})
              </button>
              {completedTodosCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="ml-auto px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
                >
                  Clear Completed
                </button>
              )}
            </div>
          )}
        </div>

        {/* Todos List Card */}
        <div className="glass dark:glass-dark rounded-3xl shadow-2xl overflow-hidden animate-slide-up backdrop-blur-xl border border-white/20 dark:border-white/10">
          {filteredTodos.length === 0 ? (
            <div className="p-16 sm:p-20 text-center animate-fade-in">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium">
                {todos.length === 0
                  ? "No tasks yet. Add one above to get started! ✨"
                  : filter === "active"
                  ? "No active tasks. Great job! 🎉"
                  : filter === "completed"
                  ? "No completed tasks yet."
                  : "No tasks match your filter."}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {filteredTodos.map((todo, index) => (
                <li
                  key={todo.id}
                  className="p-5 sm:p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 animate-fade-in group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <label className="relative flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent"
                            : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-500"
                        }`}
                      >
                        {todo.completed && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </label>
                    <span
                      className={`flex-1 text-base font-medium transition-all duration-200 ${
                        todo.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-medium opacity-0 group-hover:opacity-100 transform hover:scale-110 active:scale-95"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 glass dark:glass-dark rounded-full shadow-lg backdrop-blur-xl border border-white/20 dark:border-white/10">
              <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                {activeTodosCount} {activeTodosCount === 1 ? "task" : "tasks"}{" "}
                remaining
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

