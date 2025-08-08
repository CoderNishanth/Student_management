import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const loginData = {
      email: email,
      password: password,
    };
    console.log("Login data:", loginData);

    const res = await api.post("/auth/login", loginData);

    setUser(res.data);
    return res.data;
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, navigate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
