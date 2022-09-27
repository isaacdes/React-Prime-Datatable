import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  past: [],
  present: [],

  originalData: [],

  changesDone: false,
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
      // state.previousState.users = action.payload;
      // state.previousState.changesDone = true;

      state.past.push(state.present);
      state.present = action.payload;
      state.changesDone = true;
    },
    undo: (state) => {
      const len = state.past.length;

      let data = [];

      state.past[len - 1].map((i) => data.push(i));
      state.present = data;
      state.past.pop();
    },
    savechanges: (state) => {
      // state.currentState.users = state.previousState.users;
      // state.previousState.changesDone = false;
      state.past = [];
      state.originalData = state.present;
      state.changesDone = false;
    },
    deleteRow: (state, action) => {
      // state.past.push(state.present);
      state.present = state.present.filter(
        (val) => val.id !== action.payload.id
      );
      state.past = [];
      state.originalData = state.present;
      // state.changesDone = false;
      
    },
    deleteMultipleRows: (state, action) => {
      // state.past.push(state.present);
      // let data = undefined;
      action.payload.map((item) => {
        return (state.present = state.present.filter(
          (val) => val.id !== item.id
        ));
      });
      state.past = [];
      state.originalData = state.present;
      // state.changesDone = false;
    },

    resetChanges: (state) => {
      state.past = [];
      state.present = state.originalData;
      state.changesDone = false;
    },
    
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.currentState.users = action.payload;
      // state.previousState.users = action.payload;

      state.present = action.payload;
      state.originalData = action.payload;
    });
  },
});
export const {
  updateUser,
  resetChanges,
  savechanges,
  undo,
  deleteRow,
  deleteMultipleRows,
} = userSlice.actions;
export { fetchUsers };
export default userSlice.reducer;
