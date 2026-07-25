import mongoose from 'mongoose';
const lessonSchema=new mongoose.Schema({title:{type:String,required:true},videoUrl:String,duration:Number,order:Number,resources:[String]},{_id:true});
const courseSchema=new mongoose.Schema({
 title:{type:String,required:true},slug:{type:String,required:true,unique:true},description:String,category:String,level:{type:String,enum:['Beginner','Intermediate','Advanced'],default:'Beginner'},
 duration:String,fee:{type:Number,required:true,min:0},thumbnail:String,trainer:{type:mongoose.Schema.Types.ObjectId,ref:'User'},benefits:[String],
 curriculum:[{module:String,lessons:[lessonSchema]}],active:{type:Boolean,default:true},featured:{type:Boolean,default:false}
},{timestamps:true});
courseSchema.index({ active: 1, category: 1 });
export const Course=mongoose.models.Course||mongoose.model('Course',courseSchema);
