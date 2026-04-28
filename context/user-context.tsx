'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserRoleFromDB, persistUserToDB } from '@/services/dbService';
import { AuthService } from '@/services/AuthService';

export type UserRole = 'customer' | 'vendor' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextState {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: (roleChoice: UserRole) => Promise<void>;
  handleEmailLogin: (email: string, pass: string) => Promise<void>;
  handleEmailRegister: (email: string, pass: string, name: string, roleChoice: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          let currentRole = await fetchUserRoleFromDB(firebaseUser.uid);
          
          if (!currentRole) {
             currentRole = 'customer';
             await persistUserToDB(firebaseUser.uid, firebaseUser.email, firebaseUser.displayName, currentRole as string);
          }

          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Unknown',
            email: firebaseUser.email || '',
            role: currentRole as UserRole,
          });
        } catch (error) {
          console.error("Auth sync error:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = React.useCallback(async (roleChoice: UserRole) => {
    setIsLoading(true);
    try {
      const { user: fUser, role } = await AuthService.loginWithGoogle(roleChoice as string);
      setUser({
        id: fUser.uid,
        name: fUser.displayName || fUser.email?.split('@')[0] || 'Unknown',
        email: fUser.email || '',
        role: role as UserRole,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEmailLogin = React.useCallback(async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const { user: fUser, role } = await AuthService.handleEmailLogin(email, pass);
      setUser({
        id: fUser.uid,
        name: fUser.displayName || fUser.email?.split('@')[0] || 'Unknown',
        email: fUser.email || '',
        role: role as UserRole,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEmailRegister = React.useCallback(async (email: string, pass: string, name: string, roleChoice: UserRole) => {
    setIsLoading(true);
    try {
      const { user: fUser, role } = await AuthService.handleEmailRegister(email, pass, name, roleChoice as string);
      setUser({
        id: fUser.uid,
        name: fUser.displayName || name || fUser.email?.split('@')[0] || 'Unknown',
        email: fUser.email || '',
        role: role as UserRole,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = React.useCallback(async () => {
    await AuthService.executeSignOut();
    setUser(null);
  }, []);

  const switchRole = React.useCallback(async (newRole: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      await persistUserToDB(user.id, user.email, user.name, newRole as string);
    }
  }, [user]);

  const contextValue = React.useMemo(() => ({
    user,
    isLoading,
    loginWithGoogle,
    handleEmailLogin,
    handleEmailRegister,
    logout,
    switchRole
  }), [user, isLoading, loginWithGoogle, handleEmailLogin, handleEmailRegister, logout, switchRole]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
