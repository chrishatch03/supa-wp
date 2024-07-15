import React from "react";
import { List } from "./List";
import { InputToDatabase } from "./InputToDatabase";
export const MissionStatement = () => {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold">Mission Statement</h1>
      <List dbColumnName="mission_statement" />
      <InputToDatabase dbColumnName="mission_statement" />
    </div>
  );
};
