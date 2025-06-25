import React from "react";

import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Text,
  Portal,
  Menu,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Plus, User, Menu as MenuIcon } from "lucide-react";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

const MobileNav = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { logout } = useLogout();
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="ghost" rounded={"md"} size="sm" colorPalette="brand">
          <MenuIcon size={20} />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Nepal Uni Reviews</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack spaceY={4} cursor="pointer">
                <Link to="/universities" color="brand.600">
                  <Text
                    color={
                      location.pathname === "/universities"
                        ? "brand.500"
                        : "gray.700"
                    }
                    fontWeight="semibold"
                  >
                    Universities
                  </Text>
                </Link>

                {user ? (
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Image
                        src={user.profileAvatar}
                        alt="user avatar"
                        borderRadius="full"
                        boxSize="40px"
                        cursor="pointer"
                      />
                    </Menu.Trigger>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item
                          value="profile"
                          onClick={() => navigate("/profile")}
                        >
                          <User size={16} />
                          <Box>Profile</Box>
                        </Menu.Item>
                        {user.role === "admin" && (
                          <Menu.Item
                            value="addUniversity"
                            onClick={() => navigate("/add-university")}
                          >
                            <Plus size={16} />
                            <Box>Add university</Box>
                          </Menu.Item>
                        )}

                        <Menu.Item value="logout" onClick={logout}>
                          <LogOut size={16} />
                          <Box>Logout</Box>
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu.Root>
                ) : (
                  <>
                    <Link to="/login">
                      <Text
                        fontWeight={"semibold"}
                        color={
                          location.pathname === "/login"
                            ? "brand.500"
                            : "gray.700"
                        }
                      >
                        Login
                      </Text>
                    </Link>
                    <Link to="/signup">
                      <Button
                        variant={
                          location.pathname === "/signup" ? "solid" : "outline"
                        }
                        colorPalette="brand"
                        size="sm"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Text fontSize="sm" color="gray.500">
                info@nepalunireviews.com
              </Text>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileNav;
