import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);

        const res = await api.get("/auth/me");

        if (res.data?.success && res.data?.data?.user) {
          setUser(res.data.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
