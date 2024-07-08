import React, { createContext, useState, useContext } from 'react';

// LIST CONTEXT FOR CHECKLIST_ITEMS, ROLES, AND GOALS
const Context = createContext();

const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [checklist_items, setChecklistItems] = useState([]);
    const [roles, setRoles] = useState([]);
    const [goals, setGoals] = useState([]);

    return (
        <Context.Provider value={{ currentUser, checklist_items, setChecklistItems, roles, setRoles, goals, setGoals }}>
            {children}
        </Context.Provider>
    );
};

const useContext = () => useContext(Context);

export { ContextProvider, useContext };