const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const recruitPostSchema = new Schema(
    {
        postId: { type: Number, unique: true },
        nickname: { type: String },
        title: { type: String },
        content: { type: String },
        age: { type: String },
        date: { type: String },
        time: { type: String },
        place: { type: String },
        status: { type: Boolean },
        bookmarkUsers: { type: Array, default: [] },
    },
    { timestamps: true }
);

recruitPostSchema.plugin(AutoIncrement, { inc_field: "postId" });

module.exports = mongoose.model("RecruitPost", recruitPostSchema);
