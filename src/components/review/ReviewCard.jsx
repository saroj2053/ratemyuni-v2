import React, { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { Pen, Star, Trash2, User } from "lucide-react";
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useDeleteReview from "../../hooks/useDeleteReview";
import ReviewForm from "./ReviewForm";
import useUpdateReview from "../../hooks/useUpdateReview";
import { toaster } from "../ui/toaster";

const ReviewCard = ({ review }) => {
  const user = useSelector((state) => state.user.user);
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { deleteReview } = useDeleteReview();
  const { updateReview } = useUpdateReview();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getColorByRating = (rating) => {
    if (rating === 1 || rating === 2) return "red";
    if (rating === 3 || rating === 4) return "orange";
    if (rating === 5) return "green";
    return "gray";
  };

  const renderStars = (rating) => {
    const activeColor = getColorByRating(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i <= rating ? activeColor : "none"}
          color={i <= rating ? activeColor : "gray"}
        />
      );
    }
    return stars;
  };

  const handleUpdateReview = async (updatedReview) => {
    const success = updateReview(review.id, updatedReview);
    if (success) {
      toaster.success({
        title: "Review updated successfully!",
        description: "Updated review has been sent to server.",
        closable: true,
      });
      setIsEditDialogOpen(false);
    } else {
      toaster.error({
        title: "Failed to update review",
        description:
          "There was an error updating your review. Please try again.",
        closable: true,
      });
    }
  };

  return (
    <>
      <Box
        width="1250px"
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
        transition="all 0.2s"
        boxShadow="sm"
      >
        <VStack align="start" spaceY={4}>
          <HStack justify="space-between" w="100%">
            <HStack spaceX={2}>
              <Box p={2} bg="brand.100" borderRadius="full">
                <User size={32} color="var(--chakra-colors-brand-600)" />
              </Box>
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                  {user?.id === review.userId
                    ? user?.fullName
                    : "Anonymous user"}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </VStack>
            </HStack>
            <HStack>{renderStars(review.rating)}</HStack>
          </HStack>

          <Text fontWeight="semibold" color="gray.800">
            {review.title}
          </Text>

          <Text fontSize="sm" color="gray.600" lineHeight="tall">
            {review.comment}
          </Text>

          <HStack spaceX={2} flexWrap="wrap">
            {review.program && (
              <Badge colorPalette="teal" variant="surface" fontSize="xs" p={2}>
                {review.program}
              </Badge>
            )}
            {review.graduationYear && (
              <Badge
                colorPalette="orange"
                variant="surface"
                fontSize="xs"
                p={2}
              >
                Class of {review.graduationYear}
              </Badge>
            )}
          </HStack>

          {user?.id === review.userId && (
            <HStack spaceX={4} marginTop={4}>
              <Dialog.Root
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onExitComplete={() => setIsEditDialogOpen(false)}
                motionPreset="slide-in-right"
                onInteractOutside={(e) => {
                  e.preventDefault();
                  setIsEditDialogOpen(false);
                }}
              >
                <Dialog.Trigger asChild>
                  <Button
                    size="sm"
                    variant="subtle"
                    colorPalette="blue"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Pen />
                    Edit
                  </Button>
                </Dialog.Trigger>

                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Edit Review {review?.id}</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <ReviewForm
                          mode="edit"
                          initialData={review}
                          onUpdate={handleUpdateReview}
                          isEditForm
                        />
                      </Dialog.Body>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton
                          size="sm"
                          onClick={() => setIsEditDialogOpen(false)}
                        />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>

              <Button
                size="sm"
                variant="subtle"
                colorPalette="red"
                onClick={() => deleteReview(review.id)}
              >
                <Trash2 />
                Delete
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>
      {/* Edit Review Dialog */}
    </>
  );
};

export default ReviewCard;
