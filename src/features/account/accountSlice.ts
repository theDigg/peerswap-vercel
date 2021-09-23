import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Accounts } from "../../api/peerswapAPI";

interface AccountState {
  account: Accounts.User | null;
}

const initialState: AccountState = {
  account: JSON.parse(localStorage.getItem("account")),
};

const accountDetails = createSlice({
  name: "accountDetails",
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<any>) {
      state.account = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload));
    },
  },
});

export const { setAccount } = accountDetails.actions;

export default accountDetails.reducer;
