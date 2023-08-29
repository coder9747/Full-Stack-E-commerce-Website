import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    number:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const UserModel = new mongoose.model("users",UserSchema);
export default UserModel;