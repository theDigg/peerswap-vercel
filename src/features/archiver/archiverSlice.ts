import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArchiverState {
  archiver: {
    ip: string;
    port: number;
  };
}

const initialState: ArchiverState = {
  archiver: {
    ip: "www.peerswap.org",
    port: 4000,
  },
};

const archiverDetails = createSlice({
  name: "archiverDetails",
  initialState,
  reducers: {
    setArchiver(state, action: PayloadAction<any>) {
      state.archiver = { ip: action.payload.ip, port: action.payload.port };
    },
  },
});

export const { setArchiver } = archiverDetails.actions;

export default archiverDetails.reducer;
