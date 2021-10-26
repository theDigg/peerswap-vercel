import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../../api/peerswapAPI";

interface WalletState {
  wallets: Wallet[] | [];
  wallet: Wallet | null;
}

const initialState: WalletState = {
  wallets: [],
  wallet: null,
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
  },
});

export const { setWallet, setWallets } = walletDetails.actions;

export default walletDetails.reducer;
