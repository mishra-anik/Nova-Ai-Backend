import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    role:{
        type: String,
        enum: ["user", "model"],
        default: "user",
    },
    // chat: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "chat",
    //     required: true,
    // },
}, {
    timestamps: true,
})

const Message = mongoose.model("message", messageSchema);

export default Message;