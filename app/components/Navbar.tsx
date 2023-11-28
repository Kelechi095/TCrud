"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetSession from "../hooks/useGetSession";


const Navbar = () => {

  const {session} = useGetSession()
  
  const router = useRouter()
  const handleSignOut = () => {
    signOut()
  }


  return (
    <nav className=" px-10 h-16 shadow-md border-2 w-full">
      <ul className="my-3 flex justify-between items-center px-4 text-blue-500">
        {session ? <button className="border p-1" onClick={handleSignOut}>
          Logout
        </button>: 'NextTodoApp'}
        {session && <h2 className="text-black">Welcome: {session?.name}</h2>}
      </ul>
    </nav>
  );
};

export default Navbar;
