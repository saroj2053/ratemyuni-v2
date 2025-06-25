import React, { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { toaster } from "../components/ui/toaster";
import { useDispatch } from "react-redux";
import { addNewUniversity } from "../features/university/universitySlice";

const useAddUniversity = () => {
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const addUniversity = async (formData) => {
    setIsSaving(true);
    try {
      const response = await fetch(API_BASE_URL + "/university/addUniversity", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        toaster.error({
          description: "Failed to add university. Please try again.",
          closable: true,
        });
        return false;
      }

      const data = await response.json();

      dispatch(addNewUniversity(data?.university));
      toaster.success({
        description: `University ${data?.university?.name} added successfully.`,
        closable: true,
      });
      return true;
    } catch (error) {
      console.error("Error adding university:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };
  return { isSaving, addUniversity };
};

export default useAddUniversity;
