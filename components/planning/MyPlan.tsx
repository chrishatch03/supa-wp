"use client";
import React from "react";
import { List } from "./List";
import { BetterButton } from "./BetterButton";
import { useMyContext } from "@/contexts/Context";
import { Avatar } from "@/components/Avatar";

export const MyPlan = () => {
  const { user, avatarURL } = useMyContext();
  return (
    <>
      {user && (
        <div className="w-full h-full rounded-3xl flex flex-col p-4">
          {/* User Header */}
          <div className="flex flex-row gap-2 mb-10">
            {/* Profile Pic */}
            <Avatar />
            {/* User Info */}
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full items-start flex flex-row justify-start">
                <h1 className="text-3xl text-primary dark:text-white font-bold">
                  This week
                </h1>
              </div>
              <div className="w-full flex flex-row justify-start">
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          {/* Checklist */}
          <List dbColumnName="checklist_items" />
          {/* Add to Checklist */}
          <BetterButton dbColumnName="checklist_items" />
        </div>
      )}
    </>
  );
};
