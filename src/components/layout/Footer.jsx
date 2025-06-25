import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  HStack,
  Link,
  Separator,
} from "@chakra-ui/react";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { useColorModeValue } from "../ui/color-mode";

const Footer = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor} mt="auto">
      <Container maxW="container.xl" py={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          justify="space-between"
        >
          <Stack spacing={4} maxW="md">
            <HStack spacing={2}>
              <Box color="brand.500">
                <GraduationCap size={24} />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="brand.600">
                Nepal Uni Reviews
              </Text>
            </HStack>
            <Text color="gray.600" fontSize="sm">
              Your trusted platform for finding and reviewing universities in
              Nepal. Help others make informed decisions about their higher
              education journey.
            </Text>
          </Stack>

          <Stack direction={{ base: "column", sm: "row" }} spacing={8}>
            <Stack spacing={3}>
              <Text fontWeight="semibold" color="gray.700">
                Quick Links
              </Text>
              <Stack spacing={2} fontSize="sm">
                <Link to="#" color="gray.600" _hover={{ color: "brand.500" }}>
                  All Universities
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Public Universities
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Private Universities
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Write a Review
                </Link>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Text fontWeight="semibold" color="gray.700">
                Programs
              </Text>
              <Stack spacing={2} fontSize="sm">
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Engineering
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Medicine
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Management
                </Link>
                <Link color="gray.600" _hover={{ color: "brand.500" }}>
                  Science
                </Link>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Text fontWeight="semibold" color="gray.700">
                Contact
              </Text>
              <Stack spacing={2} fontSize="sm">
                <HStack spacing={2}>
                  <Mail size={14} />
                  <Text color="gray.600">info@nepalunireviews.com</Text>
                </HStack>
                <HStack spacing={2}>
                  <Phone size={14} />
                  <Text color="gray.600">+977-1-4567890</Text>
                </HStack>
                <HStack spacing={2}>
                  <MapPin size={14} />
                  <Text color="gray.600">Kathmandu, Nepal</Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Separator my={8} />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" color="gray.600">
            © 2024 Nepal Uni Reviews. All rights reserved.
          </Text>
          <HStack spacing={4} fontSize="sm">
            <Link color="gray.600" _hover={{ color: "brand.500" }}>
              Privacy Policy
            </Link>
            <Link color="gray.600" _hover={{ color: "brand.500" }}>
              Terms of Service
            </Link>
            <Link color="gray.600" _hover={{ color: "brand.500" }}>
              About Us
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
