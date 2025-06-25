import React from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateUniversityReview } from "../features/university/universitySlice";

const useUpdateReview = () => {
  const dispatch = useDispatch();
  const updateReview = async (reviewId, updatedReview) => {
    try {
      const response = await fetch(
        API_BASE_URL + "/review/update/" + reviewId,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete Failed:", errorData);
        throw new Error("Failed to delete review: " + errorData.message);
      }

      const data = await response.json();

      dispatch(
        updateUniversityReview({
          id: data?.updatedReview?.id,
          updatedReview: data?.updatedReview,
        })
      );
      return true;
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return { updateReview };
};

export default useUpdateReview;
