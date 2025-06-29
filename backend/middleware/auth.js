// import jwt from 'jsonwebtoken';


// const authMiddleware = async (req , res,next)=>{

//     const {token } = req.headers;

//     if(!token){
//         return res.json({
//             success:false,
//             message:"not Authorised login again"
//         })
//     }

//     try{
//         const tokendecode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = tokendecode.id;
//         next();
//     }
//     catch(error){

//         console.log(error);
//         res.json({
//             success:false,
//             message:"Error"
//         })

//     }


// }


// export default authMiddleware;
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please log in again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ proper place to attach userId
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;

