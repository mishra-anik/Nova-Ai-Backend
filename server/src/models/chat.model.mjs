import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    Chat:{
        type:String,
        required: true,
        trim: true,
    }
    ,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }


})

const Chat = mongoose.model("chat", chatSchema);

export default Chat;