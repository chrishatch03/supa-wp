"use client";
import Link from "next/link";
import { SubmitButton } from "../submit-button";
import { NavBar } from "@/components/NavBar";
import { signIn, signUp } from "@/app/api/route";
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
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        WeeklyPlanning
      </div>
      <div
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        Roles and Goals
      </div>
      <div
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        Vision Board
      </div>
      <div
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty md:row-span-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        <NavBar />
      </div>
      <div
        className="w-full h-full ring-2 rounded-3xl 
            flex flex-col items-center
            min-h-empty md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        <div className="flex-1 flex flex-col w-full h-full px-8 sm:max-w-md items-center justify-center gap-2">
          {authFunc === "signin" ? (
            // Sign In Form
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
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
              <button onClick={() => setAuthFunc("signup")}>Sign Up</button>
            </form>
          ) : (
            // Sign Up Form
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              <div className="flex flex-row justify-between w-full gap-2">
              <div>
                <label className="text-md" htmlFor="first_name">
                    First Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="first_name"
                    placeholder="Chris"
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
                    placeholder="Hatch"
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
              <button onClick={() => setAuthFunc("signin")}>Sign In</button>
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
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        6
      </div>
      <div
        className="w-full h-full ring-2 rounded-3xl
            min-h-empty
            
            dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick"
      >
        7
      </div>
    </div>
  );
}
