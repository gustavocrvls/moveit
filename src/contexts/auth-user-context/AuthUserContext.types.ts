import { Dispatch } from "react";
import { User } from "../../models";

export interface AuthUserContextData {
  user: User;
  signIn: () => void;
}
