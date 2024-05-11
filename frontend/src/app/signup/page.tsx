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
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Signingup, setSigningUp] = useState<boolean>(false);
  const handleSignup= async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
    setSigningUp(true);
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/register`,
        {
          email,
          password,
          name: username,
        }
      );
      setSigningUp(false);
      router.push("/login");
    } catch (error) {
      setSigningUp(false);
      setError((error as Error).message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 homepage">
        <div className="text-xs text-red-900 h-2">{error}</div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your Hairify account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  required
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 text-sm sm:leading-6"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setError("");
                    setUsername(e.target.value);
                  }}
                  required
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 text-sm sm:leading-6"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 text-sm sm:leading-6"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSignup}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!Signingup ? "Signup" : "Signing in..."}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account ?{" "}
            <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}