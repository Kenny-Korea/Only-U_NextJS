import { createContext, ReactNode, useEffect, useState } from "react";
import { getDocs, query, collection, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

type AuthContextProviderProp = {
  children: ReactNode;
};
interface UserInfo {}

type AuthContext = {
  currentUser: {};
  partnerInfo: {};
};

export const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProp) => {
  const [currentUser, setCurrentUser] = useState({
    id: "kmkim4238",
    name: "kenny",
  });
  const [partnerInfo, setPartnerInfo] = useState({
    id: "siscarian",
    name: "sisca",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      // setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);
};
