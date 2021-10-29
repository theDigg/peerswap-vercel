import { combineReducers } from '@reduxjs/toolkit'

import walletReducer from "../features/wallet/walletSlice";
import accountReducer from "../features/account/accountSlice";
import swapsReducer from "../features/swaps/swapsSlice";
import bidsReducer from "../features/bids/bidsSlice";
import proposalsReducer from "../features/proposals/proposalSlice";
import messagesReducer from "../features/messages/messagesSlice";
import archiverReducer from "../features/archiver/archiverSlice";
import themeReducer from "../features/theme/themeSlice";
import editorReducer from "../features/editor/editorSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  account: accountReducer,
  swaps: swapsReducer,
  bids: bidsReducer,
  proposals: proposalsReducer,
  messages: messagesReducer,
  archiver: archiverReducer,
  theme: themeReducer,
  editor: editorReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
