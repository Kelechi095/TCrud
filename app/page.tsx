"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import useGetSession from "./hooks/useGetSession";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const { session } = useGetSession();

  const id = session?.id;

  const getTodos = async () => {
    try {
      const data = await axios.get(`api/todos/${id}`);
      console.log(data)
      setTodos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      getTodos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }

  const handleAddTodo = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`api/todos`, { title, userId: id });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    getTodos();
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`api/todo/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTodos();
  };

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="m-4">
      <h2>Todos</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="border px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="border bg-blue-500 text-white rounded ml-2 p-1">
          Submit
        </button>
      </form>

      <div>
        {todos?.map((todo: Todo) => (
          <div key={todo.id} className="border p-1 mt-2 flex justify-between">
            <h2 className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </h2>
            <div>
              <Link
                href={`/edit-todo/${todo.id}`}
                className="border bg-blue-500 text-white rounded ml-2 p-1"
              >
                Edit
              </Link>
              <button
                className="border bg-red-500 text-white rounded ml-2 p-1"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
