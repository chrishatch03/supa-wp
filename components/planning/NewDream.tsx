// components/EditDream.jsx
'use client'; // Required for client-side interactions in Next.js 13+

import { useState } from 'react';
import { useMyContext } from '@/contexts/Context';
// import { uploadFile } from '@/app/api/uploadFile';
// import { insertMetadata } from '@/app/api/updateFile';

// Step 1: Define an interface for Metadata
// interface Metadata {
//   title?: string;
//   goal_date?: string;
//   id?: string;
//   notes?: string;
//   file_name?: string;
// }

interface File {
  name: string;
}

export default function NewDream({ setState } : { setState: Function }) {
  const { saveNewDream } = useMyContext();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSaveNewDream = async () => {
    if (!file) {
          alert('Please select a file first!');
          return;
        }
    try {
      saveNewDream(file, title, date, notes);
      setFile(null);
      setTitle('');
      setDate('');
      setState(false); // Close the component after successful upload
    }
    catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  }

  // const handleSaveNewDream = async () => {
  //   if (!file) {
  //     alert('Please select a file first!');
  //     return;
  //   }

  //   const metadata: Metadata = {};
  //   if (title) metadata.title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  //   if (date) metadata.goal_date = date;
  //   if (user) metadata.id = user.id;
  //   if (notes) metadata.notes = notes;
  //   metadata.file_name = `${user.id}/${file.name}`;
  //   try {
  //     await uploadFile(file, user);
  //     alert('File uploaded successfully!');
  //     await insertMetadata(file, metadata, user);
  //     setRerenderVisionBoard(true);
  //     setFile(null);
  //     setTitle('');
  //     setDate('');
  //     setState(false); // Close the component after successful upload
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     alert('Upload failed. Please try again.');
  //   }
  // };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col relative items-center justify-between w-1/3 h-auto min-h-96 p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-2xl dark:shadow-thick gap-6">
        <button
          className="absolute top-2 right-2 border border-red-500 rounded-full px-3 py-1 text-red-500"
          onClick={() => {setFile(null),setTitle(''),setDate(''),setNotes(''),setState(false)}}
        >
          X
        </button>
        <p className="text-xl text-center font-medium text-primary dark:text-white">
            "Setting goals is the first step in turning the invisible into the visible"
        </p>
        <div className='p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70'>
          <input
            className='w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white'
            type="text"
            placeholder="I will..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70'>
          <input
            className='w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white'
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            
          />
        </div>
        <div className='p-2 rounded-lg flex flex-col justify-center items-center w-3/4 border-b border-white dark:border-primary bg-primary/15 dark:bg-white/70'>
          <input
            className='w-full text-gray-700  focus:text-lg text-center bg-transparent outline-none placeholder-black/60 dark:placeholder-white'
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
            <ul>
              <li>{file.name}</li>
            </ul>
          )}
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <button onClick={handleSaveNewDream} className='p-2 bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover rounded-md'>Save</button>
        </div>
      </div>
    </div>
  );
}
