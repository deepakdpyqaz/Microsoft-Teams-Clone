import { createSlice } from '@reduxjs/toolkit'

export const meetSlice = createSlice({
  name: 'meet',
  initialState: {
   meetingCode:null,
   password:null,
   meetingId:null,
   selfStream:null,
   participants:[],
   videoRefs:[],
  },
  reducers: {
    setMeeting: (state,data)=>{
      state.meetingCode = data.payload.meetingCode;
      state.password = data.payload.password;
      state.meetingId = data.payload.meetingId;
    },
    setSelfStream: (state,stream)=>{
      state.selfStream = stream;
    },
    addParticipant: (state,participant) => {
      state.participants = [...state.participants,participant];
    },
    setParticipants: (state,participants) => {
      state.participants = participants;
    },
    addVideoRef: (state,videoRef)=>{
      state.videoRefs = [...state.videoRefs,videoRef];
    },
    clearData:(state)=>{
      state.meetingCode=null;
      state.password=null;
      state.meetingId=null;
      state.selfStream=null;
      state.participants=[];
      state.videoRefs=[];
    }
  },
})

export const {setMeeting, setSelfStream,setParticipants,addParticipant,addVideoRef,clearData} = meetSlice.actions

export default meetSlice.reducer