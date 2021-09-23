import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  body: string
  handle: string
  timestamp: number
}

interface MessagesState {
  chats: {[alias: string]: Message[]},
  recentMessages: {[alias: string]: Message}
}

const initialState: MessagesState = {
  chats: {},
  recentMessages: {}
}

const messageDetails = createSlice({
  name: 'messageDetails',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<any>) {
      state.chats = action.payload
      Object.keys(state.chats).forEach(handle => {
        let message = state.chats[handle][state.chats[handle].length - 1]
        state.recentMessages[handle] = message
      })
    },
  },
})

export const { setChats } = messageDetails.actions

export default messageDetails.reducer