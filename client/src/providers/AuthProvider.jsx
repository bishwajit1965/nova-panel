import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/me", { withCredentials: true });
        console.log("ME in auth provider", res);
        const userMe = res.data?.data?.user;
        if (userMe) {
          setUser(userMe);
          return userMe;
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

  const logout = () => {
    setUser(null);
  };

  const authInfo = {
    user,
    authReady,
    setUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
