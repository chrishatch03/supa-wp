'use client'
import React, { useState, useEffect } from "react";
import { useMyContext } from "@/contexts/Context";

const Notes = () => {
    const { notes, setNotes, updateNotes } = useMyContext();
    const [newNotes, setNewNotes] = useState('');
    useEffect(() => {
        setNewNotes(notes);
    }, [notes]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        updateNotes(newNotes);
    }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between p-2">
        <div className=" w-full mb-4 border border-gray-200 rounded-t-2xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <p>My Notes</p>
            <button
              type="button"
              data-tooltip-target="tooltip-fullscreen"
              className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                />
              </svg>
              <span className="sr-only">Full screen</span>
            </button>
            <div
              id="tooltip-fullscreen"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Show full screen
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={8}
              className="block w-full h-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write an article..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="justify-center inline-flex w-full items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default Notes;
