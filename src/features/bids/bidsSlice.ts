import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Accounts } from '../../api/peerswapAPI'

interface BidsState {
  bids: Accounts.Bid[]
  myBids: Accounts.Bid[]
  error: string | null
}

const initialState: BidsState = {
  bids: [],
  myBids: [],
  error: null,
}

const bidDetails = createSlice({
  name: 'bidDetails',
  initialState,
  reducers: {
    setBids(state, action: PayloadAction<any>) {
      state.bids = action.payload
      state.error = null
    },
    setMyBids(state, action: PayloadAction<any>) {
      state.myBids = action.payload
      state.error = null
    },
  },
})

export const { setBids, setMyBids } = bidDetails.actions

export default bidDetails.reducer
