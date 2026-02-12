import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  rank: string;
  bio: string;
  avatar: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  theme: "light" | "dark" | "camo";
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => { success: boolean; message: string };
  signUp: (data: { name: string; email: string; password: string; rank: string }) => { success: boolean; message: string };
  signOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("army_session");
    if (session) {
      const email = JSON.parse(session);
      const users = JSON.parse(localStorage.getItem("army_users") || "{}");
      if (users[email]) {
        setUser(users[email].profile);
      }
    }
  }, []);

  const signUp = (data: { name: string; email: string; password: string; rank: string }) => {
    const users = JSON.parse(localStorage.getItem("army_users") || "{}");
    if (users[data.email]) {
      return { success: false, message: "An account with this email already exists." };
    }
    const profile: UserProfile = {
      name: data.name,
      email: data.email,
      rank: data.rank,
      bio: "",
      avatar: "",
      socialLinks: { linkedin: "", instagram: "", facebook: "", twitter: "" },
      theme: "light",
    };
    users[data.email] = { password: data.password, profile };
    localStorage.setItem("army_users", JSON.stringify(users));
    localStorage.setItem("army_session", JSON.stringify(data.email));
    setUser(profile);
    return { success: true, message: "Account created successfully!" };
  };

  const signIn = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("army_users") || "{}");
    if (!users[email]) {
      return { success: false, message: "No account found with this email." };
    }
    if (users[email].password !== password) {
      return { success: false, message: "Incorrect password." };
    }
    localStorage.setItem("army_session", JSON.stringify(email));
    setUser(users[email].profile);
    return { success: true, message: "Welcome back, soldier!" };
  };

  const signOut = () => {
    localStorage.removeItem("army_session");
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    const users = JSON.parse(localStorage.getItem("army_users") || "{}");
    if (users[user.email]) {
      users[user.email].profile = updated;
      localStorage.setItem("army_users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
