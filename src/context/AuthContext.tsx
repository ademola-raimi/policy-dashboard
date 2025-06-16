import { createContext } from "react";
import type { AuthAction, AuthState } from "../types";
import { initialState } from "../provider/AuthProvider";

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

export default AuthContext;
