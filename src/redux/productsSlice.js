import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { playGroundConstants } from "../components/data";

const initialState = {
  currentData: {
    selectedData: [],
    defaultData: [],
    statuses: [],
    selectedProducts: [],
  },
  orginalData: {
    selectedData: [],
    defaultData: [],
    statuses: [],
    selectedProducts: [],
  },
  history: [],
  count: 0,
  columnDensity: null,
};

const columnDensity = createAsyncThunk("saveDensity", async () => {
  // const resopnse = api call
  // return response
});

const getResponse = createAsyncThunk("getData", async () => {
  //Write the logic of gettind the response
  //Eg:
  // const response = Products.get()
  // return (response.isSomethig.data) the actual data here
  const response = playGroundConstants.tableData;
  console.log(response);
  return response;
});

export const productSlice = createSlice({
  name: "playground",
  initialState,
  reducers: {
    //we can add operations her later
    addrow: (state) => {
      const len = state.currentData.defaultData?.length;
      state.count = len;
      state.currentData.defaultData[len] = {
        // id:len,
        item_nr: "All",
        customer_nr: "All",
        "Shipto application": "All",
        "Shipto country": "All",
        "Plant City": "All",
        "Delivery Month": "All",
        "Customer Group": "All",
        "Item Genus": "All",
        "Envelope adjustment": "0",
        Adder: "0",
        Multiplier: "1",
        "Override floor": "NA",
        "Min Floor": "NA",
        Inflation: "1",
        "Modified Floor": "Non editable",
        "Modified Target": "Non editable",
        "Modified Expert": "Non editable",
        "No of Impact Guidance": "Non editable",
      };
    },
    undo: (state) => {},
    onRowEdit: (state, action) => {
      let temp = [...state.currentData.defaultData];
      let { newData, index } = action.payload;
      temp[index] = newData;
      state.currentData.defaultData = temp;
    },

    selectedProductChange: (state, action) => {
      state.currentData.selectedProducts = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getResponse.fulfilled, (state, action) => {
      // state.products = action.payload;
      state.orginalData.defaultData = action.payload.defaultData;
      state.orginalData.selectedData = action.payload.selectedData;
      state.orginalData.statuses = action.payload.statuses;

      // state.currentData = action.payload;
      state.currentData = state.orginalData;
    });
    builder.addCase(columnDensity.fulfilled, (state, action) => {
      state.columnDensity = action.payload;
    });
  },
});
export const { addrow, onRowEdit, selectedProductChange } =
  productSlice.actions;
export default productSlice.reducer;
export { getResponse };
