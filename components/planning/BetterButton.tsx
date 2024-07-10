'use client'
// Adjustments to BetterButton.tsx to use handleAddItem from context correctly

// Import React and necessary hooks
import React, { useState } from "react";
// Import components and utilities
import { SubmitButton } from "@/app/login/submit-button";
import { useMyContext } from "@/contexts/Context";

export const BetterButton = ({ dbColumnName }: { dbColumnName: string }) => {
  const { user, setUser, handleAddItem } = useMyContext();
  // State to control the input value
  const [inputValue, setInputValue] = useState("");

  // Adjusted form submission to correctly use handleAddItem from context
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a new FormData object and append the input value
    const formData = new FormData();
    formData.append("addItem", inputValue);
    // Call handleAddItem with formData, event, and dbColumnName
    await handleAddItem(formData, event, dbColumnName);
    // Reset input value after submission
    setInputValue("");
  };

  return (
    <div className="mt-10 w-full bg-blue-500 rounded-full py-2 px-4 flex flex-row justify-center gap-4">
      <form
        className="flex flex-row w-full justify-center gap-2 text-primary"
        onSubmit={handleSubmit} // handleSubmit uses handleAddItem from context for form submission
      >
        <input
          className="rounded-full px-4 py-2 border"
          type="text"
          name="addItem"
          placeholder="••••••••"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SubmitButton
          className="border border-blue-900 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="..."
        >
          +
        </SubmitButton>
      </form>
    </div>
  );
};