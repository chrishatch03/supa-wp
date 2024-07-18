"use client";
import { useState, useEffect } from 'react';
import { useMyContext } from "@/contexts/Context";
import NewDream from './NewDream';
import EditDream from './EditDream';

export const VisionBoard = () => {
  const { user, visionBoardURLs } = useMyContext();
  // console.log(visionBoardURLs);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [editVision, setEditVision] = useState<boolean>(false);
  const [newDream, setNewDream] = useState<boolean>(false);
  const [editDream, setEditDream] = useState<boolean>(false);
  const handleImageClick = (file: any) => {
    console.log(file);
    setSelectedImage(file);
  };

  // Temporary Variables To Be Put In Vision Board Table
  
  
  return (
    <div className="flex flex-col justify-between items-center rounded-3xl p-8 overflow-hidden text-center lg:text-left">
      <div>
        <p className="ext-xl tracking-tight font-medium text-primary dark:text-white md:text-6xl">
          VISION BOARD
        </p>

        {/* COMPACT DISPLAY IMAGES */}
        {visionBoardURLs && visionBoardURLs.length > 0 ? (
          <div
            className={`grid grid-cols-3 auto-rows-fr gap-4 w-full h-full mt-4`}
          >
            {visionBoardURLs.map((file: any) => (
              <img
                key={file.signedUrl}
                src={file.signedUrl}
                alt="One of my Goals"
                className="h-full w-full aspect-square flex shadow-xl dark:shadow-thick object-cover object-center rounded-3xl hover:scale-105"
                onClick={() => handleImageClick(file)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full mt-4">
            <button onClick={() => setNewDream(true)} className="text-xl text-gray-500">Add a Dream</button>
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

      {/* SELECTED IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-400 bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col items-center justify-center w-auto h-auto p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-xl dark:shadow-thick">
            <h1 className="text-2xl font-bold text-primary dark:text-white">
              {selectedImage.title ? (selectedImage.title) : ("Dream Name")}
            </h1>
            {/* DISPLAY CURRENTLY SELECTED IMAGE */}
            <div className="flex items-center justify-center h-full max-h-60 max-w-lg mt-4 rounded-3xl shadow dark:shadow-thick overflow-hidden">
              <img
                src={selectedImage.signedUrl}
                alt="Selected Image"
                className="object-cover object-center w-full h-full"
              />
            </div>
            {/* DISPLAY GOAL INFO */}
            <div className="flex flex-col items-center justify-center mt-4 max-w-lg">
              <p className="text-lg text-primary dark:text-white">
                {selectedImage.goal_date ? (selectedImage.goal_date) : ("Due Date")}
              </p>
              <p className="text-lg text-primary dark:text-white">
                {selectedImage.notes ? (selectedImage.notes) : ("Dream Name")}
              </p>
            </div>
            {/* EDIT VISION AND CLOSE BUTTONS */}
            <div className='w-full flex flex-row justify-between items-center mt-4'>
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
        </div>
      )}

      {/* VISION EDITOR */}
      {editVision && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-400 bg-opacity-50 flex justify-center items-center shadow-xl">
          <div className='flex flex-col items-center overflow-y-auto w-full h-full p-20'>
          <div className="flex flex-col relative items-center justify-center w-1/2 h-auto p-8 rounded-3xl dark:ring-white/10 ring-primary/5 bg-white dark:bg-secondary shadow-2xl dark:shadow-thick">
            <p className="text-xl font-medium text-primary dark:text-white">
            "Knowing yourself is the beginning of all wisdom."
              <p className="text-md text-center font-medium text-primary/50 dark:text-white/50">
              –Aristotle.
              </p>
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {visionBoardURLs.map((file: any) => (<button onClick={() => setEditDream(file)}>{Image(file.signedUrl, file.goal_date, file.title, file)}</button>))}
            </div>
            <button
              className="border border-blue-900 rounded-md px-4 py-2 text-foreground mt-8"
              onClick={() => {setNewDream(true)}}
            >
              Create New Dream
            </button>
            <button
              className="absolute top-2 right-2 border border-red-500 rounded-full px-3 py-1 text-red-500"
              onClick={() => {setEditVision(false), setSelectedImage(null)}}
            >
              X
            </button>
          </div>
          </div>
        </div>
      )}

      {/* New Dream */}
      {newDream && (
        
        <NewDream setState={setNewDream} />
      )}

      {/* EDIT DREAM */}
      {editDream && (
        <EditDream setState={setEditDream} startFile={editDream}/>
      )}
    </div>
  );
};

function Image(signedUrl: string, dueDate: string, title: string, file: any) {
  return (
    <div className="relative group rounded-xl bg-gray-100 shadow-xl">
      <div className="flex aspect-square w-full overflow-hidden rounded-t-xl bg-blue-100">
        {signedUrl ? (
          <img
            src={signedUrl}
            alt="content"
            className="object-cover object-center w-full h-full group-hover:opacity-75"
          />
        ) : (
          <img
            src="https://dummyimage.com/720x400"
            alt="content"
            className="object-cover object-center w-full h-full group-hover:opacity-75"
          />
        )}
      </div>
      {title ? (
      <h3 className="mt-4 text-lg font-bold text-gray-70 pb-4">{title}</h3>
        ) : (
          <h3 className="mt-4 text-lg font-bold text-gray-700 pb-4">Title</h3>
        )}
      {dueDate ? (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">By: {dueDate}</span>

      // <p className="mt-1 text-lg font-medium text-gray-900 pb-2">{title}</p>
        ) : (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">By: Due Date</span>

          // <p className="mt-1 text-lg font-medium text-gray-900 pb-2">Title</p>
        )}
    </div>
  );
}