// contexts/Context.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const supabase = createClient();
  const { user, setAuthPageTouch } = useAuth();
  const [avatarURL, setAvatarURL] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [roles, setRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [visionBoardURLs, setVisionBoardURLs] = useState([]);
  const [rerenderVisionBoard, setRerenderVisionBoard] = useState(false);
  const [scriptureStudy, setScriptureStudy] = useState([]);
  const [missionStatement, setMissionStatement] = useState([]);
  const [notes, setNotes] = useState("");

  // FETCH DATA ON PAGE LOAD AND RELOAD
  useEffect(() => {
    const handlePageReload = async () => {
      if (user) {
        await fetchVisionBoardURLs();
        await fetchAvatarURL();
        await getList("checklist_items", user.id);
        await getList("roles", user.id);
        await getList("goals", user.id);
        await getList("mission_statement", user.id);
        await getList("scripture_study", user.id);
        await getNotes();
      }
    };

    handlePageReload();
  }, [user]);

  const fetchVisionBoardURLs = async () => {
    if (!user || !user.id) return;
    // check for a folder in storage with the user's id
    const { data, error } = await supabase
        .storage
        .from('visionBoard')
        .list(user.id, { limit: 1 })
    
    if (error) {
        console.error('Error checking folder:', error)
        return false
    }

    // If data is not empty, the folder exists
    if (data.length > 0 && data !== null) {
      let folderName = `${user.id}`; // Assuming the user's UID is used as a directory name
      const { data: visionBoardFiles, error: visionBoardFilesError } =
        await supabase.storage.from("visionBoard").list(folderName);

      let visionFiles = [];
      if (visionBoardFiles) {
        visionFiles = visionBoardFiles.map((file) => {
          return `${folderName}/${file.name}`;
        });
      }

      const { data: signedURLs, error: signedURLsError } = await supabase.storage
        .from("visionBoard")
        .createSignedUrls(visionFiles, 3600);
      let finSignedURLs = [];
      // console.log(signedURLs)

      if (signedURLs && signedURLs[0].error) {
        setVisionBoardURLs([
          "/default-avatar.png",
          "/default-avatar.png",
          "/default-avatar.png",
        ]);
      } else if (signedURLs) {
        const { data: metadata, error: metadataError } = await supabase
          .from("image_metadata")
          .select()
          .eq("id", user.id); // Corrected to use dbColumnName

        if (metadataError) {
          console.error("Error fetching metadata:", metadataError);
          return;
        }
        // console.log(metadata)

        if (signedURLs && metadata) {
          finSignedURLs = signedURLs.map((urlItem) => {
            // Find the corresponding metadata item
            const metadataItem = metadata.find(
              (metaItem) => `${metaItem.file_name}` === urlItem.path
            );
            // Return a new object combining the URL and any relevant metadata
            return {
              signedUrl: urlItem.signedUrl,
              // Include any other metadata properties you need, for example:
              title: metadataItem?.title,
              goal_date: metadataItem?.goal_date,
              notes: metadataItem?.notes,
              path: urlItem.path,
              name: urlItem.path.split("/")[1],
              // Add more fields as needed
            };
          });
          // console.log(finSignedURLs);
          // Now you can set the vision board URLs with the newly created finSignedURLs array
          setRerenderVisionBoard(false);
          return setVisionBoardURLs(finSignedURLs);
        }
      }
    } else {
      console.log('No vision board folder found for user or Vision Board folder is empty')
      setRerenderVisionBoard(false);
      return setVisionBoardURLs([]);
    }
  };

  const uploadFile = async function (file, user) {
    const filePath = `${user.id}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("visionBoard")
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
  
    if (error) {
      console.log(`Error uploading file: ${file.name}, ${error.message}`);
      return { file: file.name, status: 'Error', message: error.message };
    } else {
      console.log(`File uploaded: ${data.fullPath}`);
      return { file: file.name, status: 'Uploaded', fullPath: data.fullPath };
    }
  }

  const updateFile = async function (begFilePath, file, user) {

    const { data, error } = await supabase
      .storage
      .from('visionBoard')
      .remove([begFilePath])
    
      if (error) {
        console.log(`Error Removing file: ${file.name}, ${error.message}`);
        return { file: file.name, status: "Error", message: error.message };
      } else {
        console.log(`File Removed: ${begFilePath}`);
        const filePath = `${user.id}/${file.name}`;
        const { data, error } = await supabase.storage
            .from("visionBoard")
            .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            });
    
        if (error) {
            console.log(`Error uploading file: ${file.name}, ${error.message}`);
            return { file: file.name, status: 'Error', message: error.message };
        } else {
            console.log(`File uploaded: ${data.fullPath}`);
            return { file: file.name, status: 'Uploaded', fullPath: data.fullPath };
        }
      }
    }
    
    const updateMetadata = async function (file, metadata, user) {
        const filePath = `${user.id}/${file.name}`;
        console.log('Upserting metadata:', JSON.stringify(metadata));
        const { data: updatedMetadata, error } = await supabase
            .from("image_metadata")
            .update(metadata)
            .eq('id', user.id).eq('file_name', metadata.file_name)
            .select('id, file_name, title, goal_date, notes');
        if (error) {
            console.error('Error upserting metadata:', error);
        } else {
            console.log('Metadata upserting successfully:', updatedMetadata);
        }
    }
    
    const insertMetadata = async function (file, metadata, user) {
        const filePath = `${user.id}/${file.name}`;
        console.log('Upserting metadata:', JSON.stringify(metadata));
        const { data: insertedMetadata, error } = await supabase
            .from("image_metadata")
            .insert(metadata)
            .eq('id', user.id).eq('file_name', metadata.file_name)
            .select('id, file_name, title, goal_date, notes');
        if (error) {
            console.error('Error upserting metadata:', error);
        } else {
            console.log('Metadata upserting successfully:', insertedMetadata);
        }
    }
    
    const deleteDream = async function (filePath) {
        const { data, error } = await supabase
            .storage
            .from('visionBoard')
            .remove([filePath])
        if (error) {
            console.log(`Error Removing file: ${filePath}, ${error.message}`);
            return { file: filePath, status: "Error", message: error.message };
        } else {
            console.log(`File Removed: ${filePath}, removing metadata now...`);
    
            const { error } = await supabase
            .from('image_metadata')
            .delete()
            .eq('file_name', filePath)
            if (error) {
                console.error('Error deleting metadata:', error);
            } else {
                console.log('Metadata deleted successfully');
            }    
        }
    }
  
  const saveNewDream = async (file, title, date, notes) => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const metadata = {};
    if (title) metadata.title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    if (date) metadata.goal_date = date;
    if (user) metadata.id = user.id;
    if (notes) metadata.notes = notes;
    metadata.file_name = `${user.id}/${file.name}`;
    try {
      await uploadFile(file, user);
      alert('File uploaded successfully!');
      await insertMetadata(file, metadata, user);
      setRerenderVisionBoard(true);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const saveEditedDream = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if (fileChanged) {
      try {
        await updateFile(begFile.path,file, user);
        alert("File Save successfully!");
        const metadata = {};
        if (title) metadata.title = title;
          if (date) metadata.goal_date = date;
          if (user) metadata.id = user.id;
          if (notes) metadata.notes = notes;
          metadata.file_name = `${user.id}/${file.name}`;
        updateMetadata(file, metadata, user);
        alert("Metadata Save successfully!");
        setRerenderVisionBoard(true);
        setFile(null);
        setTitle("");
        setDate("");
        setState(false); // Close the component after successful Save
        return;
      } catch (error) {
        console.error("Save failed:", error);
        alert("Save failed. Please try again.");
      }
      
    }

    if (hasChanged) {
      try {
        const metadata = {};
          if (title) metadata.title = title;
          if (date) metadata.goal_date = date;
          if (user) metadata.id = user.id;
          if (notes) metadata.notes = notes;
          metadata.file_name = begFile.path
        updateMetadata(file, metadata, user);
        alert("Metadata Save successfully!");
        setRerenderVisionBoard(true);
        setFile(null);
        setTitle("");
        setDate("");
        setState(false); // Close the component after successful Save
      } catch (error) {
        console.error("Metadata Save failed:", error);
        alert("Save failed. Please try again.");
      }
      // Logic to close the component after upsert
    } else {
      // Logic to close the component directly if nothing has changed
      setFile(null);
      setTitle("");
      setDate("");
      setState(false); // Close the component If nothing has changed
    }
    
  };

  useEffect(() => {
    fetchVisionBoardURLs();
  }, [rerenderVisionBoard]);

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

  const updateAvatar = async (file) => {
    if (!user || !user.id) return;

    const basePath = `${user.id}/`; // Assuming the user's UID is used as a directory name
    const path = `${basePath}avatar`; // Adjusted to include the UID directory
    const { data, error } = await supabase.storage
      .from("avatars")
      .update(path, file);

    if (error) {
      console.error("Error uploading avatar:", error);
      if (error.error === "not_found") {
        const { data: newUpload, error: newUploadError } = await supabase.storage
          .from("avatars")
          .upload(path, file);

        if (newUploadError) {
          console.error("Error uploading brand new avatar:", newUploadError);
          return;
        }
      }
      return;
    }

    // Update the avatar URL in the state
    fetchAvatarURL();
  };

  const getList = async (dbColumnName, userID) => {
    let { data: list, error } = await supabase
      .from("planner")
      .select(dbColumnName)
      .eq("id", userID); // Corrected to use dbColumnName
    // console.log(list);

    if (!list || list.length === 0 || list === null) {
      let { error: newUserError } = await supabase
        .from("planner")
        .insert({ id: user.id})
      if (newUserError) {
        console.error("Error inserting new user:", newUserError.statusText);
        return;
      }
    }
    // Assuming list is an array with at least one object that has a list_items property
    if (list && list.length > 0 && list[0][dbColumnName]) {
      if (dbColumnName === "checklist_items") {
        setChecklistItems(list[0][dbColumnName].items);
      } else if (dbColumnName === "roles") {
        setRoles(list[0][dbColumnName].items);
        // console.log(`Roles: ${roles}`);
      } else if (dbColumnName === "goals") {
        setGoals(list[0][dbColumnName].items);
      } else if (dbColumnName === "scripture_study") {
        setScriptureStudy(list[0][dbColumnName].items);
      } else if (dbColumnName === "mission_statement") {
        setMissionStatement(list[0][dbColumnName].items);
      }
    }
  };

  const getNotes = async () => {
    let { data: notes, error } = await supabase
      .from("planner")
      .select("notes")
      .eq("id", user.id);
    // console.log(notes);
    if (notes && notes.length > 0) {
      return setNotes(notes[0].notes);
    }
  };

  const updateNotes = async (newNotes) => {
    let { data: updatedNotes, error } = await supabase
      .from("planner")
      .update({ notes: newNotes })
      .eq("id", user.id);
    // console.log(updatedNotes[0].notes);
    if (error) {
      console.error("Error updating notes:", error);
      return;
    }
    if (updatedNotes && updatedNotes.length > 0) {
      return setNotes(updatedNotes[0].notes);
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
          } else if (dbColumnName === "scripture_study") {
            setScriptureStudy(updatedData[0][dbColumnName].items);
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
        } else if (dbColumnName === "scripture_study") {
          setScriptureStudy(updatedData[0][dbColumnName].items);
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
      } else if (dbColumnName === "scripture_study") {
        setScriptureStudy(updatedData[0][dbColumnName].items);
      }
    } else {
      console.error("Updated data is not in the expected format or is empty.");
    }
    // console.log(
    //   `4 - Finished List Items: ${JSON.stringify(listItems)}`
    // );
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user: currentUser },
  //     } = await supabase.auth.getUser();
  //     setUser(currentUser || null);
  //   };

  //   // If there is no initial user, fetch the user from the server
  //   if (!user) {
  //     fetchUser();
  //   }

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event) => {
  //       if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
  //         fetchUser();
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.subscription.unsubscribe();
  //   };
  // }, [supabase, user]);

  // THE OLD STUFF THAT I KNOW WORKS

  // const supabase = createClient();
  // const [user, setUser] = useState(null);
  // const [avatarURL, setAvatarURL] = useState(null);
  // const [checklistItems, setChecklistItems] = useState([]);
  // const [roles, setRoles] = useState([]);
  // const [goals, setGoals] = useState([]);
  // const [visionBoardURLs, setVisionBoardURLs] = useState([]);
  // const [rerenderVisionBoard, setRerenderVisionBoard] = useState(false);
  // const [scriptureStudy, setScriptureStudy] = useState([]);
  // const [missionStatement, setMissionStatement] = useState([]);
  // const [notes, setNotes] = useState("");

  // useEffect(() => {
  //   const fetchVisionBoardURLs = async () => {
  //     if (!user || !user.id) return;

  //     let folderName = `${user.id}`; // Assuming the user's UID is used as a directory name
  //     const { data: visionBoardFiles, error: visionBoardFilesError } =
  //       await supabase.storage.from("visionBoard").list(folderName);

  //     let visionFiles = [];
  //     if (visionBoardFiles) {
  //       visionFiles = visionBoardFiles.map((file) => {
  //         return `${folderName}/${file.name}`;
  //       });
  //     }

  //     const { data: signedURLs, error: signedURLsError } =
  //       await supabase.storage
  //         .from("visionBoard")
  //         .createSignedUrls(visionFiles, 3600);
  //     let finSignedURLs = [];
  //     // console.log(signedURLs)

  //     if (signedURLs[0].error) {
  //       setVisionBoardURLs([
  //         "/default-avatar.png",
  //         "/default-avatar.png",
  //         "/default-avatar.png",
  //       ]);
  //     } else if (signedURLs) {
  //       const { data: metadata, error: metadataError } = await supabase
  //         .from("image_metadata")
  //         .select()
  //         .eq("id", user.id); // Corrected to use dbColumnName

  //       if (metadataError) {
  //         console.error("Error fetching metadata:", metadataError);
  //         return;
  //       }
  //       // console.log(metadata)

  //       if (signedURLs && metadata) {
  //         finSignedURLs = signedURLs.map((urlItem) => {
  //           // Find the corresponding metadata item
  //           const metadataItem = metadata.find(
  //             (metaItem) => `${metaItem.file_name}` === urlItem.path
  //           );
  //           // Return a new object combining the URL and any relevant metadata
  //           return {
  //             signedUrl: urlItem.signedUrl,
  //             // Include any other metadata properties you need, for example:
  //             title: metadataItem?.title,
  //             goal_date: metadataItem?.goal_date,
  //             notes: metadataItem?.notes,
  //             path: urlItem.path,
  //             name: urlItem.path.split("/")[1],
  //             // Add more fields as needed
  //           };
  //         });
  //         // console.log(finSignedURLs);
  //         // Now you can set the vision board URLs with the newly created finSignedURLs array
  //         setRerenderVisionBoard(false);
  //         return setVisionBoardURLs(finSignedURLs);
  //       }
  //     }
  //   };

  //   fetchVisionBoardURLs();
  // }, [user, supabase, rerenderVisionBoard]);

  // useEffect(() => {
  //   const fetchAvatarURL = async () => {
  //     if (!user || !user.id) return;

  //     const basePath = `${user.id}/`; // Assuming the user's UID is used as a directory name

  //     const path = `${basePath}avatar`; // Adjusted to include the UID directory
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .createSignedUrl(path, 3600);

  //     if (data) {
  //       // console.log(data.signedUrl)
  //     }
  //     if (error) {
  //       setAvatarURL("/default-avatar.png");
  //     } else if (data.signedUrl) {
  //       setAvatarURL(data.signedUrl);
  //       return;
  //     }
  //   };

  //   fetchAvatarURL();
  // }, [user, supabase]);

  // const getList = async (dbColumnName, userID) => {
  //   let { data: list, error } = await supabase
  //     .from("planner")
  //     .select(dbColumnName)
  //     .eq("id", userID); // Corrected to use dbColumnName
  //   // console.log(list);
  //   // Assuming list is an array with at least one object that has a list_items property
  //   if (list && list.length > 0 && list[0][dbColumnName]) {
  //     if (dbColumnName === "checklist_items") {
  //       setChecklistItems(list[0][dbColumnName].items);
  //     } else if (dbColumnName === "roles") {
  //       setRoles(list[0][dbColumnName].items);
  //       // console.log(`Roles: ${roles}`);
  //     } else if (dbColumnName === "goals") {
  //       setGoals(list[0][dbColumnName].items);
  //     } else if (dbColumnName === "scripture_study") {
  //       setScriptureStudy(list[0][dbColumnName].items);
  //     } else if (dbColumnName === "mission_statement") {
  //       setMissionStatement(list[0][dbColumnName].items);
  //     }
  //   }
  // };

  // const getNotes = async () => {
  //   let { data: notes, error } = await supabase
  //     .from("planner")
  //     .select("notes")
  //     .eq("id", user.id);
  //   // console.log(notes);
  //   if (notes && notes.length > 0) {
  //     return setNotes(notes[0].notes);
  //   }
  // };
  // const updateNotes = async (newNotes) => {
  //   let { data: updatedNotes, error } = await supabase
  //     .from("planner")
  //     .update({ notes: newNotes })
  //     .eq("id", user.id);
  //   // console.log(updatedNotes[0].notes);
  //   if (error) {
  //     console.error("Error updating notes:", error);
  //     return;
  //   }
  //   if (updatedNotes && updatedNotes.length > 0) {
  //     return setNotes(updatedNotes[0].notes);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     getNotes();
  //   }
  // }, [user, updateNotes]);

  // const handleAddItem = async (formData, event, dbColumnName, userID) => {
  //   if (dbColumnName === "mission_statement") {
  //     event?.preventDefault();
  //     const name = formData.get("firstInput");
  //     const desc = formData.get("secondInput");
  //     if (name && name !== "" && desc && desc !== "") {
  //       // Fetch the current checklist items
  //       const { data: currentChecklist, error: fetchError } = await supabase
  //         .from("planner")
  //         .select(dbColumnName)
  //         .single()
  //         .eq("id", userID); // Assuming there's only one row for simplicity

  //       if (fetchError) {
  //         console.error("Error fetching checklist:", fetchError);
  //         return;
  //       }
  //       console.log(
  //         `1 - Current Checklist: ${JSON.stringify(currentChecklist)}`
  //       );
  //       console.log(`1 - ChecklistItems: ${JSON.stringify(checklistItems)}`);
  //       // Add the new item to the checklist
  //       const newItem = {
  //         id: currentChecklist[dbColumnName].items.length + 1, // Increment the id
  //         name: name,
  //         desc: desc,
  //       };
  //       currentChecklist[dbColumnName].items.push(newItem);
  //       //   console.log(
  //       //     `2 - Items Added Checklist: ${JSON.stringify(currentChecklist)}`
  //       //   );

  //       // Update the checklist items in Supabase
  //       const { data: updatedData, error: updateError } = await supabase
  //         .from("planner")
  //         .update({
  //           [dbColumnName]: { items: currentChecklist[dbColumnName].items },
  //         })
  //         .match({ id: user.id })
  //         .select();

  //       if (updateError) {
  //         console.error("Error updating checklist:", updateError);
  //         return;
  //       }
  //       //   console.log(`3 - After Update Checklist: ${JSON.stringify(updatedData)}`);

  //       // Ensure the updatedData structure is as expected before updating the state
  //       if (
  //         updatedData &&
  //         updatedData.length > 0 &&
  //         updatedData[0][dbColumnName]
  //       ) {
  //         if (dbColumnName === "checklist_items") {
  //           setChecklistItems(updatedData[0][dbColumnName].items);
  //         } else if (dbColumnName === "roles") {
  //           setRoles(updatedData[0][dbColumnName].items);
  //         } else if (dbColumnName === "goals") {
  //           setGoals(updatedData[0][dbColumnName].items);
  //         } else if (dbColumnName === "scripture_study") {
  //           setScriptureStudy(updatedData[0][dbColumnName].items);
  //         } else if (dbColumnName === "mission_statement") {
  //           setMissionStatement(updatedData[0][dbColumnName].items);
  //         }
  //       } else {
  //         console.error(
  //           "Updated data is not in the expected format or is empty."
  //         );
  //       }
  //       //   console.log(
  //       //     `4 - Finished Checklist Items: ${JSON.stringify(checklistItems)}`
  //       //   );
  //     }
  //   }
  //   event?.preventDefault();
  //   const response = formData.get("addItem");
  //   if (response && response !== "") {
  //     // Fetch the current checklist items
  //     const { data: currentChecklist, error: fetchError } = await supabase
  //       .from("planner")
  //       .select(dbColumnName)
  //       .single()
  //       .eq("id", userID); // Assuming there's only one row for simplicity

  //     if (fetchError) {
  //       console.error("Error fetching checklist:", fetchError);
  //       return;
  //     }
  //     console.log(`1 - Current Checklist: ${JSON.stringify(currentChecklist)}`);
  //     console.log(`1 - ChecklistItems: ${JSON.stringify(checklistItems)}`);
  //     // Add the new item to the checklist
  //     const newItem = {
  //       id: currentChecklist[dbColumnName].items.length + 1, // Increment the id
  //       item: response,
  //     };
  //     currentChecklist[dbColumnName].items.push(newItem);
  //     //   console.log(
  //     //     `2 - Items Added Checklist: ${JSON.stringify(currentChecklist)}`
  //     //   );

  //     // Update the checklist items in Supabase
  //     const { data: updatedData, error: updateError } = await supabase
  //       .from("planner")
  //       .update({
  //         [dbColumnName]: { items: currentChecklist[dbColumnName].items },
  //       })
  //       .match({ id: user.id })
  //       .select();

  //     if (updateError) {
  //       console.error("Error updating checklist:", updateError);
  //       return;
  //     }
  //     //   console.log(`3 - After Update Checklist: ${JSON.stringify(updatedData)}`);

  //     // Ensure the updatedData structure is as expected before updating the state
  //     if (
  //       updatedData &&
  //       updatedData.length > 0 &&
  //       updatedData[0][dbColumnName]
  //     ) {
  //       if (dbColumnName === "checklist_items") {
  //         setChecklistItems(updatedData[0][dbColumnName].items);
  //       } else if (dbColumnName === "roles") {
  //         setRoles(updatedData[0][dbColumnName].items);
  //       } else if (dbColumnName === "goals") {
  //         setGoals(updatedData[0][dbColumnName].items);
  //       } else if (dbColumnName === "scripture_study") {
  //         setScriptureStudy(updatedData[0][dbColumnName].items);
  //       }
  //     } else {
  //       console.error(
  //         "Updated data is not in the expected format or is empty."
  //       );
  //     }
  //     //   console.log(
  //     //     `4 - Finished Checklist Items: ${JSON.stringify(checklistItems)}`
  //     //   );
  //   }
  // };

  // const handleDeleteItem = async (id, dbColumnName, userID) => {
  //   // Fetch the current list items
  //   const { data: currentList, error: fetchError } = await supabase
  //     .from("planner")
  //     .select(`${dbColumnName}`)
  //     .single()
  //     .eq("id", userID); // Assuming there's only one row for simplicity

  //   if (fetchError) {
  //     console.error("Error fetching list:", fetchError);
  //     return;
  //   }
  //   // console.log(`1 - Current list: ${JSON.stringify(currentList)}`);

  //   // Remove the item with the specified id
  //   const updatedListItems = currentList[dbColumnName].items.filter(
  //     (item) => item.id !== id
  //   );
  //   // console.log(
  //   //   `2 - Items Removed List: ${JSON.stringify(updatedListItems)}`
  //   // );

  //   // Update the list items in Supabase
  //   const { data: updatedData, error: updateError } = await supabase
  //     .from("planner")
  //     .update({ [dbColumnName]: { items: updatedListItems } })
  //     .match({ id: user.id })
  //     .select();

  //   if (updateError) {
  //     console.error("Error updating List:", updateError);
  //     return;
  //   }
  //   // console.log(`3 - After Update List: ${JSON.stringify(updatedData)}`);

  //   // Ensure the updatedData structure is as expected before updating the state
  //   if (updatedData && updatedData.length > 0 && updatedData[0][dbColumnName]) {
  //     if (dbColumnName === "checklist_items") {
  //       setChecklistItems(updatedData[0][dbColumnName].items);
  //     } else if (dbColumnName === "roles") {
  //       setRoles(updatedData[0][dbColumnName].items);
  //     } else if (dbColumnName === "goals") {
  //       setGoals(updatedData[0][dbColumnName].items);
  //     } else if (dbColumnName === "mission_statement") {
  //       setMissionStatement(updatedData[0][dbColumnName].items);
  //     } else if (dbColumnName === "scripture_study") {
  //       setScriptureStudy(updatedData[0][dbColumnName].items);
  //     }
  //   } else {
  //     console.error("Updated data is not in the expected format or is empty.");
  //   }
  //   // console.log(
  //   //   `4 - Finished List Items: ${JSON.stringify(listItems)}`
  //   // );
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user: currentUser },
  //     } = await supabase.auth.getUser();
  //     setUser(currentUser || null);
  //   };

  //   // If there is no initial user, fetch the user from the server
  //   if (!user) {
  //     fetchUser();
  //   }

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event) => {
  //       if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
  //         fetchUser();
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.subscription.unsubscribe();
  //   };
  // }, [supabase, user]);

  return (
    <Context.Provider
      value={{
        user,
        setAuthPageTouch,
        // setUser,
        avatarURL,
        updateAvatar,
        visionBoardURLs,
        saveNewDream,
        saveEditedDream,
        deleteDream,
        rerenderVisionBoard,
        setRerenderVisionBoard,
        checklistItems,
        setChecklistItems,
        roles,
        setRoles,
        goals,
        setGoals,
        scriptureStudy,
        setScriptureStudy,
        missionStatement,
        setMissionStatement,
        notes,
        setNotes,
        updateNotes,
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
