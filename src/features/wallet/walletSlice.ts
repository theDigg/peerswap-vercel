import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../../api/peerswapAPI";

interface WalletState {
  wallets: Wallet[] | [];
  wallet: Wallet | null;
  tab: number;
}

const initialState: WalletState = {
  wallets: [],
  wallet: null,
  tab: 0,
};

const walletDetails = createSlice({
  name: "walletDetails",
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<any>) {
      state.wallets = [...state.wallets, action.payload];
      state.wallet = action.payload;
    },
    setWallet(state, action: PayloadAction<any>) {
      state.wallet = action.payload;
    },
    setTab(state, action: PayloadAction<any>) {
      state.tab = action.payload;
    },
  },
});

export const { setWallet, setWallets, setTab } = walletDetails.actions;

export default walletDetails.reducer;
