'use client'
// Adjustments to BetterButton.tsx to use handleAddItem from context correctly
import React, { useState } from "react";
import { SubmitButton } from "@/app/login/submit-button";
import { useMyContext } from "@/contexts/Context";

export const InputToDatabase = ({ dbColumnName }: { dbColumnName: string }) => {
  const { user, handleAddItem } = useMyContext();
  // State to control the input value
  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");

  // Adjusted form submission to correctly use handleAddItem from context
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a new FormData object and append the input value
    const formData = new FormData();
    if (dbColumnName === "mission_statement") {
      formData.append("firstInput", firstInputValue);
      formData.append("secondInput", secondInputValue);
    } else {
      formData.append("addItem", firstInputValue)
    }
    // Call handleAddItem with formData, event, and dbColumnName
    if (user) {
      await handleAddItem(formData, event, dbColumnName, user.id);
    }
    // Reset input value after submission
    setFirstInputValue("");
    setSecondInputValue("");
  };

  return (
    <div className="mt-10 w-full bg-transparent rounded-2xl my-2 flex flex-col justify-center items-center">
      <form
        className="flex flex-row w-full justify-between items-center text-primary dark:text-white gap-2"
        onSubmit={handleSubmit} // handleSubmit uses handleAddItem from context for form submission
      >
        {/* One or two input fields to handle different form data */}
        {dbColumnName === "mission_statement" ? (
          <>
            <input
              className="px-4 focus:outline-none appearance-none h-8 rounded-lg w-full pl-3 pr-10 placeholder-gray-400 bg-primary/5 dark:bg-white/5"
              type="text"
              name="firstItem"
              placeholder="••••••••"
              value={firstInputValue}
              onChange={(e) => setFirstInputValue(e.target.value)}
            />
            <input
              className="px-4 focus:outline-none appearance-none h-8 rounded-lg w-full pl-3 pr-10 placeholder-gray-400 bg-primary/5 dark:bg-white/5"
              type="text"
              name="secondItem"
              placeholder="••••••••"
              value={secondInputValue}
              onChange={(e) => setSecondInputValue(e.target.value)}
            />
          </>
          ) : (
            <input
              className="px-4 focus:outline-none appearance-none h-8 rounded-lg w-full pl-3 pr-10 placeholder-gray-400 bg-primary/5 dark:bg-white/5"
              type="text"
              name="firstItem"
              placeholder="••••••••"
              value={firstInputValue}
              onChange={(e) => setFirstInputValue(e.target.value)}
            />
          )}
        <SubmitButton
          className="border border-primary dark:border-white rounded-lg px-4 py-2 text-primary dark:text-white h-8 flex flex-row items-center justify-center"
          pendingText="..."
        >
          +
        </SubmitButton>
      </form>
    </div>
  );
};