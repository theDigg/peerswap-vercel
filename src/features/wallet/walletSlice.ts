import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../../api/peerswapAPI";

interface WalletState {
  wallets: Wallet[] | [];
  wallet: Wallet | null;
}

const initialState: WalletState = {
  wallets: JSON.parse(localStorage.getItem("wallets")) || [],
  wallet: JSON.parse(localStorage.getItem("wallet")) || null,
};

const walletDetails = createSlice({
  name: "walletDetails",
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<any>) {
      state.wallets = [...state.wallets, action.payload];
      localStorage.setItem("wallets", JSON.stringify(state.wallets));
      state.wallet = action.payload;
      localStorage.setItem("wallet", JSON.stringify(state.wallet));
    },
    setWallet(state, action: PayloadAction<any>) {
      localStorage.setItem("wallet", JSON.stringify(action.payload));
      state.wallet = action.payload;
    },
  },
});

export const { setWallet, setWallets } = walletDetails.actions;

export default walletDetails.reducer;
