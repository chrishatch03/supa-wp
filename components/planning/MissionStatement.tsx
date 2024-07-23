import React from "react";
import { List } from "./List";
import { InputToDatabase } from "./InputToDatabase";
export const MissionStatement = () => {
  return (
    <>
    <div className="h-full lg:gap-0 md:items-center md:gap-12 p-8 ">
          <div className="flex flex-col justify-start h-full w-full">
            <div className="flex w-full">
              <div>
                <p className="text-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
                  MISSION STATEMENT
                </p>
              </div>
              
            </div>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              A mission statement is not something you write overnight... But fundamentally, your mission statement becomes your constitution, the solid expression of your vision and values. It becomes the criterion by which you measure everything else in your life.
              <br />
              <br />
              Stephen Covey.
            </p>
            <hr className="border-t-2 border-gray-300 dark:border-zinc-400 my-4"/>
            <div className="relative">
              <List dbColumnName="mission_statement" />
            </div>
              <InputToDatabase dbColumnName="mission_statement" />
          </div>
        </div>
    </>
  );
};
