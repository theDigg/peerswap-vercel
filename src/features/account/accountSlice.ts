import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Accounts } from "../../api/peerswapAPI";

interface AccountState {
  account: Accounts.User | null;
}

const initialState: AccountState = {
  account: null
};

const accountDetails = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<any>) {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = accountDetails.actions;

export default accountDetails.reducer;
