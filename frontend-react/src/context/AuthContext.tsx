import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../hooks/useAuth";
import { User } from "../utils/interfaces";
import { API_URL } from "../utils/constants";
import { GridLoader } from "react-spinners";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get(API_URL + "/auth/check/", {
        withCredentials: true, // Ensures cookies are sent
      });
      setUser(response.data); // Store user data
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after check
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await axios.post(
        API_URL + "/auth/login/",
        { username, password },
        { withCredentials: true },
      );

      // After login, re-check authentication
      await checkAuth();
    } catch (error) {
      console.error("Login failed", error);
      throw error as AxiosError;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      await axios.post(
        API_URL + "/auth/signup/",
        { username, email, password },
        { withCredentials: true },
      );

      // After signup, login automatically
      await login(username, password);
    } catch (error) {
      console.error("Signup failed", error);
      throw error as AxiosError;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        API_URL + "/auth/logout/",
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout failed", error);
      throw error as AxiosError;
    }
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <GridLoader size={50} color={"#f97316"} />{" "}
        {/* Orange color (#f97316 from Tailwind) */}
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
