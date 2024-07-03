"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export const Checklist = () => {
  const [user, setUser] = useState(null);
  const [checklistItems, setChecklistItems] = useState(null);
  const supabase = createClient();

    useEffect(() => {
        async function fetchUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        console.log(`User: ${user}`)
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function getChecklist() {
            let { data: checklist, error } = await supabase
            .from('checklist')
            .select('items')
            let betterchecklist = checklist[0]["items"]["checklist_items"]
            setChecklistItems(betterchecklist)
            console.log(checklistItems)
        }
        getChecklist()
    }, [user]);

return (
    <>
        {user && (
            <div className="w-full h-full rounded-3xl flex flex-col p-4">
                {/* User Header */}
                <div className='flex flex-row gap-2'>
                    {/* Profile Pic */}
                    {/* <Image src='/portrait.jpg' width={64} height={64} alt="Profile Pic" className='rounded-full object-cover object-center' /> */}
                    {/* User Info */}
                    <div className="w-full flex flex-col items-center justify-center">
                            <div className="w-full items-start flex flex-row justify-start">
                            <h1 className="text-3xl text-primary dark:text-white font-bold">
                                    Checklist
                            </h1>
                            </div>
                            <div className="w-full flex flex-row justify-start">
                            <p>{user.email}</p>
                            </div>
                    </div>
                </div>
                {/* Checklist */}
                <div className='w-full h-full flex flex-col justify-between'>
                    {/* {checklistData?.items.map((item) => (<div>{item}</div>))} */}
                </div>
            </div>
        )}
    </>
);
};
