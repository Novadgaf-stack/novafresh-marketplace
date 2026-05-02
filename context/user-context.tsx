'use client';

import React, { createContext, useContext, useState } from 'react';

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

const GUEST_USER: User = {
  id: 'guest',
  name: 'Guest User',
  email: 'guest@nova.fresh',
  role: 'customer'
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(GUEST_USER);
  const isLoading = false;

  const loginWithGoogle = React.useCallback(async () => {}, []);
  const handleEmailLogin = React.useCallback(async () => {}, []);
  const handleEmailRegister = React.useCallback(async () => {}, []);
  const logout = React.useCallback(async () => {
    setUser(GUEST_USER);
  }, []);

  const switchRole = React.useCallback(async (newRole: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
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
