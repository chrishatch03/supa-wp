"use client";
// LIST MUST BE USED INSIDE OF A RELATIVE CONTAINER SO THAT THE EDIT PENCIL ICONS CAN BE POSITIONED
import React, { useState, useEffect } from "react";
import { useMyContext } from "@/contexts/Context";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const List = ({dbColumnName}: {dbColumnName: string}) => {
  const { user, getList, handleDeleteItem, checklistItems, roles, goals, missionStatement, scriptureStudy } = useMyContext();
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('top-0');
  
  useEffect(() => {
    if (user) {
      getList(dbColumnName, user.id);
    }
  }, [user]);

  // Step 1: Define selectedColumnItems here
  let selectedColumnItems;

  // Step 2: Assign the appropriate value based on dbColumnName
  if (dbColumnName === "checklist_items") {
    selectedColumnItems = checklistItems;
  } else if (dbColumnName === "roles") {
    selectedColumnItems = roles;
  } else if (dbColumnName === "goals") {
    selectedColumnItems = goals;
  } else if (dbColumnName === 'scripture_study') {
    selectedColumnItems = scriptureStudy;
  } else if (dbColumnName === "mission_statement") {
    selectedColumnItems = missionStatement;
    // Return JSX markup for Mission Statement
    return (
      <div className="w-full flex flex-col justify-between">
            {user && (
              <div className="w-full h-full flex flex-col gap-2">
                {selectedColumnItems &&
                  selectedColumnItems.map(({ id, name, desc }: { id:number, name:string, desc:string }) => (
                  <div className="flex flex-col">  
                    <div key={id} className="flex flex-row justify-between">
                      {`${name}`}
                      <button onClick={() => setOpenItemId(id)}>Delete</button>
                      <Dialog
                        open={openItemId === id}
                        onClose={() => setOpenItemId(null)}
                        className="relative z-10"
                      >
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                              transition
                              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                              <div className="bg-gray-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                      aria-hidden="true"
                                      className="h-6 w-6 text-red-600"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                      as="h3"
                                      className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                      Delete Item
                                    </DialogTitle>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        {`Are you sure you want to delete this
                                        item from ${dbColumnName}? This action
                                        cannot be undone.`}
                                        <br />
                                        {name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  onClick={() => {handleDeleteItem(id, dbColumnName, user.id); setOpenItemId(null);}}
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  data-autofocus
                                  onClick={() => setOpenItemId(null)}
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                  Cancel
                                </button>
                              </div>
                            </DialogPanel>
                          </div>
                        </div>
                      </Dialog>
                    </div>
                    <p className="pl-4">{desc}</p>
                </div>
                  ))}
              </div>
            )}
          </div>
    )
  }

  

  return (
    <>
          <div className="w-full flex flex-col justify-between">
            {user && (
              <div className="relative w-full h-full flex flex-col gap-2">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 119.19" className={`h-6 absolute ${position} right-0 transform active:scale-105 bg-transparent fill-primary dark:fill-white`} onClick={() => {setEdit(prevEdit => !prevEdit); setPosition(prevPosition => prevPosition === 'top-0' ? '-top-10' : 'top-0');}}><defs></defs><title>modify</title><path className="cls-1" d="M104.84,1.62,121.25,18a5.58,5.58,0,0,1,0,7.88L112.17,35l-24.3-24.3L97,1.62a5.6,5.6,0,0,1,7.88,0ZM31.26,3.43h36.3L51.12,19.87H31.26A14.75,14.75,0,0,0,20.8,24.2l0,0a14.75,14.75,0,0,0-4.33,10.46v68.07H84.5A14.78,14.78,0,0,0,95,98.43l0,0a14.78,14.78,0,0,0,4.33-10.47V75.29l16.44-16.44V87.93A31.22,31.22,0,0,1,106.59,110l0,.05a31.2,31.2,0,0,1-22,9.15h-72a12.5,12.5,0,0,1-8.83-3.67l0,0A12.51,12.51,0,0,1,0,106.65v-72a31.15,31.15,0,0,1,9.18-22l.05-.05a31.17,31.17,0,0,1,22-9.16ZM72.33,74.8,52.6,80.9c-13.85,3-13.73,6.15-11.16-6.91l6.64-23.44h0l0,0L83.27,15.31l24.3,24.3L72.35,74.83l0,0ZM52.22,54.7l16,16-13,4c-10.15,3.13-10.1,5.22-7.34-4.55l4.34-15.4Z"/></svg>
                {selectedColumnItems &&
                  selectedColumnItems.map(({ id, item }: {id:number, item:string}) => (
                    <div key={id} className="flex flex-row justify-between">
                      <div className="flex flex-row items-center">
                        <div className="mr-4 text-xl font-bold">
                          {'\u2022'}
                        </div>
                      {`${item}`}
                      </div>
                      {edit && (<button
                        className="border border-red-500 rounded-full px-2 py-0.5 text-red-500 text-xs"
                        onClick={() => {setOpenItemId(id)}}
                      >
                        X
                      </button>)}
                      <Dialog
                        open={openItemId === id}
                        onClose={() => setOpenItemId(null)}
                        className="relative z-10"
                      >
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                              transition
                              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                              <div className="bg-gray-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                      aria-hidden="true"
                                      className="h-6 w-6 text-red-600"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                      as="h3"
                                      className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                      Delete Item
                                    </DialogTitle>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        {`Are you sure you want to delete this
                                        item from ${dbColumnName}? This action
                                        cannot be undone.`}
                                        <br />
                                        {item}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  onClick={() => {handleDeleteItem(id, dbColumnName, user.id); setOpenItemId(null);}}
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  data-autofocus
                                  onClick={() => setOpenItemId(null)}
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                  Cancel
                                </button>
                              </div>
                            </DialogPanel>
                          </div>
                        </div>
                      </Dialog>
                    </div>
                  ))}
              </div>
            )}
          </div>
    </>
  );
};
