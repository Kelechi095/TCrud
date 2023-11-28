"use client";

import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession, getSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onGoogleSubmit = () => {
    signIn("google");
  };


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", userData);
      router.push("/login");
      toast.success("Registration successful");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  if (session) {
    redirect("/");
  }

  

  return (
    <div className="p-2">
      <h2 className="my-8">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={userData.name}
          name="name"
          onChange={handleChange}
          className="border p-1"
          placeholder="name"
        />
        <input
          type="email"
          value={userData.email}
          name="email"
          onChange={handleChange}
          className="border p-1"
          placeholder="email"
        />
        <input
          type="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
          className="border p-1"
          placeholder="password"
        />
        <button className="border bg-blue-500 ml-2 cursor-pointer p-1">
          Register
        </button>
        <button className="border bg-blue-500 ml-2 cursor-pointer p-1" onClick={onGoogleSubmit} type="button">
          Continue with google
        </button>

      </form>
    </div>
  );
}
