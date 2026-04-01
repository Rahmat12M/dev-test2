import { createContext } from "react";
import type { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  username: '',
  errorMsg: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setErrorMsg: () => {},
  handleFocus: () => {}
});