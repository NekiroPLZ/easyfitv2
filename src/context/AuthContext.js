import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../Credentials";
export const authContext = createContext();

//CustomHook
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProv = ({ children }) => {
  const [user, setUser] = useState(null);
  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, logout}}>
      {children}
    </authContext.Provider>
  );  
};
