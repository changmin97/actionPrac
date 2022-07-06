const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;
const recruitCommentSchema = new Schema(
    {
        // 코멘트 ID
        commentId: {
            type: Number,
        },
        // 게시글
        postId: {
            type: String,
        },
        // 코멘트
        comment: {
            type: String,
        },
        //닉네임
        nickname: {
            type: String,
            require: true,
        },
        // 등록 / 수정 날짜 자동 생성
    },
    { 
        timestamps: true,
    }
);

recruitCommentSchema.plugin(autoIncrement, {
    inc_field: "commentId",
});

module.exports = mongoose.model("RecruitComment", recruitCommentSchema);