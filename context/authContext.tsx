import { createContext, ReactNode } from "react";

type AuthContextProviderProp = {
  children: ReactNode;
};
interface UserInfo {}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }: AuthContextProviderProp) => {
  const [currentUser, setCurrentUser] = useState({});
};
