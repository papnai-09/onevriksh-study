import mongoose from 'mongoose';
const noticeSchema=new mongoose.Schema({title:{type:String,required:true},body:{type:String,required:true},type:{type:String,default:'general'},audience:{type:String,enum:['all','students','course'],default:'all'},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},published:{type:Boolean,default:true},publishedAt:{type:Date,default:Date.now},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
export const Notice=mongoose.models.Notice||mongoose.model('Notice',noticeSchema);
