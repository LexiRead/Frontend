import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
  signout: () => {},
  isLoadingSignout: false,
  isSignoutSuccess: false,
});

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    return userName || userEmail ? { name: userName, email: userEmail } : {};
  });
  const [token, setTokenState] = useState(() =>
    localStorage.getItem("authToken")
  );
  const [isLoadingSignout, setIsLoadingSignout] = useState(false);
  const [isSignoutSuccess, setIsSignoutSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const setToken = (t) => {
    setTokenState(t);
    localStorage.setItem("authToken", t);
  };

  const signout = useCallback(async () => {
    setIsLoadingSignout(true);
    try {
      // Call logout API if needed
      const response = await fetch("http://app.elfar5a.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsSignoutSuccess(true);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API response
      setTokenState(null);
      setUser({});
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
      setIsLoadingSignout(false);
      navigate("/");
    }
  }, [token, navigate]);

  const isAuthenticated = !!token;

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      setUser,
      setToken,
      signout,
      isLoadingSignout,
      isSignoutSuccess,
    }),
    [isAuthenticated, user, token, signout, isLoadingSignout, isSignoutSuccess]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
