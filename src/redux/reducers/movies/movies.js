import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    },
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
