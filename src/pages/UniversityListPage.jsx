import React from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import UniversityCard from "../components/university/UniversityCard";

import { useColorModeValue } from "../components/ui/color-mode";
import { useSelector } from "react-redux";
import useGetUniversities from "../hooks/useGetUniversities";
// import { universities } from "../data/universities";

const UniversityListPage = () => {
  const headerBg = useColorModeValue("gray.50", "gray.800");
  const user = useSelector((state) => state.user.user);
  const universities = useSelector((state) => state?.university?.universities);
  const searchQuery = useSelector((state) => state?.university?.searchQuery);
  useGetUniversities();

  const filteredUniversities = universities.filter((uni) => {
    const query = searchQuery.toLowerCase();
    return (
      uni.name.toLowerCase().includes(query) ||
      uni.location.toLowerCase().includes(query) ||
      (uni.programs || []).some((program) =>
        program.toLowerCase().includes(query)
      )
    );
  });

  return (
    <Box minH="100vh">
      {/* Header */}
      <Box bg={headerBg} py={8}>
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
            <VStack spaceY={4} align="start">
              <Heading size="xl" color="gray.800">
                Universities in Nepal
              </Heading>
              <Text color="gray.600">
                Found {filteredUniversities.length} universities
              </Text>
              {searchQuery && (
                <HStack>
                  <Text color="gray.500">Search results for:</Text>
                  <Text fontWeight="semibold" color="brand.500">
                    "{searchQuery}"
                  </Text>
                </HStack>
              )}
            </VStack>

            {user?.role === "admin" && (
              <Link to="/add-university">
                <Button
                  bg={"brand.400"}
                  size="lg"
                  shadow="md"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  <Plus />
                  Add University
                </Button>
              </Link>
            )}
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* University Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spaceX={6}>
          {filteredUniversities.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default UniversityListPage;
