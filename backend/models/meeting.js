const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const randomGenerator = require("../helpers/randomGenerator");
const meetingSchema = new Schema({
    meetingCode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:false,
        default:false
    }
});
meetingSchema.statics.createNewMeeting = async function(){
    const meeting = new Meeting({meetingCode:randomGenerator(9),password:randomGenerator(6)});
    // const meeting = new Meeting({meetingCode:"ABC",password:"pass"})
    await meeting.save();
    return meeting;
}

const Meeting = mongoose.model("meeting",meetingSchema);
module.exports = Meeting;