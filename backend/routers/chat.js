const ChatParticipant = require("../models/chatParticipant");
const addToRoom = async (io,socket,data)=>{
    const userId = data.userId;
    const meetingId = data.userId;
    
    const participant = await ChatParticipant.findOne({meetingId,userId});
    if(participant)
    {
        return;
    }
    socket.join(data.meetingId);
}
const sendMessage = (io,socket,data)=>{
    io.to(data.meetingId).emit("recieveMessage",data.chat);
}

module.exports = {
    addToRoom,
    sendMessage
}