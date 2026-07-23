// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Validar sesión al montar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    await fetch("/api/users/logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
