import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
   user:null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    login: (state,userDetails) => {
      state.user = userDetails;
    },
  },
})

export const { logout, login} = authSlice.actions

export default authSlice.reducer