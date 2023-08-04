import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, validate } from "../../utils/tokens";
/**
 * TokenSlice is the only place where you can write to localStorage,
 * getting from localStorage is fine elsewhere.
 */

export type Token = {
  access_token: string;
  expires_in: number;
  created_at: string;
};

const emptyToken: Token = {
  access_token: "",
  expires_in: 0,
  created_at: Date(),
};

type TokensState = {
  tokens: { [key: string]: Token };
  status: "idle" | "validating" | "refreshing" | "validated" | "failed";
  error: string | undefined;
};

let initialState: TokensState = {
  tokens: {},
  status: "idle",
  error: undefined,
};

initialState.tokens = getFromLocalStorage();

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    erase: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((service) => {
        delete state.tokens[service];
        localStorage.removeItem(`${service}-access-token`);
        console.log(`erase ${service} from tokens slice`);
      });
    },
    write: (state, action: PayloadAction<any>) => {
      // assuming payload looks like
      // {
      //   spotify: {
      //      access_token: 'thing',
      //      expires_in: "thing",
      //      created_at: "thing"
      //      }
      // }
      // this is why you type!
      console.log("did i write?");
      const tokens = action.payload;
      for (const service in tokens) {
        state.tokens[service] = tokens[service];
        localStorage.setItem(
          `${service}-access-token`,
          JSON.stringify(tokens[service]),
        );
        console.log(`write ${service} into tokens slice`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateTokens.pending, (state, action) => {
        state.status = "validating";
        console.log("validating");
      })
      .addCase(validateTokens.fulfilled, (state, action) => {
        state.status = "validated";
        state.tokens = action.payload;
        console.log("Validated thing");
        for (const service in state.tokens) {
          localStorage.setItem(
            `${service}-access-token`,
            JSON.stringify(state.tokens[service]),
          );
        }
      })
      .addCase(validateTokens.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("failure");
      });
  },
});

export const validateTokens = createAsyncThunk(
  "tokens/validateTokens",
  async (services: string[], { getState }) => {
    // TODO: find out how to type this
    const { tokens: state }: any = getState() as TokensState;
    const result = await validate(services, state);
    return result;
  },
);

export const selectTokens = (state: TokensState) => state.tokens;

export const { erase, write } = tokensSlice.actions;

export default tokensSlice.reducer;
