import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  phone:{type:String,trim:true}, password:{type:String,required:true,select:false}, role:{type:String,enum:['student','admin'],default:'student'},
  profileImage:String, studentId:{type:String,unique:true,sparse:true}, address:String, dateOfBirth:Date,
  active:{type:Boolean,default:true}, resetPasswordToken:String, resetPasswordExpires:Date
},{timestamps:true});
userSchema.pre('save',async function(next){if(!this.isModified('password'))return next();this.password=await bcrypt.hash(this.password,12);next()});
userSchema.methods.comparePassword=function(value){return bcrypt.compare(value,this.password)};
export const User=mongoose.models.User||mongoose.model('User',userSchema);
