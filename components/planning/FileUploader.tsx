// components/DragAndDrop.jsx
'use client'; // Required for client-side interactions in Next.js 13+

import { useState } from 'react';
import { useMyContext } from '@/contexts/Context';
import { uploadFiles } from '@/app/api/uploadFile';

export default function FileUploader() {
  const { user } = useMyContext();
  const [files, setFiles] = useState([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles([...files, ...event.dataTransfer.files]);
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleUpload = async () => {
    if (!files) {
      alert('Please select a file first!');
      return;
    }

    try {
      // Assuming uploadFile is a function that takes a File object and returns a Promise
      await uploadFiles(files, user);
      alert('File uploaded successfully!');
      setFiles([]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <>
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
                multiple
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-center text-gray-500 hover:text-gray-700"
              >
                Drag and drop your files here or click to select
              </label>

              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
            <button onClick={handleUpload}>Upload</button>
    </>
  );
}