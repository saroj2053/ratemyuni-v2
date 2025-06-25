import React from "react";
import { Box, Container, VStack, HStack, Text, Link } from "@chakra-ui/react";
import { GraduationCap } from "lucide-react";

import LoginForm from "../components/auth/LoginForm";
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const LoginPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensuring cookies are sent with the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok && data.success === false) {
        return toaster.error({
          description: data.message || "Login failed. Please try again.",
          closable: true,
        });
      }

      // Dispatch login action with user data
      dispatch(addUser(data.user));
      navigate("/");

      return toaster.success({
        description: data.message,
        closable: true,
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return toaster.error({
        description: "An error occurred while logging in. Please try again.",
        closable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg={bg} py={12}>
      <Container maxW="container.sm">
        <VStack spaceY={4} align="center">
          {/* Logo */}
          <Link href="/">
            <HStack spaceX={2} cursor="pointer">
              <Box color="brand.500">
                <GraduationCap size={40} />
              </Box>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                Nepal Uni Reviews
              </Text>
            </HStack>
          </Link>

          {/* Login Form */}
          <LoginForm onLogin={handleLogin} />

          {/* Additional Info */}
          <VStack spacing={2} textAlign="center" maxW="400px">
            <Text fontSize="sm" color="gray.600">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Nepal Uni Reviews helps students make informed decisions about
              their higher education.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
