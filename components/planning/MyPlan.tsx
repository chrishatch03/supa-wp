"use client";
import React from "react";
import { List } from "./List";
import { InputToDatabase } from "./InputToDatabase";
import { useMyContext } from "@/contexts/Context";
import { Avatar } from "@/components/Avatar";

export const MyPlan = () => {
  const { user } = useMyContext();
  return (
    <>
      {user && (
        <div className="w-full h-full rounded-3xl flex flex-col p-4">
          {/* User Header */}
          <div className="relative flex items-center gap-x-4">
            {/* <img src="/images/portrait.jpg" alt="" className="h-10 w-10 rounded-full ring-1 dark:ring-white/10 ring-primary/5 object-cover" style="object-position: 50% 50%;"/> */}
            <Avatar />
            <div className="text-md leading-6">
              <p className="font-semibold text-primary dark:text-white">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  {user.user_metadata.first_name && user.user_metadata.last_name ? (
                    `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                  ) : (
                    'Go Getter'
                  )}
                </a>
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                User Bio Goes Here
              </p>
            </div>
          </div>
          <p className="text-3xl mt-6 font-medium lg:text-4xl tracking-tight text-primary dark:text-white">
            This week
          </p>
          {/* Checklist */}
          <List dbColumnName="checklist_items" />
          {/* Add to Checklist */}
          <InputToDatabase dbColumnName="checklist_items" />
        </div>
      )}
    </>
  );
};
