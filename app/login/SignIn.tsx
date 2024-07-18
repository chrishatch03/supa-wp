'use client';
import React from 'react'
import { SubmitButton } from '@/app/login/submit-button'
import { useAuth } from '@/contexts/AuthContext'

const SignIn = ({
    searchParams,
    setAuthFunc
  }: {
    searchParams: { message: string };
    setAuthFunc: (authFunc: string) => void;
  }) => {
    const { signIn, setAuthenticated } = useAuth()
  return (
    <div>
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
                formAction={() => {setAuthenticated(true);signIn}}
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
    </div>
  )
}

export default SignIn