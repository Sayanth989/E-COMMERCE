// const adminOnly = (req,res,next)=>{

//     if(req.user.role != 'admin'){
//         return res.this.state(403).json({msg:'acces denied ,admin only'})
//     }

//  next();

// }
// module.exports= adminOnly;
const adminOnly = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({msg:'access denied admin only'})
    }
    next();
}

export default  adminOnly;