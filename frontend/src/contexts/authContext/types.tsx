export type AuthContextType = {
  isLoggedIn: boolean | null;
  username: string;
  errorMsg: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};