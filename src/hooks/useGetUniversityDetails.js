import React, { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  setUniversityDetails,
  setUniversityReviews,
} from "../features/university/universitySlice";

const useGetUniversityDetails = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUniversityDetails = async (universityId) => {
    setLoading(true);
    try {
      const response = await fetch(
        API_BASE_URL + `/university/${universityId}`,
        {
          method: "GET",
          credentials: "include", // Ensuring cookies are sent with the request
        }
      );

      const data = await response.json();

      dispatch(setUniversityDetails(data));
      dispatch(setUniversityReviews(data?.reviews));
    } catch (error) {
      console.error("Error fetching university details:", error);
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUniversityDetails };
};

export default useGetUniversityDetails;
