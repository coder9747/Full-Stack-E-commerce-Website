import UserModel from "../Schema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser = async(req,res)=>
{
    try {
        const {name,number,password,passwordConfirm} = req.body;
        switch(true)
        {
            case !name:{
                res.send({succes:false,message:"Name is Required"});
                return;
            }
            case !number:{
                res.send({succes:false,message:"Number is Required"});
                return;
            }
            case !password:{
                res.send({succes:false,message:"Password is Required"});
                return;
            }
            case !passwordConfirm:{
                res.send({succes:false,message:"Password Confirm Required"});
                return;
            }
        }
        try {
            //search for existing user
            const isUser = await UserModel.findOne({number});
            if(!isUser)
            {
                //if user is new then
                //we should check both password match or not;
                if(password===passwordConfirm)
                {
                    //now finaly we can register user
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password,salt);
                    const user = new UserModel({name,number,password:hash});
                    await user.save();
                    //generating token 
                    const token =  jwt.sign({userId:user._id},process.env.PRIVATE_KEY);
                    res.send({
                        succes:true,
                        message:"User Registered Succesful",
                        token,
                    })
                }
                else
                {
                    res.send({succes:false,message:"Both Password Should Be same"})
                }
            }
            else
            {
                res.send({succes:false,message:"Number Already Registered"});
            }
            

        } catch (error) {
            console.log(error)
            res.send({
                succes:false,
                message:"Something Went Wrong"
            })
        }

        
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:"Something Wrong Database"})
    }
}
export const loginUser = async(req,res)=>
{
    try {
        const {number,password} = req.body;
        if(number && password)
        {
            //find user;
            const user = await UserModel.findOne({number});
            if(user)
            {
                //now we check password is correct or not;
                const verify = await bcrypt.compare(password,user.password);
                if(verify)
                {
                    //generatig token;
                    const token = jwt.sign({userId:user._id},process.env.PRIVATE_KEY);
                    res.send({
                        succes:true,
                        message:"Succes",
                        token,
                    })
                }
                else
                {
                    res.send({
                        succes:false,
                        message:"Password is Not Correct",
                    })
                }
            }
            else
            {
                res.send({
                    succes:false,
                    message:"Number is not Registered",
                })
            }
        }
        else
        {
            res.send({
                succes:false,
                message:"Invalid Creditential",
            })
        }
        
    } catch (error) {
        res.send({
            succes:false,
            message:"Something Went Wrong"
        })
    }
}