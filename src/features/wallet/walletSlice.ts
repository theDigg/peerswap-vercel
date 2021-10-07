import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../../api/peerswapAPI";

const isClient = typeof window !== "undefined";

interface WalletState {
  wallets: Wallet[] | [];
  wallet: Wallet | null;
}

const initialState: WalletState = {
  wallets: (isClient ? JSON.parse(localStorage.getItem("wallets")) : []) || [],
  wallet:
    (isClient ? JSON.parse(localStorage.getItem("wallet")) : null) || null,
};

const walletDetails = createSlice({
  name: "walletDetails",
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<any>) {
      state.wallets = [...state.wallets, action.payload];
      isClient &&
        localStorage.setItem("wallets", JSON.stringify(state.wallets));
      state.wallet = action.payload;
      isClient && localStorage.setItem("wallet", JSON.stringify(state.wallet));
    },
    setWallet(state, action: PayloadAction<any>) {
      isClient &&
        localStorage.setItem("wallet", JSON.stringify(action.payload));
      state.wallet = action.payload;
    },
  },
});

export const { setWallet, setWallets } = walletDetails.actions;

export default walletDetails.reducer;
