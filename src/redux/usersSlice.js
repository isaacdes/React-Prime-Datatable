import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  previousState: {
    users: [],
    changesDone: false,
  },
  currentState: {
    users: [],
  },
};

const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  let data = [];
  for (let i = 0; i < 1; i++) {
    response.data.map((item) => {
      return data.push(item);
    });
  }

  return data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.previousState.users = action.payload;
      state.previousState.changesDone = true;
    },
    resetChanges: (state) => {
      state.previousState.users = state.currentState.users;
      state.previousState.changesDone = false;
    },
    savechanges: (state) => {
      state.currentState.users = state.previousState.users;
      state.previousState.changesDone = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.currentState.users = action.payload;
      state.previousState.users = action.payload;
    });
  },
});
export const { updateUser, resetChanges, savechanges } = userSlice.actions;
export { fetchUsers };
export default userSlice.reducer;
