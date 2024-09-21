import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Cookies from "js-cookie";
import { AuthUser } from "../models";

interface AuthUserContextData {
  user: AuthUser;
  setUser: Dispatch<AuthUser>;
}

const AuthUserContext = createContext({} as AuthUserContextData);

export function AuthUserProvider({ children }: any) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading]);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {isLoading ? <div>isLoading...</div> : children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
