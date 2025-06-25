import { createSelector } from "reselect";

// base selector
const selectUniversityReviews = (state) => state.university.universityReviews;

//memoized selector (returns the original array unless it changes)
export const getSortedUniversityReviews = createSelector(
  [selectUniversityReviews],
  (reviews) => {
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
);
