import mongoose from 'mongoose';
const leadSchema=new mongoose.Schema({kind:{type:String,enum:['demo','contact'],required:true},name:{type:String,required:true},email:String,phone:String,course:String,subject:String,message:String,status:{type:String,enum:['new','contacted','converted','closed'],default:'new'}},{timestamps:true});
export const Lead=mongoose.models.Lead||mongoose.model('Lead',leadSchema);
