import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Link,
  InputGroup,
  Separator,
  HStack,
  IconButton,
  Field,
  Alert,
} from "@chakra-ui/react";
import { Eye, EyeOff, MailIcon } from "lucide-react";
import { useColorModeValue } from "../ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      onLogin(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg={cardBg}
      p={8}
      borderRadius="xl"
      shadow="lg"
      border="1px"
      borderColor={borderColor}
      w="100%"
      maxW="500px"
    >
      <VStack spaceY={6}>
        <VStack spaceY={2} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="brand.600">
            Welcome Back
          </Text>
          <Text color="gray.600">Sign in to your account to continue</Text>
        </VStack>

        {error && (
          <Alert.Root status="error" mb={4}>
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit} method="POST" style={{ width: "100%" }}>
          <VStack spaceY={2}>
            <Field.Root>
              <Field.Label>
                Email Address <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement={<MailIcon size={18} />}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  bg="gray.50"
                  borderWidth="1px"
                  borderColor="gray.200"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
              </InputGroup>
            </Field.Root>

            <Field.Root>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup
                endElement={
                  <IconButton
                    variant="ghost"
                    size="sm"
                    padding={0}
                    rounded={"md"}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </IconButton>
                }
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg="gray.50"
                  borderWidth="1px"
                  borderColor="gray.200"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
              </InputGroup>
            </Field.Root>

            {/* <HStack justify="space-between" w="100%">
              <Text fontSize="sm" color="gray.600">
                Remember me
              </Text>
              <Link
                color="brand.500"
                fontSize="sm"
                _hover={{ color: "brand.600" }}
              >
                Forgot password?
              </Link>
            </HStack> */}

            <Button
              type="submit"
              colorPalette="brand"
              size="lg"
              w="100%"
              disabled={isLoading}
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign In
            </Button>
          </VStack>
        </form>

        <HStack spaceX={4} w="100%">
          <Separator flex="1" />
          <Text
            flexShrink="0"
            fontSize="sm"
            color="gray.500"
            whiteSpace="nowrap"
          >
            or
          </Text>
          <Separator flex="1" />
        </HStack>

        <VStack spaceY={3} w="100%">
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to="/signup"
              color="brand.500"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
            >
              Sign up here
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoginForm;
