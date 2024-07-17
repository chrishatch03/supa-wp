import React from "react";
import { List } from "@/components/planning/List";
import { InputToDatabase } from "./InputToDatabase";

export const RolesAndGoals = () => {
  return (
    <div className="p-4 h-full flex flex-col justify-between gap-4">
      <div className="p-4 flex flex-col justify-between items-center w-full h-full ring-1 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'">
        <p className="text-sm font-normal tracking-tight text-primary dark:text-white lg:text-2xl">
          Roles
        </p>
        <List dbColumnName="roles" />
        <InputToDatabase dbColumnName="roles" />
      </div>
      <div className="p-4 flex flex-col justify-between items-center w-full h-full ring-1 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick'">
        <p className="text-sm font-normal tracking-tight text-primary dark:text-white lg:text-2xl">
          Goals
        </p>
        <List dbColumnName="goals" />
        <InputToDatabase dbColumnName="goals" />
      </div>
    </div>
  );
};
