"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useDataContext } from "@/context/dataContext";
import { redirect, useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const { authState } = useDataContext();

  return (
    <>
      {(authState === "loading" || authState === "notloggedin") && (
        <SignupInner />
      )}
      {authState === "loggedin" && router.push("/")}
    </>
  );
}

function SignupInner() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Signingup,setSigningUp] = useState<boolean>(false)
  const handleSignup: () => void = async () => {
    if (email.length == 0) {
      setError("*Email can't be empty");
      return;
    }
    if (username.length == 0) {
      setError("*username can't be empty");
      return;
    }
    if (password.length == 0) {
      setError("*Password can't be empty");
      return;
    }
    setSigningUp(true)
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/register`,
        {
          email,
          password,
          name: username,
        }
      );
      setSigningUp(false)
      router.push('/login')
    } catch (error) {
      setSigningUp(false)
      setError((error as Error).message);

    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-teal-400">
      <div className="flex flex-col items-center gap-4 bg-white p-4 py-8 h-[420px] justify-center w-80">
        <div className="text-xl">Logo</div>
        <div>Signup</div>
        <div className="text-xs text-red-900 h-2">{error}</div>
        <div className="flex flex-col gap-6 items-center w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            className="bg-zinc-200 p-2 w-full"
            placeholder="email"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.target.value);
            }}
            className="bg-zinc-200 p-2 w-full"
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            className="bg-zinc-200 p-2 w-full"
            placeholder="password"
          />
          <button
            className={`bg-black ${Signingup ? 'bg-gray-600' : 'bg-black'} text-white p-2 w-2/5`}
            onClick={handleSignup}
          >
            {!Signingup ? 'Signup' : 'Signing in...'}
            
          </button>
        </div>
        <div className="text-sm">
          Already have an account ?{" "}
          <span className="text-blue-700 cursor-pointer">
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
