import { Box, Button } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import React from "react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();
  return (
    <div className="flex items-center gap-2" onClick={logout}>
      <LogOut size={16} />
      <Box>Logout</Box>
    </div>
  );
};

export default LogoutButton;
