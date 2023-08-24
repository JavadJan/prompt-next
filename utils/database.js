import mongoose from "mongoose";
var isConnected = false

export const ConnectedToDB = async ()=>{
    mongoose.set('strictQuery' , true)
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected=true
        console.log('connected to db!')
    } catch (error) {
        console.log(error)
    }
}