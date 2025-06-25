import React, { useEffect, useState } from "react";
import useGetUniversityDetails from "../hooks/useGetUniversityDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Spinner,
  Center,
  Tabs,
  SimpleGrid,
  Separator,
} from "@chakra-ui/react";
import {
  Award,
  BookOpen,
  Building,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import ReviewCard from "../components/review/ReviewCard";
import Map from "../components/map/Map";
import ReviewForm from "../components/review/ReviewForm";
import useSaveReview from "../hooks/useSaveReview";
import { getSortedUniversityReviews } from "../utils/universitySelectors";
import RatingIdentifier from "../components/review/RatingIdentifier";
import { calculateAverageRating } from "../utils/calculateAverageRating";

const UniversityDetailsPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const navigate = useNavigate();

  const params = useParams();
  const universityId = params.id;
  const { loading, getUniversityDetails } = useGetUniversityDetails();
  const { saveReview } = useSaveReview();

  const [showReviewForm, setShowReviewForm] = useState(false);

  const universityState = useSelector(
    (state) => state?.university?.universityDetails
  );

  const reviews = useSelector(getSortedUniversityReviews);

  const user = useSelector((state) => state?.user?.user);
  const userId = user?.id;
  const {
    id,
    name,
    logo,
    location,
    establishedYear,
    type,
    websiteUrl,
    reviewIds,
    programs,
    facilities,
    description,
  } = universityState?.university || {};

  useEffect(() => {
    getUniversityDetails(universityId);
  }, [universityId]);

  // 🌀 Show loader while data is fetching
  if (loading || !universityState?.university) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" thickness="4px" color="teal.500" speed="0.65s" />
      </Center>
    );
  }

  const handleReviewSubmit = async (reviewData) => {
    reviewData.universityId = id;
    reviewData.userId = userId;

    saveReview(reviewData);

    setShowReviewForm(false);
  };

  return (
    <>
      <Box minH="100vh">
        <Container maxW="container.xl" py={8}>
          <Box
            bg={cardBg}
            borderRadius="lg"
            overflow="hidden"
            shadow="lg"
            border="1px"
            borderColor={borderColor}
            mb={8}
            p={4}
          >
            <Image
              src={logo}
              alt={name}
              h="300px"
              w="100%"
              objectFit="contain"
            />

            <Box p={8}>
              <VStack align="start" spaceY={4}>
                <HStack justify="space-between" w="100%" flexWrap="wrap">
                  <Heading size="4xl" fontWeight="bold" color="gray.800">
                    {name}
                  </Heading>

                  <Badge
                    colorPalette={type === "Public" ? "blue" : "purple"}
                    fontSize="md"
                    px={3}
                    py={1}
                  >
                    {type} University
                  </Badge>
                </HStack>

                <HStack
                  justify="space-between"
                  w="100%"
                  flexWrap="wrap"
                  color="gray.600"
                >
                  <HStack spaceX={1}>
                    <MapPin size={16} />
                    <Text fontSize="sm">{location}</Text>
                  </HStack>
                  <HStack spaceX={1}>
                    <Calendar size={16} />
                    <Text fontSize="sm">Established {establishedYear}</Text>
                  </HStack>
                </HStack>
              </VStack>

              <Text
                fontSize="sm"
                textAlign="justify"
                color="gray.800"
                lineHeight="tall"
                my={4}
              >
                {description}
              </Text>

              <HStack spaceX={4} mb={8}>
                <Link
                  to={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button colorPalette="blue" variant="outline" size="md">
                    <ExternalLink size={16} />
                    Visit Website
                  </Button>
                </Link>
              </HStack>

              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="gray.700"
                className="text-4xl font-bold text-slate-600 py-8"
              >
                Reviews_
              </Text>
              <HStack
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <VStack>
                  <Heading color="gray.700" fontSize="lg" mt={4}>
                    Total Reviews
                  </Heading>

                  <Text fontSize="2xl" fontWeight="bold">
                    {reviews?.length}
                  </Text>
                </VStack>

                <VStack>
                  <Heading color="gray.700" fontSize="lg" mt={4}>
                    Average Rating
                  </Heading>

                  {reviews?.length > 0 ? (
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="gray./00"
                      textAlign="center"
                      className="text-4xl text-slate-600 font-bold py-4"
                    >
                      {calculateAverageRating(reviews)} &#9733;
                    </Text>
                  ) : (
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="gray.700"
                      textAlign="center"
                      className="text-4xl text-slate-600 font-bold py-4"
                    >
                      0.0
                    </Text>
                  )}
                </VStack>
                <RatingIdentifier />
              </HStack>
            </Box>
          </Box>

          {/* Tabs Section */}
          <Tabs.Root
            key={universityId}
            variant={"outline"}
            defaultValue="Programs"
          >
            <Tabs.List>
              <Tabs.Trigger
                value="Programs"
                fontWeight="semibold"
                _focus={{ boxShadow: "none", color: "brand.500" }}
              >
                <BookOpen size={20} />
                Programs
              </Tabs.Trigger>
              <Tabs.Trigger
                value="Facilities"
                fontWeight="semibold"
                _focus={{ boxShadow: "none", color: "brand.500" }}
              >
                <Building size={20} />
                Facilities
              </Tabs.Trigger>
              <Tabs.Trigger
                value="Reviews"
                fontWeight="semibold"
                _focus={{ boxShadow: "none", color: "brand.500" }}
              >
                <Award size={20} />
                Reviews ({reviews ? reviews.length : 0})
              </Tabs.Trigger>
            </Tabs.List>

            {/* contents of Programs tab */}
            <Tabs.Content value="Programs">
              <Box
                bg={cardBg}
                borderRadius="md"
                shadow="sm"
                p={6}
                borderColor={borderColor}
              >
                <Heading
                  size="md"
                  mb={4}
                  color="gray.800"
                  fontWeight="semibold"
                >
                  Available Programs
                </Heading>

                <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
                  {programs.map((program, index) => (
                    <Badge
                      key={program + index}
                      variant="subtle"
                      colorPalette="teal"
                      size="sm"
                      p={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                    >
                      {program.toUpperCase()}
                    </Badge>
                  ))}
                </SimpleGrid>
              </Box>
            </Tabs.Content>

            {/* contents of Facilities tab */}

            <Tabs.Content value="Facilities">
              <Box
                bg={cardBg}
                borderRadius="md"
                shadow="sm"
                p={6}
                borderColor={borderColor}
              >
                <Heading
                  size="md"
                  mb={4}
                  color="gray.800"
                  fontWeight="semibold"
                >
                  Available Facilities
                </Heading>

                <SimpleGrid columns={{ sm: 1, base: 2, lg: 3 }} gap={4}>
                  {facilities.map((facility, index) => (
                    <Badge
                      key={facility + index}
                      variant="subtle"
                      colorPalette="teal"
                      size="sm"
                      p={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                    >
                      {facility.toUpperCase()}
                    </Badge>
                  ))}
                </SimpleGrid>
              </Box>
            </Tabs.Content>
            {/* contents of Reviews tab */}
            <Tabs.Content value="Reviews">
              {showReviewForm && (
                <ReviewForm
                  mode="create"
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm((prevState) => !prevState)}
                />
              )}
              {!reviewIds ? (
                <VStack spaceY={4} align="center" mt={8}>
                  <Text color="gray.700" fontSize="md">
                    No reviews available for this university yet.
                  </Text>
                  <Text color="gray.500" fontSize="md">
                    Be the first to share your experience at {name}!
                  </Text>
                  {userId ? (
                    <Button
                      colorPalette="teal"
                      fontSize="md"
                      color="white"
                      disabled={showReviewForm}
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write First Review
                    </Button>
                  ) : (
                    <Button
                      bg="salmon"
                      color="whiteAlpha.950"
                      fontSize="md"
                      p="2"
                      onClick={() => navigate("/login")}
                    >
                      Please login to write a review.
                    </Button>
                  )}
                </VStack>
              ) : (
                <VStack spaceY={4} align="start" mt={2}>
                  <HStack justify="space-between" w="100%">
                    <Heading
                      size="lg"
                      p={2}
                      color="gray.800"
                      fontWeight="semibold"
                    >
                      Reviews
                    </Heading>
                    {userId && !showReviewForm && (
                      <Button
                        colorPalette="green"
                        variant="subtle"
                        size="md"
                        onClick={() => setShowReviewForm(true)}
                      >
                        Add Review
                      </Button>
                    )}
                  </HStack>
                  {reviews.map((review, index) => (
                    <ReviewCard key={review.id + index} review={review} />
                  ))}
                </VStack>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Container>
      </Box>
      {/* Map Section */}
      {universityState?.geocode && (
        <div>
          <Map
            lat={universityState?.geocode.latitude}
            lon={universityState?.geocode.longitude}
            universityName={name}
            universityLocation={location}
          />
        </div>
      )}
    </>
  );
};

export default UniversityDetailsPage;
