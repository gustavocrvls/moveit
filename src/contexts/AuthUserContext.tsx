import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Cookies from "js-cookie";

const AuthUserContext = createContext({} as any);

export function AuthUserProvider({ children }: any) {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      if (Cookies.get("moveituser")) {
        setUser(JSON.parse(Cookies.get("moveituser")));
      } else {
        router.push("/login");
      }
    }

    onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);

      Cookies.set("moveituser", JSON.stringify(newUser));
    });
  }, [user]);

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
