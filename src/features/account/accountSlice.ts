import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Accounts } from "../../api/peerswapAPI";

const isClient = typeof window !== "undefined";

interface AccountState {
  account: Accounts.User | null;
}

const initialState: AccountState = {
  account: isClient && JSON.parse(localStorage.getItem("account")),
};

const accountDetails = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<any>) {
      state.account = action.payload;
      isClient && localStorage.setItem("account", JSON.stringify(action.payload));
    },
  },
});

export const { setAccount } = accountDetails.actions;

export default accountDetails.reducer;
