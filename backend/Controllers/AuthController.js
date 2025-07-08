const UserModel = require("../Models/User");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const signup = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user =await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:"User already exist,you can login",success:false});
        }
        let userModel = new UserModel({name,email,password})
        userModel.password = await bcrypt.hash(password,10)
        await userModel.save();
        res.status(201).json({message:"signup sucessfull",success:true})
    }catch(err){
        res.status(500).json({message:"Internal server error",success:false})
    }
}

const login = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user =await UserModel.findOne({email});
        const errormsg = "Auth failed email or passowrd is wrong";
        if(!user){
            return res.status(403).json({message:errormsg,success:false});
        }
        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword){
             return res.status(403).json({message:errormsg,success:false});
        }

        const jwtoke = jwt.sign({email: user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        res.status(201).json({
            message:"Login sucessfull",
            success:true,
            jwtoke,
            email,
            name:user.name
        })
    }catch(err){
        res.status(500).json({message:"Internal server error",success:false})
    }
}

module.exports={signup,login}