import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { PeopleState } from "../../../types";
import { RootState } from "../../store";

const initialState: PeopleState = {
  peopleLoading: true,
  people: [],
};

// Get all users
export const getPeople = createAsyncThunk("people/get", async () => {
  try {
    const response = await axios.get(`${apiUrl}/user`);
    if (response.data.success) {
      return { people: response.data.people };
    }
  } catch (error) {
    console.log(error);
  }
});

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPeople.pending, (state) => {
        state.peopleLoading = true;
      })
      .addCase(getPeople.fulfilled, (state, action) => {
        state.peopleLoading = false;
        state.people = action.payload?.people;
      })
      .addCase(getPeople.rejected, (state) => {
        state.peopleLoading = false;
        state.people = [];
      });
  },
});

export const selectPeople = (state: RootState) => state.people;

export default peopleSlice.reducer;
