const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatParticipantSchema = new Schema({
    meetingId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        required:false,
        default:false
    }
});


const ChatParticipant = mongoose.model("chatparticipant",chatParticipantSchema);
module.exports = ChatParticipant;