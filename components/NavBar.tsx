// components/NavBar.js
"use client";
import React, { useState } from "react";
import { signOut } from "@/app/api/myRoute";
import Link from "next/link";
import { useMyContext } from "@/contexts/Context";
import { Avatar } from "@/components/Avatar";

export const NavBar = () => {
  const { user, avatarURL } = useMyContext();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <button onClick={() => setNavOpen(!navOpen)} className={`${navOpen ? "hidden" : ""} absolute top-8 right-8 flex flex-col items-center border-2 border-primary dark:border-white h-12 w-12 rounded-xl text-4xl`}>
        ☰
      </button>
      <nav id="navBar" className={`${navOpen ? "" : "hidden"} absolute top-0 right-0 w-1/4 flex justify-center h-full backdrop-blur-md`}>
        <div className="w-full flex flex-col h-full justify-start ">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm h-16 border-b border-b-primary dark:border-b-white">
            <div className="flex flex-row max-h-10">
              {user ? (
                <div className="flex items-center gap-4 min-w-fit">
                  <form action={signOut}>
                    <button className="py-2 px-4 rounded-md no-underline bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover">Logout</button>
                  </form>
                  <Avatar />
                </div>
              ) : (
                <Link href="/login" className="min-w-fit py-2 px-4 rounded-md no-underline bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover">
                  Sign In
                </Link>
              )}
              <button onClick={() => setNavOpen(!navOpen)} className="ml-2 w-full max-w-4xl flex justify-between items-center p-3 text-sm rounded-md no-underline bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover">
                X
              </button>
            </div>
          </div>
          {user ? (
            <div className="w-full h-full p-3">
              <div className="flex items-center gap-4 min-w-fit">Hey, {user?.email}!</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </>
  );
};
