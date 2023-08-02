import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  refreshHandlerSTUB,
  saveRefreshTokenSTUB,
  isExpiredSTUB,
} from "../../components/stubs/reduxTokenStubs";
import { isExpired } from "../../utils/tokens";

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

const initialState: TokensState = {
  tokens: {},
  status: "idle",
  error: undefined,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    erase: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((service) => {
        state.tokens[service] = emptyToken;
        localStorage.removeItem(service);
        console.log("erase from tokens slice");
      });
    },
    stubWrite: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((service) => {
        state.tokens[service] = {
          access_token: "fart",
          expires_in: 1,
          created_at: Date(),
        };
        localStorage.setItem(service, JSON.stringify(state.tokens[service]));
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
        for (const key in state.tokens) {
          localStorage.setItem(key, JSON.stringify(state.tokens[key]));
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
    const result = await helper(services, state)
    console.log(result);
    return result;
  }
);

// for each service requested,
// if their respective token has expired,
// - get a refreshed token
// - store the refresh_token in DB
// - update access_token in Redux
const helper = async (services: string[], state: any) => {
  // TODO: find out how to type this
  let refreshedTokens: any = {};
  for (const service of services) {
    if (state.tokens[service] && isExpired(state.tokens[service])) {
      const data = await refreshHandlerSTUB[service]();
      await saveRefreshTokenSTUB(data.refresh_token);
      const newToken: Token = {
        access_token: data.access_token,
        expires_in: data.expires_in,
        created_at: Date(),
      };
      const thing = { ...refreshedTokens, [service]: newToken };
      refreshedTokens = thing;
    }
    return refreshedTokens;
  }
};

export const selectTokens = (state: TokensState) => state.tokens;

export const { erase, stubWrite } = tokensSlice.actions;

export default tokensSlice.reducer;
