import jwt from 'jsonwebtoken';

const protect = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

           if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token, access denied' });
    }
      
    //extract token from header
     const token = authHeader.split(' ')[1];   //  "Bearer eyJhbGci...".split(' ')
                                              //  = ["Bearer", "eyJhbGci..."]
                                                //    [0]         [1]
  //We don't need the word "Bearer" — just the token!


    // step 3 - verify token is real and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);     //1 Was this token made with MY secret key? ✅ or ❌
                                                                // 2. Has the token expired
                                                                   
    // decoded = { id: '64abc123', role: 'user' }

    // attch user info to the reeq
     req.user= decoded;

     //then move to the acutal route
     next();


    
    }
    catch(err){
        return res.status(401).json({msg:'Token is invalid or expired'})
    }
};

export default protect;