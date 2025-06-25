import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import universityReducer from "../features/university/universitySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    university: universityReducer,
  },
});

export default store;
