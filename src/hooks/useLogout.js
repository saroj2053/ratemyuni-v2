import React, { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/user/userSlice";
import { toaster } from "../components/ui/toaster";

const useLogout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + "/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("logout failed");
      }

      if (response.ok && data.success) {
        dispatch(removeUser());
        toaster.create({
          description: "User logged out successfully.",
          type: "info",
          closable: true,
        });
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
