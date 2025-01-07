// import userModel from "../model/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator"




// // login user
// const loginUser = async (req, res)=>{


//     const{email,password} = req.body;

//     try{
//          const user = await userModel.findOne({email});

//          if(!user){
//             res.json({
//                 success:false,
//                 message:"User does not exist"
//             })
//          }


//          const isMatch =await  bcrypt.compare(password,user.password);

//          if(!isMatch){
//             res.json({
//                 success:false,
//                 message:"Invalid Credentials"
//             })
//          }

//          const token = createToken(user._id);
//          res.json({
//             success:true,
//             token
//          })
//     }
//     catch(error){

//         console.log(error);
//         res.json({
//             success:false,
//             message:"error"
//         })


//     }



// }


// const createToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }


// // register user
// const registerUser = async (req, res)=>{

//     const{name,password,email}= req.body;
   
//     try{

//         const exist = await userModel.findOne({email});

//         if(exist){
//             return res.json({
//                 success:false,
//                 message:"User Already Existed"
//             });
//         }

//         if(!validator.isEmail(email)){
//             return res.json({
//                 sucess:false,
//                 message:"Please enter valid email"
//             })
//         }


//         if(password.length<8){
//             return res.json({
//                 success:false,
//                 message:"Please enter strong password"
//             })
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password,salt);

//         const newUser = new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword,

//         })

//         const user = await newUser.save();
//         const token = createToken(user._id);
//         res.json({
//             success:true,
//             token
//         })

//     }catch(error){
//           console.log(error);
//           res.json({
//             success:false,
//             message:"error"
//           })

//     }
// }


// export {loginUser,registerUser};


import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token valid for 7 days
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        // Generate JWT token
        const token = createToken(user._id);
        return res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);
        return res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "An error occurred during registration",
        });
    }
};

export { loginUser, registerUser };
