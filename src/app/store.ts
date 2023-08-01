import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from "../features/tokens/tokensSlice";

export default configureStore({
    reducer: {
        tokens: tokensReducer
    }
});