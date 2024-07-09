"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const List = ({dbListName}: {dbListName: string}) => {
  const [user, setUser] = useState(null);
  const [listItems, setListItems] = useState([]);
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(`User: ${user}`);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function getList() {
      let { data: list, error } = await supabase
        .from("planner")
        .select(dbListName);
      // console.log(list);
      // Assuming list is an array with at least one object that has a list_items property
      if (list && list.length > 0 && list[0][dbListName]) {
        setListItems(list[0][dbListName].items);
      }
    }
    getList();
  }, [user]);

//   useEffect(() => {
//     console.log(listItems);
//   }, [listItems]);

  const handleDeleteItem = async (id) => {
    // Fetch the current list items
    const { data: currentList, error: fetchError } = await supabase
      .from("planner")
      .select(`${dbListName}`)
      .single(); // Assuming there's only one row for simplicity

    if (fetchError) {
      console.error("Error fetching list:", fetchError);
      return;
    }
    // console.log(`1 - Current list: ${JSON.stringify(currentList)}`);

    // Remove the item with the specified id
    const updatedListItems = currentList[dbListName].items.filter(
      (item) => item.id !== id
    );
    // console.log(
    //   `2 - Items Removed List: ${JSON.stringify(updatedListItems)}`
    // );

    // Update the list items in Supabase
    const { data: updatedData, error: updateError } = await supabase
      .from("planner")
      .update({ [dbListName]: { items: updatedListItems } })
      .match({ id: user.id })
      .select();

    if (updateError) {
      console.error("Error updating List:", updateError);
      return;
    }
    // console.log(`3 - After Update List: ${JSON.stringify(updatedData)}`);

    // Ensure the updatedData structure is as expected before updating the state
    if (
      updatedData &&
      updatedData.length > 0 &&
      updatedData[0][dbListName]
    ) {
      setListItems(updatedData[0][dbListName].items);
    } else {
      console.error("Updated data is not in the expected format or is empty.");
    }
    // console.log(
    //   `4 - Finished List Items: ${JSON.stringify(listItems)}`
    // );
  };

  return (
    <>
          <div className="w-full flex flex-col justify-between">
            {user && (
              <div className="w-full h-full flex flex-col gap-2">
                {listItems &&
                  listItems.map(({ id, item }) => (
                    <div key={id} className="flex flex-row justify-between">
                      {`${item}`}
                      <button onClick={() => setOpen(true)}>Delete</button>
                      <Dialog
                        open={open}
                        onClose={setOpen}
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
                                        item from ${dbListName}? This action
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
                                  onClick={() => {
                                    handleDeleteItem(id);
                                    setOpen(false);
                                  }}
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  data-autofocus
                                  onClick={() => setOpen(false)}
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
