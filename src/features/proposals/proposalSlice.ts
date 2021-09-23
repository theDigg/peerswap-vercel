import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Accounts, queryLatestProposals } from '../../api/peerswapAPI'
import { AppThunk } from '../../app/store'

interface ProposalsState {
  proposals: Accounts.Proposal[]
  error: string | null
}

const initialState: ProposalsState = {
  proposals: [],
  error: null,
}

const proposalDetails = createSlice({
  name: 'proposalDetails',
  initialState,
  reducers: {
    setProposals(state, action: PayloadAction<any>) {
      state.proposals = action.payload
      state.error = null
    },
    setProposalsError(state, action: PayloadAction<any>) {
      state.proposals = []
      state.error = action.payload
    },
  },
})

export const { setProposals, setProposalsError } = proposalDetails.actions

export default proposalDetails.reducer

export const fetchProposals = (): AppThunk => async (dispatch) => {
  try {
    const proposals = await queryLatestProposals()
    // console.log(proposals)
    dispatch(setProposals(proposals))
  } catch (err: any) {
    dispatch(setProposalsError(err.toString()))
  }
}
