import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);

        const res = await api.get("/auth/me");

        if (res.data?.success && res.data?.data?.user) {
          setUser(res.data.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error("Error fetching user data:", error);
      } finally {
        setAuthReady(true);
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const authInfo = {
    user,
    isAuthenticated,
    authReady,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
