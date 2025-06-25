import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
