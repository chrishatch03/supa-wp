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
    <div className="mt-10 w-full bg-primary dark:bg-white rounded-xl p-4 flex flex-col justify-center items-center gap-4">
      <form
        className="flex flex-row w-full justify-between gap-2 text-primary"
        onSubmit={handleSubmit} // handleSubmit uses handleAddItem from context for form submission
      >
        {/* One or two input fields to handle different form data */}
        {dbColumnName === "mission_statement" ? (
          <>
            <input
              className="rounded-lg px-4 border"
              type="text"
              name="firstItem"
              placeholder="••••••••"
              value={firstInputValue}
              onChange={(e) => setFirstInputValue(e.target.value)}
            />
            <input
              className="rounded-lg px-4 border"
              type="text"
              name="secondItem"
              placeholder="••••••••"
              value={secondInputValue}
              onChange={(e) => setSecondInputValue(e.target.value)}
            />
          </>
          ) : (
            <input
              className="rounded-lg px-4 border"
              type="text"
              name="firstItem"
              placeholder="••••••••"
              value={firstInputValue}
              onChange={(e) => setFirstInputValue(e.target.value)}
            />
          )}
        <SubmitButton
          className="border border-white dark:border-primary rounded-lg px-4 py-2 text-white dark:text-primary mb-2"
          pendingText="..."
        >
          +
        </SubmitButton>
      </form>
    </div>
  );
};