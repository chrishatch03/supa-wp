"use client";
import { useState, useEffect } from 'react';
import { useMyContext } from "@/contexts/Context";
import { uploadFile } from "@/app/api/uploadFile";

export const VisionBoard = () => {
  const { user, visionBoardURLs } = useMyContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editVision, setEditVision] = useState<boolean>(false);
  const [newDream, setNewDream] = useState<boolean>(false);
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Temporary Variables To Be Put In Vision Board Table
  const visionName = "My Vision Item Name";
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    try {
      // Assuming uploadFile is a function that takes a File object and returns a Promise
      await uploadFile(selectedFile, user);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };
  return (
    <div className="bg-pbbgIR bg-cover  flex flex-col justify-between items-center rounded-3xl p-8 overflow-hidden text-center lg:text-left">
      <div>
        <p className="ext-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
          VISION BOARD
        </p>

        {/* COMPACT DISPLAY IMAGES */}
        {visionBoardURLs && visionBoardURLs.length > 0 ? (
          <div
            className={`grid grid-cols-3 gap-4 w-full h-full mt-4`}
          >
            {visionBoardURLs.map((signedURL: string) => (
              <img
                key={signedURL}
                src={signedURL}
                alt="One of my Goals"
                className="h-full w-full flex shadow-xl dark:shadow-thick object-cover object-center rounded-3xl hover:scale-105"
                onClick={() => handleImageClick(signedURL)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full mt-4">
            <span className="text-xl text-gray-500">Add a Dream</span>
          </div>
        )}
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Begin with the end in mind. Shape your own destiny. Remember that the
          development of your career, your family, and your faith in God is your
          individual responsibility—for which you alone will be held
          accountable.
        </p>
        <p className="mt-4 text-sm text-zinc-400 dark:text-zinc-300">
          Elder Russell M. Nelson - Sept 1984
        </p>
      </div>

      {/* SELECTED IMAGE DISPLAY */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col items-center justify-center w-1/2 h-auto p-4 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
            <p className="text-xl font-medium text-primary dark:text-white">
              {visionName}
            </p>
            <img
              src={selectedImage}
              alt="Selected Image"
              className="h-full max-h-60"
            />
            <button
              className="border border-blue-900 rounded-md px-4 py-2 text-foreground mt-2"
              onClick={() => {setEditVision(true), setSelectedImage(null)}}
            >
              Edit Vision
            </button>
            <button
              className="border border-blue-900 rounded-md px-4 py-2 text-foreground mt-2"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* VISION EDITOR */}
      {editVision && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col relative items-center justify-center w-1/2 h-auto p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-2xl dark:shadow-thick">
            <p className="text-xl font-medium text-primary dark:text-white">
            "Knowing yourself is the beginning of all wisdom."
              <p className="text-md text-center font-medium text-primary/50 dark:text-white/50">
              –Aristotle.
              </p>
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {visionBoardURLs.map((signedURL: string) => (Image(signedURL, "Due Date", "Title")))}
            </div>
            
            <div id="">Loading uploader...</div>
            <button
              className="border border-blue-900 rounded-md px-4 py-2 text-foreground"
              onClick={() => {setNewDream(true)}}
            >
              Create New Dream
            </button>
            <button
              className="border border-blue-900 rounded-md px-4 py-2 text-foreground absolute top-5 right-5"
              onClick={() => {setEditVision(false), setSelectedImage(null)}}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* New Dream */}
      {newDream && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col relative items-center justify-center w-1/3 h-auto p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-2xl dark:shadow-thick">
              <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload File</button>
            </div>
          </div>
        </div>
              )}
    </div>
  );
};

function Image(signedURL: string, dueDate: string, title: string) {
  return (
    <a href="#" className="group p-2 rounded-xl bg-slate-200 shadow-lg">
      <div className="flex aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src="https://dummyimage.com/720x400"
          alt="content"
          className="object-cover object-center w-full h-full group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">By: {dueDate}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{title}</p>
    </a>
  );
}