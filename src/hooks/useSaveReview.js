import React from "react";
import { addUniversityReview } from "../features/university/universitySlice";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { toaster } from "../components/ui/toaster";

const useSaveReview = () => {
  const dispatch = useDispatch();
  const saveReview = async (reviewData) => {
    try {
      const response = await fetch(API_BASE_URL + "/review", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        toaster.error({
          description: "Failed to submit review. Please try again.",
          closable: true,
        });
      }

      const data = await response.json();

      dispatch(addUniversityReview(data));

      toaster.success({
        description: `New review with id ${data.id} saved successfully.`,
        closable: true,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return { saveReview };
};

export default useSaveReview;
