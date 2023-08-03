import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, validate } from "../../utils/tokens";

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
        state.tokens[service] = emptyToken;
        localStorage.removeItem(`${service}-access-token`);
        console.log("erase from tokens slice");
      });
    },
    stubWrite: (state, action: PayloadAction<string[]>) => {
      // ignore this, is formatted wrong, this is just a stub
      action.payload.forEach((service) => {
        state.tokens[service] = {
          access_token: "fart",
          expires_in: 1,
          created_at: Date(),
        };
        localStorage.setItem(`${service}-access-token`, JSON.stringify(state.tokens[service]));
        console.log(`wrote a token for ${service}`);
      });
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
          localStorage.setItem(`${service}-access-token`, JSON.stringify(state.tokens[service]));
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
    const result = await validate(services, state)
    console.log("Tokens we validated", result);
    return result;
  }
);


export const selectTokens = (state: TokensState) => state.tokens;

export const { erase, stubWrite } = tokensSlice.actions;

export default tokensSlice.reducer;
