import React, { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import {
  Alert,
  Box,
  Button,
  Field,
  FieldRequiredIndicator,
  HStack,
  Input,
  InputGroup,
  NumberInput,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Star } from "lucide-react";

const ReviewForm = ({
  onSubmit,
  onCancel,
  initialData,
  onUpdate,
  isEditForm,
  mode,
}) => {
  const [formData, setFormData] = useState({
    userId: initialData?.userId || "",
    universityId: initialData?.universityId || "",
    rating: initialData?.rating || 0,
    title: initialData?.title || "",
    comment: initialData?.comment || "",
    program: initialData?.program || "",
    graduationYear: initialData?.graduationYear || "",
  });

  const [error, setError] = useState("");

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const getColorByRating = (rating) => {
    if (rating === 1 || rating === 2) return "red";
    if (rating === 3 || rating === 4) return "orange";
    if (rating === 5) return "green";
    return "gray";
  };

  const renderStars = (rating, interactive = false) => {
    const activeColor = getColorByRating(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={24}
          fill={i <= rating ? activeColor : "none"}
          color={i <= rating ? activeColor : "gray"}
          cursor={interactive ? "pointer" : "default"}
          onClick={
            interactive
              ? () => setFormData({ ...formData, rating: i })
              : undefined
          }
        />
      );
    }
    return stars;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submit called", formData);
    setError("");
    if (
      !formData.rating ||
      !formData.title ||
      !formData.comment ||
      !formData.program ||
      !formData.graduationYear
    ) {
      setError("Please fill in all  fields.");
      return;
    }

    if (mode === "edit" && isEditForm) {
      onUpdate(formData);
      return;
    }

    onSubmit(formData);

    // Reseting form form after submission
    setError("");
    setFormData({
      userId: "",
      universityId: "",
      rating: 0,
      title: "",
      comment: "",
      program: "",
      graduationYear: "",
    });
  };
  return (
    <Box
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      shadow="md"
    >
      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Write a Review
          </Text>
          {error && (
            <Alert.Root status="error" mb={4} mt={2}>
              <Alert.Indicator />
              <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
          )}
          <Field.Root required mt={2} mb={4}>
            <Field.Label>
              Rating (1-5)
              <FieldRequiredIndicator />
            </Field.Label>
            <HStack align="center" mt={3}>
              {renderStars(formData.rating, true)}
              <Text ml={2} color="gray.600" fontSize="sm">
                ({formData.rating} / 5)
              </Text>
            </HStack>
          </Field.Root>
          <Field.Root required mb={4}>
            <Field.Label>
              Review Title
              <FieldRequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Enter review title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              _focus={{
                borderColor: "brand.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
              }}
            />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Review Comment
              <FieldRequiredIndicator />
            </Field.Label>
            <Textarea
              placeholder="Write your review here"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              _focus={{
                borderColor: "brand.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
              }}
              rows={4}
            />
          </Field.Root>
          <HStack spaceX={4} align="center" mt={4}>
            <Field.Root>
              <Field.Label>Program</Field.Label>
              <Input
                placeholder="Enter your program"
                value={formData.program}
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
                _focus={{
                  borderColor: "brand.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                }}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Graduation Year</Field.Label>
              <InputGroup>
                <NumberInput.Root
                  min={2000}
                  max={new Date().getFullYear()}
                  value={formData.graduationYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      graduationYear: e.target.value,
                    })
                  }
                >
                  <NumberInput.Input
                    placeholder="YYYY"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </NumberInput.Root>
              </InputGroup>
            </Field.Root>
          </HStack>
          <HStack spaceX={4} justifyContent="right" mt={4}>
            {!isEditForm && (
              <Button variant="outline" size="md" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              colorPalette="green"
              variant="subtle"
              type="submit"
              size="md"
              onClick={handleFormSubmit}
            >
              {isEditForm ? "Update Review" : "Submit Review"}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default ReviewForm;
