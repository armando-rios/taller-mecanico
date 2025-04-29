import { useState, useEffect, useContext, createContext } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  token: string;
}

interface AuthContext {
  auth: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    const storeAuth = localStorage.getItem("auth");
    return storeAuth ? JSON.parse(storeAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const login = (userData: User): void => {
    setAuth(userData);
  };

  const logout = (): void => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
