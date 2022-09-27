// import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

// export default configureStore({
//   reducer: {
//     userStore: usersReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice";

export default configureStore({
  reducer: {
    playground: productReducer,
    userStore: usersReducer,
  },
});
