
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');

  return ctx;
};

export default useAuth;