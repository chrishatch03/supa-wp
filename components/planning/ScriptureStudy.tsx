import React from "react";
import { List } from "./List";
import { InputToDatabase } from "./InputToDatabase";

const ScriptureStudy = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <div>
        <p className="text-xl text-primary dark:text-white lg:text-7xl tracking-tight">
          STORIES OF JESUS!
        </p>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 md:max-w-xs lg:max-w-none">
          Unlock the doors to explore the rich tapestry of my professional
          journey and accomplishments.
        </p>
      </div>
      <div className="w-full mt-8 md:max-w-xs lg:max-w-none">
        <List dbColumnName="scripture_study" />
        <InputToDatabase dbColumnName="scripture_study" />
      </div>
    </div>
  );
};

export default ScriptureStudy;
