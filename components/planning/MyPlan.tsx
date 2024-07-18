"use client";
import React from "react";
import { List } from "./List";
import { InputToDatabase } from "./InputToDatabase";
import { useMyContext } from "@/contexts/Context";
import { Avatar } from "@/components/Avatar";
import { useState, useEffect } from "react";
export const MyPlan = () => {
  const { user, updateAvatar } = useMyContext();
  const [editUserProfile, setEditUserProfile] = useState<boolean>(false);
  const [editAvatar, setEditAvatar] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleChooseAvatar = () => {
    updateAvatar(file)
  }
  return (
    <>
      {user && (
        <div className="w-full h-full rounded-3xl flex flex-col p-4">
          {/* User Header */}
            {editUserProfile && (
              <>
              <nav id="navBar" className={`z-10 ${editUserProfile ? "" : "hidden"} absolute top-0 left-0 w-1/4 flex justify-center h-full backdrop-blur-md`}>
                <div className="w-full flex flex-col h-full justify-start ">
                  <div className="flex flex-col justify-center w-full max-w-4xl p-3 text-sm h-28 border-b border-b-primary dark:border-b-white">
                    <div className="flex flex-row justify-start w-full h-full max-h-10">
                      <button onClick={() => setEditUserProfile(!editUserProfile)} className="ml-2 w-auto  flex justify-center items-center p-3 text-sm rounded-md no-underline bg-transparent">
                        <Avatar />
                      </button>
                    </div>
                  </div>
                  {user ? (
                    <div className="w-full h-full p-3">
                      <div className="flex items-center gap-4 min-w-fit">Hey, {user?.email}!</div>
                      <button onClick={() => {setEditAvatar(!editAvatar)}} className="w-full py-2 px-4 rounded-md no-underline bg-primary dark:bg-white text-white dark:text-primary hover:bg-btn-background-hover">
                        Choose Avatar
                      </button>
                      {editAvatar && (
                        <div className="flex flex-col items-center justify-center mt-4 max-w-lg">
                          <p className="text-lg text-primary dark:text-white">
                            Choose Avatar
                          </p>
                          <div>
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
        <div className="w-full flex flex-row justify-between items-center">
          <button onClick={handleChooseAvatar}>Upload Avatar</button>
        </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </nav>
            </>
            )}
          <div className="relative flex items-center gap-x-4">
            {/* <img src="/images/portrait.jpg" alt="" className="h-10 w-10 rounded-full ring-1 dark:ring-white/10 ring-primary/5 object-cover" style="object-position: 50% 50%;"/> */}
              <Avatar />
            <button onClick={() => setEditUserProfile(!editUserProfile)} className="h-fit w-fit">
            <div className="text-md leading-6">
              <p className="font-semibold text-primary dark:text-white">
                <div>
                  <span className="absolute inset-0"></span>
                  {user.user_metadata.first_name && user.user_metadata.last_name ? (
                    `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                  ) : (
                    'Go Getter'
                  )}
                </div>
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                User Bio Goes Here
              </p>
            </div>
                  </button>
          </div>
          <div className="">
            <p className="text-3xl mt-6 mb-4 md:mb-auto font-medium lg:text-4xl tracking-tight text-primary dark:text-white">
              This week
            </p>
            {/* Checklist */}
            <List dbColumnName="checklist_items" />
            {/* Add to Checklist */}
            <InputToDatabase dbColumnName="checklist_items" />
          </div>
        </div>
      )}
    </>
  );
};
