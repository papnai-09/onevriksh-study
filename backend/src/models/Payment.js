import mongoose from 'mongoose';
const paymentSchema=new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:true},amount:{type:Number,required:true},currency:{type:String,default:'INR'},status:{type:String,enum:['pending','paid','failed','refunded'],default:'pending'},method:String,razorpayOrderId:String,razorpayPaymentId:String,razorpaySignature:String,receipt:String,paidAt:Date},{timestamps:true});
paymentSchema.index({ student: 1, createdAt: -1 });
export const Payment=mongoose.models.Payment||mongoose.model('Payment',paymentSchema);
