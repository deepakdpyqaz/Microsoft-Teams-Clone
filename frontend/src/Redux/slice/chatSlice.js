import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
   messages:[],
  },
  reducers: {
    addMessage: (state,message) => {
      state.messages = [...state.messages,message];
    },
    setMessages:(state,messages)=>{
      state.messages = messages;
    },
    clearMessages:(state)=>{
      state.messages = [];
    }
  },
})

export const { addMessage,clearMessages,setMessages} = chatSlice.actions

export default chatSlice.reducer