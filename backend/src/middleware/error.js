export function notFound(req,res){res.status(404).json({message:'Route not found'})}
export function errorHandler(error,req,res,next){
 const status=error.status||error.statusCode||500;
 const payload={message:status===500?'Something went wrong':error.message};
 if(process.env.NODE_ENV==='development')payload.stack=error.stack;
 res.status(status).json(payload);
}
