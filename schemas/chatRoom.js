const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const chatRoomSchema = new Schema(
    {
        roomId: { type: Number, unique: true},
        postId: { type: Number },
        nickname: { type: String },
        postNickname: { type: String },
        postTitle: { type: String }
    },
    { timestamps: true }
);

chatRoomSchema.plugin(AutoIncrement, { inc_field: "roomId" });

module.exports = mongoose.model("chatRoom", chatRoomSchema);