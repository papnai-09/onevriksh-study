import mongoose from 'mongoose';
const resultSchema=new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},test:{type:mongoose.Schema.Types.ObjectId,ref:'Test',required:true},answers:[{questionId:mongoose.Schema.Types.ObjectId,selectedOption:Number}],score:Number,totalMarks:Number,percentage:Number,rank:Number,feedback:String,submittedAt:{type:Date,default:Date.now}},{timestamps:true});
export const Result=mongoose.models.Result||mongoose.model('Result',resultSchema);
