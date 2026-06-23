import mongoose from 'mongoose';
const materialSchema=new mongoose.Schema({title:{type:String,required:true},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},module:String,type:{type:String,enum:['pdf','assignment','video','zip','link'],default:'pdf'},url:{type:String,required:true},size:Number,uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
export const StudyMaterial=mongoose.models.StudyMaterial||mongoose.model('StudyMaterial',materialSchema);
