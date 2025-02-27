// components/EditDream.jsx
"use client"; // Required for client-side interactions in Next.js 13+

import { useState, useEffect } from "react";
import { useMyContext } from "@/contexts/Context";
// import { updateFile, updateMetadata, deleteDream } from "@/app/api/updateFile";

// Step 1: Define an interface for Metadata
interface Metadata {
  title?: string;
  goal_date?: string;
  id?: string;
  notes?: string;
  file_name?: string;
}

export default function EditDream({
  setState,
  startFile,
}: {
  setState: Function;
  startFile: any;
}) {
  const { user, deleteDream, saveEditedDream, setRerenderVisionBoard } = useMyContext();

  const begFile = startFile;

  console.log(`startFile: ${JSON.stringify(startFile)}`);
  const [file, setFile] = useState(startFile || null);
  const [title, setTitle] = useState(startFile.title || "");
  const [date, setDate] = useState(startFile.goal_date || "");
  const [notes, setNotes] = useState(startFile.notes || "");
  const [hasChanged, setHasChanged] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);

  // Track changes in the component's state
  useEffect(() => {
    const isChanged =
      title !== begFile.title ||
      date !== begFile.goal_date ||
      notes !== begFile.notes;
    setHasChanged(isChanged);
  }, [title, date, notes, begFile.title, begFile.goal_date, begFile.notes]);

  useEffect(() => {
    const isChanged = file.name !== begFile.name;
    setFileChanged(isChanged);
  }, [file, begFile]);

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSaveEditedDream = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if (fileChanged) {
      try {
        saveEditedDream(file, title, date, notes);
      } catch (error) {
        console.error("Save of edited dream failed:", error);
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

  // const handleSaveEditedDream = async () => {
  //   if (!file) {
  //     alert("Please select a file first!");
  //     return;
  //   }
  //   if (fileChanged) {
  //     try {
  //       await updateFile(begFile.path,file, user);
  //       alert("File Save successfully!");
  //       const metadata: Metadata = {};
  //       if (title) metadata.title = title;
  //         if (date) metadata.goal_date = date;
  //         if (user) metadata.id = user.id;
  //         if (notes) metadata.notes = notes;
  //         metadata.file_name = `${user.id}/${file.name}`;
  //       updateMetadata(file, metadata, user);
  //       alert("Metadata Save successfully!");
  //       setRerenderVisionBoard(true);
  //       setFile(null);
  //       setTitle("");
  //       setDate("");
  //       setState(false); // Close the component after successful Save
  //       return;
  //     } catch (error) {
  //       console.error("Save failed:", error);
  //       alert("Save failed. Please try again.");
  //     }

  //   }

  //   if (hasChanged) {
  //     try {
  //       const metadata: Metadata = {};
  //         if (title) metadata.title = title;
  //         if (date) metadata.goal_date = date;
  //         if (user) metadata.id = user.id;
  //         if (notes) metadata.notes = notes;
  //         metadata.file_name = begFile.path
  //       updateMetadata(file, metadata, user);
  //       alert("Metadata Save successfully!");
  //       setRerenderVisionBoard(true);
  //       setFile(null);
  //       setTitle("");
  //       setDate("");
  //       setState(false); // Close the component after successful Save
  //     } catch (error) {
  //       console.error("Metadata Save failed:", error);
  //       alert("Save failed. Please try again.");
  //     }
  //     // Logic to close the component after upsert
  //   } else {
  //     // Logic to close the component directly if nothing has changed
  //     setFile(null);
  //     setTitle("");
  //     setDate("");
  //     setState(false); // Close the component If nothing has changed
  //   }

  // };

  const handleDeleteDream = async () => {
    try {
      deleteDream(begFile.path);
      setRerenderVisionBoard(true);
      setFile(null);
      setTitle("");
      setDate("");
      setState(false); // Close the component after successful Save
      return;
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col relative items-center justify-between w-1/3 h-auto min-h-96 p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-2xl dark:shadow-thick gap-6">
        <button
          className="absolute top-2 right-2 border border-red-500 rounded-full px-3 py-1 text-red-500"
          onClick={() => setState(false)}
        >
          X
        </button>
        <p className="text-xl text-center font-medium text-primary dark:text-white">
          "Setting goals is the first step in turning the invisible into the
          visible"
        </p>
        <div className="p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70">
          <input
            className="w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white"
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70">
          <input
            className="w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white"
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70">
          <input
            className="w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white"
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div
          className="p-4 border-2 border-dashed border-gray-300 rounded-md"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-center text-gray-500 hover:text-gray-700"
          >
            Drag and drop your file here or click to select
          </label>

          {file && (
            <ul className="w-full h-auto flex flex-col items-center justify-center mt-4">
              <li className="w-1/2 flex flex-row justify-between items-center">
                {file.name && file.name !== "" && (
                  <>
                    <p>{file.name}</p>
                    <button onClick={() => setFile({ name: "" })}>X</button>
                  </>
                )}
              </li>
            </ul>
          )}
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <button
            onClick={handleDeleteDream}
            className="p-2 bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleSaveEditedDream}
            className="p-2 bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
