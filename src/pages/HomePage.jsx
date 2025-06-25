import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Link,
  Highlight,
  Stat,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { Search, Users, Award, BookOpen, GraduationCap } from "lucide-react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const heroBg = useColorModeValue("brand.50", "brand.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const stats = [
    {
      label: "Universities",
      value: 8,
      icon: GraduationCap,
      color: "brand",
    },
    {
      label: "Student Reviews",
      value: 22,
      icon: Users,
      color: "teal",
    },
    {
      label: "Programs Available",
      value: 15,
      icon: BookOpen,
      color: "orange",
    },
    {
      label: "Average Rating",
      value: 4.4,
      icon: Award,
      color: "purple",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} py={16}>
        <Container maxW="container.xl">
          <VStack spaceY={4} textAlign="center">
            <VStack spaceY={4}>
              <Heading
                size="6xl"
                color="brand.700"
                lineHeight="shorter"
                maxW="800px"
                fontWeight="bold"
              >
                <Highlight
                  query="Perfect University"
                  styles={{
                    px: "0.5",
                    bg: "orange.subtle",
                    color: "orange.fg",
                  }}
                >
                  Find the Perfect University in Nepal
                </Highlight>
              </Heading>
              <Text
                fontSize="xl"
                color="gray.600"
                maxW="600px"
                lineHeight="tall"
              >
                Discover universities, read authentic student reviews, and make
                informed decisions about your higher education journey in Nepal.
              </Text>
            </VStack>

            <HStack marginTop={20}>
              <Link href="/universities">
                <Button size="lg" colorPalette="brand" px={8}>
                  <Search />
                  Explore Universities
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={8}>
          {stats.map((stat) => (
            <Box
              key={stat.label}
              bg={cardBg}
              p={6}
              borderRadius="lg"
              shadow="md"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{
                shadow: "lg",
                transform: "translateY(-2px)",
              }}
            >
              <VStack spaceY={3}>
                <Box p={3} borderRadius="full" bg={`${stat.color}.100`}>
                  <Icon
                    as={stat.icon}
                    boxSize={6}
                    color={`${stat.color}.600`}
                  />
                </Box>
                <Stat.Root
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Stat.ValueText
                    marginY={2}
                    fontSize="2xl"
                    fontWeight="semibold"
                    color={`${stat.color}.600`}
                  >
                    {stat.value}
                  </Stat.ValueText>
                  <Stat.Label
                    color="gray.600"
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    {stat.label}
                  </Stat.Label>
                </Stat.Root>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="4xl" color="gray.800" fontWeight="bold">
                Why Choose Nepal Uni Reviews?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px" marginY={4}>
                We provide comprehensive information and authentic reviews to
                help you make the best decision for your education.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spaceX={8}>
              <VStack
                bg={cardBg}
                p={8}
                borderRadius="lg"
                shadow="md"
                spacing={4}
                textAlign="center"
              >
                <Box p={3} borderRadius="full" bg="brand.100">
                  <Search size={32} color="var(--chakra-colors-brand-600)" />
                </Box>
                <Heading size="md" color="gray.800">
                  Comprehensive Search
                </Heading>
                <Text color="gray.600" fontSize="sm" lineHeight="tall">
                  Search universities by name, location, programs, and more.
                  Find exactly what you&apos;re looking for with our advanced
                  filtering options.
                </Text>
              </VStack>

              <VStack
                bg={cardBg}
                p={8}
                borderRadius="lg"
                shadow="md"
                spacing={4}
                textAlign="center"
              >
                <Box p={3} borderRadius="full" bg="teal.100">
                  <Users size={32} color="var(--chakra-colors-teal-600)" />
                </Box>
                <Heading size="md" color="gray.800">
                  Authentic Reviews
                </Heading>
                <Text color="gray.600" fontSize="sm" lineHeight="tall">
                  Read honest reviews from real students and alumni. Get
                  insights into campus life, academics, facilities, and more.
                </Text>
              </VStack>

              <VStack
                bg={cardBg}
                p={8}
                borderRadius="lg"
                shadow="md"
                spacing={4}
                textAlign="center"
              >
                <Box p={3} borderRadius="full" bg="orange.100">
                  <Award size={32} color="var(--chakra-colors-orange-600)" />
                </Box>
                <Heading size="md" color="gray.800">
                  Detailed Information
                </Heading>
                <Text color="gray.600" fontSize="sm" lineHeight="tall">
                  Get complete information about programs, facilities, admission
                  requirements, and everything you need to know.
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="container.xl" py={16}>
        <Box
          bg="brand.600"
          color="white"
          borderRadius="xl"
          p={12}
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading size="xl">Ready to Find Your Perfect University?</Heading>
            <Text fontSize="lg" opacity={0.9} maxW="600px">
              Join thousands of students who have found their ideal university
              through our platform. Start your search today!
            </Text>
            <Link to="/universities">
              <Button
                size="md"
                colorPalette="brand"
                variant="outline"
                px={8}
                onClick={() => navigate("/universities")}
              >
                Start Exploring
              </Button>
            </Link>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
