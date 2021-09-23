import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Accounts } from '../../api/peerswapAPI'

interface SwapsState {
  swaps: Accounts.Swap[]
  mySwaps: Accounts.Swap[]
  filteredSwaps: Accounts.Swap[]
  filters: {
    swapType: string
    swapStatus: string
    tags: string[]
  }
  error: string | null
}

const initialState: SwapsState = {
  swaps: [],
  mySwaps: [],
  filteredSwaps: [],
  filters: {
    swapType: 'all',
    swapStatus: 'all',
    tags: [],
  },
  error: null,
}

const swapDetails = createSlice({
  name: 'swapDetails',
  initialState,
  reducers: {
    setSwaps(state, action: PayloadAction<any>) {
      state.swaps = action.payload
      state.error = null
    },
    setMySwaps(state, action: PayloadAction<any>) {
      state.mySwaps = action.payload
      state.error = null
    },
    setFilters(state, action: PayloadAction<any>) {
      state.filters = action.payload
      state.filteredSwaps = state.swaps.filter((swap) => {
        if (state.filters.swapType !== 'all') {
          if (swap.swapType !== state.filters.swapType) return false
        }
        if (state.filters.swapStatus !== 'all') {
          if (swap.status !== state.filters.swapStatus) return false
        }
        if (
          state.filters.tags.some((tag) => {
            if (swap?.tokenOffered?.toLowerCase().includes(tag?.toLowerCase()))
              return true
            if (
              swap?.tokenRequested?.toLowerCase().includes(tag?.toLowerCase())
            ) {
              return true
            } else {
              return false
            }
          }) || state.filters.tags.length === 0
        )
          return true
        else {
          return false
        }
      })
    },
  },
})

export const { setSwaps, setMySwaps, setFilters } = swapDetails.actions

export default swapDetails.reducer
