import React from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { deleteUniversityReview } from "../features/university/universitySlice";
import { toaster } from "../components/ui/toaster";

const useDeleteReview = () => {
  const dispatch = useDispatch();
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        API_BASE_URL + "/review/delete/" + reviewId,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete Failed:", errorData);
        throw new Error("Failed to delete review: " + errorData.message);
      }
      dispatch(deleteUniversityReview(reviewId));
      toaster.success({
        description: `Review with id ${reviewId} deleted successfully.`,
        closable: true,
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  return { deleteReview };
};

export default useDeleteReview;
