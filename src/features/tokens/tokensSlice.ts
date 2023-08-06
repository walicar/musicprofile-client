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

export type Tokens = {
  [key: string]: Token;
};

export type TokensState = {
  token_collection: Tokens;
  status: "idle" | "validating" | "refreshing" | "validated" | "failed";
  error: string | undefined;
};

let initialState: TokensState = {
  token_collection: {},
  status: "idle",
  error: undefined,
};

initialState.token_collection = getFromLocalStorage();

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    erase: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((service) => {
        delete state.token_collection![service];
        localStorage.removeItem(`${service}-access-token`);
        console.log(`erase ${service} from tokens slice`);
      });
    },
    write: (state, action: PayloadAction<Tokens>) => {
      // assuming payload looks like
      // {
      //   spotify: {
      //      access_token: 'thing',
      //      expires_in: "thing",
      //      created_at: "thing"
      //      }
      // }
      const tokens = action.payload;
      console.log("did i write", tokens);
      for (const service in tokens) {
        state.token_collection[service] = tokens[service];
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
        console.log("validated");
        console.log(action.payload);
        if (!action.payload.length) {
          console.log("payload length == 0");
          return;
        };
        state.token_collection = action.payload;
        for (const service in state.token_collection) {
          localStorage.setItem(
            `${service}-access-token`,
            JSON.stringify(state.token_collection[service]),
          );
          console.log(`vaidation changed ${service}`);
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
    const { tokens }: any = getState();
    console.log(tokens);
    const result = await validate(services, tokens.token_collection);
    return result;
  },
);

export const selectTokenCollection = (state: any) =>
  state.tokens.token_collection;

export const { erase, write } = tokensSlice.actions;

export default tokensSlice.reducer;
