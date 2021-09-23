import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArchiverState {
  archiver: {
    ip: string;
    port: number;
  };
}

const initialState: ArchiverState = {
  archiver: JSON.parse(localStorage.getItem("archiver")) || {
    ip: "localhost",
    port: 4000,
  },
};

const archiverDetails = createSlice({
  name: "archiverDetails",
  initialState,
  reducers: {
    setArchiver(state, action: PayloadAction<any>) {
      state.archiver = { ip: action.payload.ip, port: action.payload.port };
      localStorage.setItem("archiver", JSON.stringify(state.archiver));
    },
  },
});

export const { setArchiver } = archiverDetails.actions;

export default archiverDetails.reducer;
