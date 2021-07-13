const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const randomGenerator = require("../helpers/randomGenerator");
const participantSchema = new Schema({
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


const Participant = mongoose.model("participant",participantSchema);
module.exports = Participant;