const { default: mongoose } = require("mongoose");


const meetingschema = new mongoose.Schema({

    user_id:{type:String},
    meetingcode:{type:String,required:true},
    date:{type:Date, default:Date.now , required:true}
})

const meeting = mongoose.model("meeting",meetingschema);

module.exports = meeting;