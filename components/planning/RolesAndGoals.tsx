import React from "react";
import { List } from "@/components/planning/List";
import { InputToDatabase } from "./InputToDatabase";

export const RolesAndGoals = () => {
  return (
    <div className="p-4">
      <List dbColumnName="roles" />
      <InputToDatabase dbColumnName="roles" />
      <List dbColumnName="goals" />
      <InputToDatabase dbColumnName="goals" />
    </div>
  );
};
