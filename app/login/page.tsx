"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession, getSession } from "next-auth/react";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "password",
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


  const handleLogin = (e: any) => {
    e.preventDefault();

    signIn("credentials", {
      ...userData,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }
      if (callback?.ok && !callback.error) {
        toast.success("Login successful");
      }
    });
  };

  if(status === "loading") {
    return <h2>Loading...</h2>
  }

  if (session) {
    redirect("/");
  }

  return (
    <div className="p-2">
      <h2 className="my-8">Login</h2>

      <form onSubmit={handleLogin}>
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
          Login
        </button>
        <button className="border bg-blue-500 ml-2 cursor-pointer p-1" onClick={onGoogleSubmit}>
          Continue with google
        </button>
      </form>
    </div>
  );
}
