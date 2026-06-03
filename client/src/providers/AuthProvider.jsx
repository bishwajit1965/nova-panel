import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { getMe, loginUser, logoutUser } from "../services/auth.service";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const response = await getMe();
        console.log("ME in auth provider", response);
        if (response.success && response.data?.user) {
          setUser(response.data?.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setAuthReady(true);

        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = async (payload) => {
    const response = await loginUser(payload);

    if (response.success) {
      const loggingUser = response.data?.user;
      setUser(loggingUser);
      return loggingUser;
    }

    return null;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const authInfo = {
    user,
    authReady,
    setUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
