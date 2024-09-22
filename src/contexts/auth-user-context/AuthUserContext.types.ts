import { Dispatch } from "react";
import { User } from "../../models";

export interface AuthUserContextData {
  user: User;
  setUser: Dispatch<User>;
}
