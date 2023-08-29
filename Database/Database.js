import mongoose from "mongoose";

const Connect = async()=>
{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017",{
            dbName:"MyECommerce"
        })
        console.log("DataBase Connected Succesfully");
    } catch (error) {
        console.log(error)
    }
}
export default Connect;