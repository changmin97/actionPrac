const express = require("express");
const router = express.Router();
const recruitCommentsController = require("../controller/recruitComments");
const authMiddleware = require("../middlewares/authmiddleware");

// 모집 댓글 등록
router.post("/recruits/:postId/comments",authMiddleware, recruitCommentsController.recruitComments);

// 모집 댓글 보기  
router.get("/recruits/:postId/comments", recruitCommentsController.recruitCommentsAllGet);

///api/places/:postId/comments/:commentId
router.delete("/recruits/:postId/comments/:commentId",authMiddleware, recruitCommentsController.recruitCommentsDelete);

module.exports = router;