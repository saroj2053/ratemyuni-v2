import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Star, MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../ui/color-mode";

const UniversityCard = ({ university }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} fill="orange.400" color="orange.400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} fill="orange.200" color="orange.400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="gray.300" />);
    }

    return stars;
  };

  const getFirstNCharacters = (text, n) => {
    return text.length > n ? `${text.slice(0, n)}...` : text;
  };

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      transition="all 0.3s"
      my={4}
      _hover={{
        shadow: "lg",
        transform: "translateY(-2px)",
      }}
    >
      <Image
        src={university.logo}
        alt={university.name}
        h="120px"
        p={2}
        w="100%"
        objectFit="contain"
      />

      <Box p={6}>
        <VStack align="start" spaceY={3}>
          <HStack justify="space-between" w="100%">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
              lineClamp={1}
            >
              {university.name}
            </Text>
            <Badge
              colorPalette={university.type === "Public" ? "blue" : "purple"}
            >
              {university.type}
            </Badge>
          </HStack>

          <VStack spaceY={1} color="gray.600" alignItems="start">
            <HStack spaceX={1}>
              <MapPin size={16} />
              <Text fontSize="14px">
                {getFirstNCharacters(university.location, 45)}
              </Text>
            </HStack>
            <HStack spaceX={1}>
              <Calendar size={16} />
              <Text fontSize="14px" lineClamp={1}>
                Est. {university.establishedYear}
              </Text>
            </HStack>
          </VStack>

          <Text color="gray.600" fontSize="sm" lineClamp={2}>
            {university.description}
          </Text>

          <HStack spaceX={2} align="center">
            <HStack spaceX={1}>{renderStars(university.rating)}</HStack>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              {university.rating}
            </Text>
            <HStack spaceX={1} color="gray.500">
              <Users size={14} />
              <Text fontSize="sm">{university.totalReviews} reviews</Text>
            </HStack>
          </HStack>

          <HStack spaceX={2} flexWrap="wrap">
            {university.programs.slice(0, 3).map((program) => (
              <Badge
                key={program}
                variant="subtle"
                colorPalette="cyan"
                fontSize="xs"
              >
                {program}
              </Badge>
            ))}
            {university.programs.length > 3 && (
              <Text fontSize="xs" color="gray.500">
                +{university.programs.length - 3} more
              </Text>
            )}
          </HStack>

          <Link to={`/university/${university.id}`} style={{ width: "100%" }}>
            <Button colorPalette="brand" size="md" w="100%" mt={2}>
              View Details
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default UniversityCard;
