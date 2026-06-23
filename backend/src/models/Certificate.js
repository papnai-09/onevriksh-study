import mongoose from 'mongoose';
const certificateSchema=new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},certificateNumber:{type:String,required:true,unique:true},certificateUrl:String,issuedAt:{type:Date,default:Date.now},verified:{type:Boolean,default:true}},{timestamps:true});
export const Certificate=mongoose.models.Certificate||mongoose.model('Certificate',certificateSchema);
