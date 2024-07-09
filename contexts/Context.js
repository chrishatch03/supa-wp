// contexts/Context.js
'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

const Context = createContext();

const ContextProvider = ({ children, initialUser }) => {
    const supabase = createClient();
    const [user, setUser] = useState(initialUser || null);
    const [checklistItems, setChecklistItems] = useState([]);
    const [roles, setRoles] = useState([]);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user: currentUser },
            } = await supabase.auth.getUser();
            setUser(currentUser || null);
        };

        // If there is no initial user, fetch the user from the server
        if (!initialUser) {
            fetchUser();
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                fetchUser();
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [supabase, initialUser]);

    return (
        <Context.Provider value={{ user, setUser, checklistItems, setChecklistItems, roles, setRoles, goals, setGoals }}>
            {children}
        </Context.Provider>
    );
};

const useMyContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useMyContext must be used within a ContextProvider");
    }
    return context;
};

export { ContextProvider, useMyContext };
