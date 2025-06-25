import {
  Box,
  Button,
  Field,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout();

  const navigate = useNavigate();

  const handleUserLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return navigate("/login");
  }

  const overviewItems = [
    { label: "Full Name", value: user.fullName, color: "overview-item--c1" },
    { label: "Email", value: user.email, color: "overview-item--c2" },
    { label: "Role", value: user.role, color: "overview-item--c3" },
    { label: "Type", value: user.userType, color: "overview-item--c4" },
  ];

  return (
    <Box
      maxW="1000px"
      padding="30px"
      margin="auto"
      marginBottom={8}
      borderRadius="lg"
      bg="gray.50"
      borderWidth={1}
      borderColor="gray.100"
      marginTop={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack mb={8}>
        <Text fontSize="3xl" fontWeight="bold" color="brand.600">
          Welcome, {user.fullName}
        </Text>
        <Text color="gray.600" fontWeight="semibold" mb={4}>
          Here's a quick overview of your profile information.
        </Text>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={8}
        >
          {overviewItems.map((item, index) => (
            <Box
              key={index}
              className={`overview-item ${item.color}`}
              color="white"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100px"
              width="200px"
            >
              <Text fontSize="lg" fontWeight="bold" mb={1}>
                {item.label}
              </Text>
              <Text fontSize="md">{item.value}</Text>
            </Box>
          ))}
        </Box>

        <Button colorPalette="brand" onClick={handleUserLogout} mt={6}>
          LogOut
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
