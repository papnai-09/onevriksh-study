import mongoose from 'mongoose';
const optionSchema=new mongoose.Schema({text:String,isCorrect:{type:Boolean,default:false}},{_id:false});
const questionSchema=new mongoose.Schema({question:{type:String,required:true},options:[optionSchema],explanation:String,marks:{type:Number,default:1}},{_id:true});
const testSchema=new mongoose.Schema({title:{type:String,required:true},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},questions:[questionSchema],duration:{type:Number,default:30},totalMarks:Number,status:{type:String,enum:['draft','active','closed'],default:'draft'},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
export const Test=mongoose.models.Test||mongoose.model('Test',testSchema);
