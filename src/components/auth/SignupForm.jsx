import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  InputGroup,
  Separator,
  HStack,
  Link,
  Field,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  Alert,
} from "@chakra-ui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useColorModeValue } from "../ui/color-mode";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice";

const userTypes = [
  { label: "Student", value: "Student" },
  { label: "Teacher", value: "Teacher" },
  { label: "Administrator", value: "Administrator" },
];

const SignupForm = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  // Chakra UI Combobox component for selecting user type
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: userTypes,
    filter: contains,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { fullName, email, password, confirmPassword, type } = formData;

    if (!fullName || !email || !password || !confirmPassword || !type) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Making an API call to create the account
    try {
      const response = await fetch(API_BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensuring cookies are sent with the request
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
      }

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch(addUser(data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(
        "An error occurred while creating your account. Please try again."
      );
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
            Create Account
          </Text>
          <Text color="gray.600">Join Nepal Uni Reviews community</Text>
        </VStack>
        {error && (
          <Alert.Root status="error" mb={4}>
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spaceY={4}>
            <Field.Root required>
              <Field.Label>
                Full Name <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement={<User size={18} color="gray.400" />}>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  type="text"
                  placeholder="Enter your full name"
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

            <Field.Root required>
              <Field.Label>
                Email Address <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement={<Mail size={18} color="gray.400" />}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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

            <Field.Root required>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement={<Lock size={18} color="gray.400" />}>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create a password"
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

            <Field.Root required>
              <Field.Label>
                Confirm Password
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement={<Lock size={18} color="gray.400" />}>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your password"
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

            <Combobox.Root
              collection={collection}
              onInputValueChange={(e) => filter(e.inputValue)}
              width="100%"
            >
              <Combobox.Label>Select user kind:</Combobox.Label>
              <Combobox.Control>
                <Combobox.Input
                  placeholder="Type to search"
                  borderWidth={1}
                  borderColor="gray.200"
                  _focus={{ borderColor: "brand.400" }}
                />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    <Combobox.Empty>No items found</Combobox.Empty>
                    {collection.items.map((item) => (
                      <Combobox.Item
                        item={item}
                        key={item.value}
                        onClick={() =>
                          setFormData({ ...formData, type: item.value })
                        }
                      >
                        {item.label}
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>

            <Button
              type="submit"
              colorPalette="brand"
              size="lg"
              w="100%"
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? "Creating Account" : "Create Account"}
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
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/login"
              color="brand.500"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
            >
              Sign in here
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SignupForm;
