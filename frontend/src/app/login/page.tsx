"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/context/dataContext";

export default function Login() {
  const router = useRouter();
  const { authState } = useDataContext();

  return (
    <>
      {(authState === "loading" || authState === "notloggedin") && (
        <LoginInner />
      )}
      {authState === "loggedin" && router.push("/")}
    </>
  );
}

function LoginInner() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loggingIn,setLogginIn] = useState<boolean>(false)
  const router = useRouter()
  const handleLogin: () => void = async () => {
    if (email.length == 0) {
      setError("*Email can't be empty");
      return;
    }
    if (password.length == 0) {
      setError("*Password can't be empty");
      return;
    }
    //call the api here
    setLogginIn(true)
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/login`,
        {
          email,
          password,
        }
      );
      console.log(data);
      localStorage.setItem("access", data.data.access);
      localStorage.setItem("refresh", data.data.refresh);
      setLogginIn(false)
      window.location.reload()
      // router.push('/chat')
    } catch (error) {
      setError((error as Error).message);
      setLogginIn(false)
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-teal-400">
      <div className="flex flex-col items-center gap-4 bg-white p-4 py-8 h-96 justify-center w-80">
        <div className="text-xl">Logo</div>
        <div>Login</div>
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
            className={`bg-black ${loggingIn ? 'bg-gray-600' : 'bg-black'} text-white p-2 w-2/5`}
            onClick={handleLogin}
          >
            {!loggingIn ? 'Login' : 'Logging in...'}
            
          </button>
        </div>
        <div className="text-sm">
          {`Don't have an account ?`}{" "}
          <span className="text-blue-700 cursor-pointer">
            <Link href="signup">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
