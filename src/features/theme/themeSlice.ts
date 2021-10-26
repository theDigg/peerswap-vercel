import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: "dark",
};

const themeDetails = createSlice({
  name: "themeDetails",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<any>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeDetails.actions;

export default themeDetails.reducer;

// Updated the react frontend to utilize and display the new types for swap data

// Updated the swap submission form using radio buttons and checkboxes for the swapTypes and (fixed vs float)

// Updated the bid submission form and display for the bids under the swap card component

// Working on a feature to display swap data based on a query so you can find and filter further for swaps that fit a certain criteria.

// Updating layout structure so that the sidebar is collapsable but you can still see the navigation icons

// Code splitting for minimizing bundle size on initial render

// Push notifications for messages and swap updates / events like bids contracts, and receipts.

// Push notifications for a new swap that fits a criteria set by the user

// Dark mode theme
