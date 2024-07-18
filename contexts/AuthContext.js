'use client'
// authContext.js
import React, { createContext, useContext, useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === 'INITIAL_SESSION') {
        if (session) {
          setUser(session.user);
          setAuthenticated(true);
        }
      } else if (event === 'SIGNED_IN') {
        console.log(session.user);
        setAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuthenticated(false);
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY', session);
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session.user);
      } else if (event === 'USER_UPDATED') {
        setUser(session.user);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
      // Handle other events as needed
    });

    return () => authListener.subscription.unsubscribe();
  }, [authenticated]);



//   useEffect(() => {
//     setAuthPageTouch(false);
//     }, [authPageTouch]);

  return (
    <AuthContext.Provider value={{ user, authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);