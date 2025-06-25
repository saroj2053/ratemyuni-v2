import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Search,
  Plus,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import LogoutButton from "../common/LogoutButton";

const MainNav = () => {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <HStack spaceX={4} cursor="pointer">
        <Link to="/universities" color="brand.600">
          <Text
            color={
              location.pathname === "/universities" ? "brand.500" : "gray.700"
            }
            fontWeight="semibold"
          >
            Universities
          </Text>
        </Link>

        {user ? (
          <Menu.Root
            positioning={{ placement: "top-end", offset: { mainAxis: 20 } }}
          >
            <Menu.Trigger cursor="pointer">
              <Image
                src={user.profileAvatar}
                alt="user avatar"
                borderRadius="full"
                boxSize="40px"
              />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner offset={10}>
                <Menu.Content>
                  <Menu.Item
                    value="profile"
                    cursor="pointer"
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
                  <Menu.Item value="logout" cursor="pointer">
                    <LogoutButton />
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <>
            <Link to="/login">
              <Text
                fontWeight={"semibold"}
                color={
                  location.pathname === "/login" ? "brand.500" : "gray.700"
                }
              >
                Login
              </Text>
            </Link>
            <Link to="/signup">
              <Button
                variant={location.pathname === "/signup" ? "solid" : "outline"}
                colorPalette="brand"
                size="sm"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </HStack>
    </>
  );
};

export default MainNav;
