import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import meetReducer from './slice/meetSlice';
import chatReducer from './slice/chatSlice';
export default configureStore({
  reducer: {
      auth:authReducer,
      meet:meetReducer,
      chat:chatReducer
  },
})