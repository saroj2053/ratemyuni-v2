import React from "react";
import { Box, Container, VStack, HStack, Text, Link } from "@chakra-ui/react";
import { GraduationCap } from "lucide-react";
import SignupForm from "../components/auth/SignupForm";
import { useColorModeValue } from "../components/ui/color-mode";

const SignupPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

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

          {/* Signup Form */}
          <SignupForm />

          {/* Additional Info */}
          <VStack spaceY={2} textAlign="center" maxW="400px">
            <Text fontSize="sm" color="gray.600">
              Join thousands of students who trust Nepal Uni Reviews for their
              education decisions.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Share your experiences and help others find their perfect
              university.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignupPage;
