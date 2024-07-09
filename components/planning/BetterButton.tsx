"use client";
import { SubmitButton } from "@/app/login/submit-button";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useMyContext } from "@/contexts/Context";

export const BetterButton = ({ dbColumnName }: { dbColumnName: string }) => {
  // const [user, setUser] = useState(null);
  const { user, setUser } = useMyContext();
  const [checklistItems, setChecklistItems] = useState(null);
  const supabase = createClient();
  const [inputValue, setInputValue] = useState("");


  const handleAddItem = async (formData: FormData, event) => {
    event?.preventDefault();
    const response = formData.get("addItem");
    if (response && response !== "") {
      // Fetch the current checklist items
      const { data: currentChecklist, error: fetchError } = await supabase
        .from("planner")
        .select(dbColumnName)
        .single(); // Assuming there's only one row for simplicity

      if (fetchError) {
        console.error("Error fetching checklist:", fetchError);
        return;
      }
      //   console.log(`1 - Current Checklist: ${JSON.stringify(currentChecklist)}`);

      // Add the new item to the checklist
      const newItem = {
        id: currentChecklist[dbColumnName].items.length + 1, // Increment the id
        item: response,
      };
      currentChecklist[dbColumnName].items.push(newItem);
      //   console.log(
      //     `2 - Items Added Checklist: ${JSON.stringify(currentChecklist)}`
      //   );

      // Update the checklist items in Supabase
      const { data: updatedData, error: updateError } = await supabase
        .from("planner")
        .update({
          [dbColumnName]: { items: currentChecklist[dbColumnName].items },
        })
        .match({ id: user.id })
        .select();

      if (updateError) {
        console.error("Error updating checklist:", updateError);
        return;
      }
      //   console.log(`3 - After Update Checklist: ${JSON.stringify(updatedData)}`);

      // Ensure the updatedData structure is as expected before updating the state
      if (
        updatedData &&
        updatedData.length > 0 &&
        updatedData[0][dbColumnName]
      ) {
        setChecklistItems(updatedData[0][dbColumnName].items);
      } else {
        console.error(
          "Updated data is not in the expected format or is empty."
        );
      }
      //   console.log(
      //     `4 - Finished Checklist Items: ${JSON.stringify(checklistItems)}`
      //   );
      setInputValue("");
    }
  };
  return (
    <div className="mt-10 w-full bg-blue-500 rounded-full py-2 px-4 flex flex-row justify-center gap-4">
      <form className="flex flex-row w-full justify-center gap-2 text-primary">
        <input
          className="rounded-full px-4 py-2 border"
          type="text"
          name="addItem"
          placeholder="••••••••"
          value={inputValue} // Control the input with state
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SubmitButton
          formAction={handleAddItem}
          className="border border-blue-900 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="..."
        >
          +
        </SubmitButton>
      </form>
    </div>
  );
};
