  import { createContext, useContext, useEffect, useState } from "react";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
    
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
    //Logins y Registers
    const signup = async (email, password) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    };
    const login = async (email, password) => {
      return await signInWithEmailAndPassword(auth, email, password);
    };
    const logingoogle = async()=>{
      const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    } 

    const logout = () => signOut(auth);

    useEffect(() => {

      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    }, []);

    return (
      <authContext.Provider value={{signup, login, user, logout, logingoogle}}>
        {children}
      </authContext.Provider>
    );  
  };
