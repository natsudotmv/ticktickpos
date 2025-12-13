import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken, clearAuthToken } from "@/api/http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = (jwt) => {
    setToken(jwt);
    navigate("/pos", { replace: true });
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
