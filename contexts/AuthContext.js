'use client'
// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = createClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === 'INITIAL_SESSION') {
        if (session) {
          setUser(session.user);
        }
      } else if (event === 'SIGNED_IN') {
        console.log(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY', session);
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session.user);
      } else if (event === 'USER_UPDATED') {
        setUser(session.user);
      }
      // Handle other events as needed
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);