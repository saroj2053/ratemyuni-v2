import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUniversities } from "../features/university/universitySlice";

const useGetUniversities = () => {
  const dispatch = useDispatch();

  const universities = useSelector(
    (state) => state?.universities?.universities
  );

  const getUniversities = async () => {
    const response = await fetch(API_BASE_URL + "/university/all", {
      method: "GET",
    });

    const data = await response.json();
    dispatch(setUniversities(data));
  };

  useEffect(() => {
    !universities && getUniversities();
  }, []);
};

export default useGetUniversities;
