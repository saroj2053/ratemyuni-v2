import { createSlice } from "@reduxjs/toolkit";

const universitySlice = createSlice({
  name: "universities",
  initialState: {
    universities: [],
    universityDetails: null,
    universityReviews: [],
    searchQuery: "",
  },
  reducers: {
    setUniversities: (state, action) => {
      state.universities = action.payload;
    },
    setUniversityDetails: (state, action) => {
      state.universityDetails = action.payload;
    },
    addNewUniversity: (state, action) => {
      state.universities.push(action.payload);
    },
    setUniversityReviews: (state, action) => {
      state.universityReviews = action.payload;
    },
    // add new review to the university when a user submits a review
    addUniversityReview: (state, action) => {
      state.universityReviews.push(action.payload);
    },

    updateUniversityReview: (state, action) => {
      const { id, updatedReview } = action.payload;
      const reviewIdx = state.universityReviews.findIndex(
        (review) => review.id === id
      );
      if (reviewIdx !== -1) {
        state.universityReviews[reviewIdx] = {
          ...state.universityReviews[reviewIdx],
          ...updatedReview,
        };
      }
    },

    // delete a review from the universityReviews array when a user deletes a review
    deleteUniversityReview: (state, action) => {
      state.universityReviews = state.universityReviews.filter(
        (review) => review.id !== action.payload
      );
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setUniversities,
  setSearchQuery,
  setUniversityDetails,
  addNewUniversity,
  setUniversityReviews,
  addUniversityReview,
  deleteUniversityReview,
  updateUniversityReview,
} = universitySlice.actions;
export default universitySlice.reducer;
