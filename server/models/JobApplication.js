const mongoose=require('mongoose');

const jobApplicationSchema=new mongoose.Schema({
    job_id:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    positionApplied:{
        type:String,
        required:true,
    },
    coverLetter:{
        type:String,
        required:true,
    },
    interviewDate:{
        type:Date,
    },
    resume:{
        type:String,
        required:true,

    },
});
const jobApplication=mongoose.model('JobApplication',jobApplicationSchema);
module.exports=jobApplication