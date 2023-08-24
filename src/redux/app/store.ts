import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "@tokens/tokensSlice";

export default configureStore({
  reducer: {
    tokens: tokensReducer,
  },
});
