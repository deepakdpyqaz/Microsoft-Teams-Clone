const express = require("express");
const authorize = require("../helpers/authorization");
const Meeting = require("../models/meeting");
const Participant = require("../models/participant")
const routers = express.Router();
const User = require("../models/user");
routers.get("/create", authorize.authorize, async (req, res) => {
    let meeting = await Meeting.createNewMeeting();
    return res.status(201).json({
        "message": "Meeting created succesfully. Click start to start the meeting",
        "meetingCode": meeting.meetingCode,
        "password": meeting.password,
        "meetingId":meeting.id
    })
});
routers.post("/join", authorize.authorize, async (req, res) => {
    const meetingCode = req.body.meetingCode;
    const password = req.body.password;
    if (!(meetingCode && password)) {
        return res.status(400).json({
            "message": "Invalid parameters"
        });
    }
    const meeting = await Meeting.findOne({
        meetingCode,
        password
    });
    if (!meeting) {
        return res.status(404).json({
            "message": "Meeting not found"
        });
    }
    return res.status(200).json({
        "status": "success",
        "message": "Success",
        "meetingId": meeting.id
    });

})
routers.get("/participants",async (req,res)=>{
    const meetingId = req.query.meetingId;
    if(!meetingId)
    {
        return res.status(400).send({"message":"Invalid parameters"});
    }
    const meeting = await Meeting.findById(meetingId);
    if(!meeting){
        return res.status(404).send({"message":"Meeting not found"});
    }
    const participants = await Participant.find({meetingId:meeting.id});
    const particpantsDetails = [];
    for(let participant of participants)
    {
        let user = await User.findById({userId:participant.userId});
        if(user.id != req.user.id && participant.socketId!=null)
        {
            let participantDetails = {"socketId":participant.socketId,"email":user.email};
            particpantsDetails.push(participantDetails);
        }
    }
    return res.status(200).send({"participants":particpantsDetails});
})
const addCandidate = async (io,socket, data) => {
    const meetingId = data.meetingId;
    const userDetails = data.userDetails;
    if(!(meetingId && userDetails.email))
    {
        return;
    }
    const meeting = await Meeting.findById(meetingId);
    if(!meeting){
        return;
    }
    const user = await User.findOne({email:userDetails.email});

    const participants = await Participant.find({meetingId:meeting.id});
    const participantsDetails = [];
    for(let participant of participants)
    {

        let participantUser = await User.findById(participant.userId);
        if(participantUser.email!=user.email)
        {
            let participantDetails = {email:participantUser.email,socketId:participant.socketId};
            participantsDetails.push(participantDetails);
        }
    }
    const participant = new Participant({meetingId:meeting.id,userId:user.id,socketId:socket.id});
    await participant.save();
    io.to(socket.id).emit("sendCallRequests",{"participants":participantsDetails});
}
const disconnectMe = async (io,socket,data) =>{
    const userId = data.userId;
    const email = data.email;
    const meetingId = data.meetingId;
    const participants = await Participant.find({meetingId});
    for(let participant of participants)
    {
        if(participant.userId!=userId)
        {
            io.to(participant.socketId).emit("candidateLeft",{email});
        }
    }

}
const callRequest = async (io,socket,data) => {
    io.to(data.toUser).emit("makeCall",{callId:data.callId,user:data.user,socketId:socket.id});
}
module.exports = {
    routers,
    callRequest,
    addCandidate,
    disconnectMe,
}