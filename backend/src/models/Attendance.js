import mongoose from 'mongoose';
const attendanceSchema=new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},date:{type:Date,default:Date.now},status:{type:String,enum:['present','absent','late','excused'],default:'present'},method:{type:String,enum:['manual','qr'],default:'manual'},sessionCode:String,markedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}},{timestamps:true});
attendanceSchema.index({ student: 1, date: -1 });
export const Attendance=mongoose.models.Attendance||mongoose.model('Attendance',attendanceSchema);
