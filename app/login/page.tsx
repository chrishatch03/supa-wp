"use client";
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { NavBar } from "@/components/NavBar";
import { signIn, signUp } from "@/app/api/myRoute";
import { useState } from "react";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [authFunc, setAuthFunc] = useState("signin");

  return (
    <div
      className="w-full h-full min-h-screen p-4 gap-4
        grid 
        grid-cols-1
        md:grid-cols-3 md:grid-rows-4
        lg:grid-cols-4 lg:grid-rows-3
        dark:bg-primary"
    >
      <div
        className="flex flex-col justify-center items-center bg-cover bg-center bg-adventure6 dark:bg-adventure6-dark  w-full h-full ring-2 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        <h1 className="md:hidden text-3xl text-center mt-14 font-medium lg:text-5xl tracking-tight text-gray-700 dark:text-gray-100">
              Welcome!
          </h1>
        {/* WeeklyPlanning */}
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-adventure2 dark:bg-adventure2-dark  w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        {/* Roles and Goals */}
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-adventure8 dark:bg-adventure8-dark  w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        {/* Vision Board */}
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-adventure4 dark:bg-adventure4-dark  w-full h-full ring-2 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        <NavBar />
      </div>
      <div
        className="bg-cover bg-center bg-adventure3 dark:bg-adventure3-dark  w-full h-full ring-2 rounded-3xl 
            flex flex-col items-center
            min-h-empty md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        <div className="flex-1 flex flex-col w-full h-full px-8 sm:max-w-md items-center justify-center gap-2">
          <h1 className="hidden md:block text-3xl text-center mt-14 font-medium lg:text-5xl tracking-tight text-gray-700 dark:text-gray-100">
              Welcome!
          </h1>
          {authFunc === "signin" ? (
            // Sign In Form
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-12 mt-12 md:mt-0">
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <SubmitButton
                formAction={signIn}
                className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
              >
                Sign In
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-blue-900/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
              <p className="text-center text-white">Don't have an account? <button className="text-blue-300" onClick={() => setAuthFunc("signup")}>Sign Up</button></p>
              
            </form>
          ) : (
            // Sign Up Form
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-white">
              <div className="flex flex-row justify-between w-full gap-2">
              <div>
                <label className="text-md" htmlFor="first_name">
                    First Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="first_name"
                    placeholder="First Name"
                    required
                />
              </div>
              <div>
                <label className="text-md" htmlFor="last_name">
                    Last Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="last_name"
                    placeholder="Last Name"
                    required
                />
              </div>
              </div>
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <SubmitButton
                formAction={signUp}
                className="border border-blue-900 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing Up..."
              >
                Sign Up
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-blue-900/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
              <p className="text-center text-white">Don't have an account? <button className="text-blue-300" onClick={() => setAuthFunc("signin")}>Sign In</button></p>
            </form>
          )}

          <Link
            href="/"
            className="relative bottom-10 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
          </Link>
        </div>
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-adventure12 dark:bg-adventure12-dark w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        {/* 6 */}
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-adventure10 dark:bg-adventure10-dark w-full h-full ring-2 rounded-3xl
            min-h-empty
            
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        {/* 7 */}
      </div>
    </div>
  );
}
