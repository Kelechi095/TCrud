"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditSingleTodo() {
  const [newTitle, setNewTitle] = useState("");

  const router = useRouter();
  const { id } = useParams();

  const getTodo = async () => {
    const data = await axios.get(`/api/todo/${id}`);
    setNewTitle(data?.data.title)
  };

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateTodo = async (e: any) => {
    e.preventDefault()
    try {
      await axios.patch(`/api/todo/${id}`, { newTitle: newTitle });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleUpdateTodo}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-1"
        />
        <button className="border bg-blue-500 ml-2 cursor-pointer p-1" >
          Edit
        </button>
      </form>
    </div>
  );
}
