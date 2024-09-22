import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { User } from "../../models";
import { AuthUserContextData } from "./AuthUserContext.types";

const AuthUserContext = createContext({} as AuthUserContextData);

export function AuthUserProvider({ children }: any) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading]);

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
