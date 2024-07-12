// contexts/Context.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const Context = createContext();

const ContextProvider = ({ children, initialUser }) => {
  const supabase = createClient();
  const [user, setUser] = useState(initialUser || null);
  const [avatarURL, setAvatarURL] = useState(null);
  const [visionBoardURLs, setVisionBoardURLs] = useState([]);

  useEffect(() => {
    const fetchVisionBoardURLs = async () => {
      if (!user || !user.id) return;

      let folderName = `${user.id}`; // Assuming the user's UID is used as a directory name
      const { data: visionBoardFiles, error: visionBoardFilesError } =
        await supabase.storage.from("visionBoard").list(folderName);

      let visionFiles = [];
      if (visionBoardFiles) {
        visionFiles = visionBoardFiles.map((file) => {
          return `${folderName}/${file.name}`;
        });
      }

      const { data: signedURLs, error: signedURLsError } =
        await supabase.storage
          .from("visionBoard")
          .createSignedUrls(visionFiles, 3600);
      let finSignedURLs = [];
      if (signedURLs) {
        finSignedURLs = signedURLs.map((file) => {
          return file.signedUrl;
        });
      }
      if (signedURLs[0].error) {
        setVisionBoardURLs([
          "/default-avatar.png",
          "/default-avatar.png",
          "/default-avatar.png",
        ]);
      } else if (signedURLs) {
        return setVisionBoardURLs(finSignedURLs);
      }
    };

    fetchVisionBoardURLs();
  }, [user, supabase]);

  useEffect(() => {
    const fetchAvatarURL = async () => {
      if (!user || !user.id) return;

      const basePath = `${user.id}/`; // Assuming the user's UID is used as a directory name

      const path = `${basePath}avatar`; // Adjusted to include the UID directory
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrl(path, 3600);

      if (data) {
        // console.log(data.signedUrl)
      }
      if (error) {
        setAvatarURL("/default-avatar.png");
      } else if (data.signedUrl) {
        setAvatarURL(data.signedUrl);
        return;
      }
    };

    fetchAvatarURL();
  }, [user, supabase]);

  const [checklistItems, setChecklistItems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [missionStatement, setMissionStatement] = useState([]);

  const getList = async (dbColumnName, userID) => {
    let { data: list, error } = await supabase
      .from("planner")
      .select(dbColumnName)
      .eq("id", userID); // Corrected to use dbColumnName
    // console.log(list);
    // Assuming list is an array with at least one object that has a list_items property
    if (list && list.length > 0 && list[0][dbColumnName]) {
      if (dbColumnName === "checklist_items") {
        setChecklistItems(list[0][dbColumnName].items);
      } else if (dbColumnName === "roles") {
        setRoles(list[0][dbColumnName].items);
        console.log(`Roles: ${roles}`);
      } else if (dbColumnName === "goals") {
        setGoals(list[0][dbColumnName].items);
      } else if (dbColumnName === "mission_statement") {
        setMissionStatement(list[0][dbColumnName].items);
      }
    }
  };

  const handleAddItem = async (formData, event, dbColumnName, userID) => {
    if (dbColumnName === "mission_statement") {
      event?.preventDefault();
      const name = formData.get("firstInput");
      const desc = formData.get("secondInput");
      if (name && name !== "" && desc && desc !== "") {
        // Fetch the current checklist items
        const { data: currentChecklist, error: fetchError } = await supabase
          .from("planner")
          .select(dbColumnName)
          .single()
          .eq("id", userID); // Assuming there's only one row for simplicity

        if (fetchError) {
          console.error("Error fetching checklist:", fetchError);
          return;
        }
        console.log(
          `1 - Current Checklist: ${JSON.stringify(currentChecklist)}`
        );
        console.log(`1 - ChecklistItems: ${JSON.stringify(checklistItems)}`);
        // Add the new item to the checklist
        const newItem = {
          id: currentChecklist[dbColumnName].items.length + 1, // Increment the id
          name: name,
          desc: desc,
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
          if (dbColumnName === "checklist_items") {
            setChecklistItems(updatedData[0][dbColumnName].items);
          } else if (dbColumnName === "roles") {
            setRoles(updatedData[0][dbColumnName].items);
          } else if (dbColumnName === "goals") {
            setGoals(updatedData[0][dbColumnName].items);
          } else if (dbColumnName === "mission_statement") {
            setMissionStatement(updatedData[0][dbColumnName].items);
          }
        } else {
          console.error(
            "Updated data is not in the expected format or is empty."
          );
        }
        //   console.log(
        //     `4 - Finished Checklist Items: ${JSON.stringify(checklistItems)}`
        //   );
      }
    }
    event?.preventDefault();
    const response = formData.get("addItem");
    if (response && response !== "") {
      // Fetch the current checklist items
      const { data: currentChecklist, error: fetchError } = await supabase
        .from("planner")
        .select(dbColumnName)
        .single()
        .eq("id", userID); // Assuming there's only one row for simplicity

      if (fetchError) {
        console.error("Error fetching checklist:", fetchError);
        return;
      }
      console.log(`1 - Current Checklist: ${JSON.stringify(currentChecklist)}`);
      console.log(`1 - ChecklistItems: ${JSON.stringify(checklistItems)}`);
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
        if (dbColumnName === "checklist_items") {
          setChecklistItems(updatedData[0][dbColumnName].items);
        } else if (dbColumnName === "roles") {
          setRoles(updatedData[0][dbColumnName].items);
        } else if (dbColumnName === "goals") {
          setGoals(updatedData[0][dbColumnName].items);
        }
      } else {
        console.error(
          "Updated data is not in the expected format or is empty."
        );
      }
      //   console.log(
      //     `4 - Finished Checklist Items: ${JSON.stringify(checklistItems)}`
      //   );
    }
  };

  const handleDeleteItem = async (id, dbColumnName, userID) => {
    // Fetch the current list items
    const { data: currentList, error: fetchError } = await supabase
      .from("planner")
      .select(`${dbColumnName}`)
      .single()
      .eq("id", userID); // Assuming there's only one row for simplicity

    if (fetchError) {
      console.error("Error fetching list:", fetchError);
      return;
    }
    // console.log(`1 - Current list: ${JSON.stringify(currentList)}`);

    // Remove the item with the specified id
    const updatedListItems = currentList[dbColumnName].items.filter(
      (item) => item.id !== id
    );
    // console.log(
    //   `2 - Items Removed List: ${JSON.stringify(updatedListItems)}`
    // );

    // Update the list items in Supabase
    const { data: updatedData, error: updateError } = await supabase
      .from("planner")
      .update({ [dbColumnName]: { items: updatedListItems } })
      .match({ id: user.id })
      .select();

    if (updateError) {
      console.error("Error updating List:", updateError);
      return;
    }
    // console.log(`3 - After Update List: ${JSON.stringify(updatedData)}`);

    // Ensure the updatedData structure is as expected before updating the state
    if (updatedData && updatedData.length > 0 && updatedData[0][dbColumnName]) {
      if (dbColumnName === "checklist_items") {
        setChecklistItems(updatedData[0][dbColumnName].items);
      } else if (dbColumnName === "roles") {
        setRoles(updatedData[0][dbColumnName].items);
      } else if (dbColumnName === "goals") {
        setGoals(updatedData[0][dbColumnName].items);
      } else if (dbColumnName === "mission_statement") {
        setMissionStatement(updatedData[0][dbColumnName].items);
      }
    } else {
      console.error("Updated data is not in the expected format or is empty.");
    }
    // console.log(
    //   `4 - Finished List Items: ${JSON.stringify(listItems)}`
    // );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser || null);
    };

    // If there is no initial user, fetch the user from the server
    if (!initialUser) {
      fetchUser();
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          fetchUser();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, initialUser]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        avatarURL,
        visionBoardURLs,
        checklistItems,
        setChecklistItems,
        roles,
        setRoles,
        goals,
        setGoals,
        missionStatement,
        setMissionStatement,
        handleAddItem,
        handleDeleteItem,
        getList,
        supabase,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};

export { ContextProvider, useMyContext };
