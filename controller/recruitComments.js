const recruitPost = require("../schemas/recruitPost");  // 모집 게시판 
const recruitComment = require("../schemas/recruitComment");// 모집 댓글 
const User = require("../schemas/user");

/*
    댓글 등록 
    router.post("/recruits/:postId/comments", recruitCommentsController.recruitComments);
*/ 
async function recruitComments(req, res) {
    try {
        const { nickname } = res.locals.user;
        const { postId } = req.params;
        const { comment } = req.body;
        let status = false;
  
       
        
        // 게시글 찾기 
        const [findPost] = await recruitPost.find({ postId : postId });
        console.log(findPost.postId) ;
        // 게시글 작성
        const recruitComments = await recruitComment.create({
            nickname : nickname ,
            postId : findPost.postId, 
            comment : comment,
            
        });
        console.log(recruitComments)
  
        res.status(200).send({
            result: "true",
            message: "댓글이 성공적으로 등록되었습니다."
        });

        if(!findPost.postId){
            res.status(400).send({
                result: "false",
                message: "게시글번호가 없습니다 "
            });
        }
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "댓글 작성 실패"
        });
    }
 };

/*
    댓글 보기 
    /recruits/:postid/comments
*/ 
async function recruitCommentsAllGet(req, res) {
    try {
        const { postid } = req.params;
        const seeComment = await recruitComment.find({ postid });
        res.status(200).json({ success: true, seeComment});
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "알수 없는 에러가 발생하였습니다"
        });
}};


/*   
    댓글 삭제 
    "/recruits/:postid/comments/:commentId
*/ 
async function recruitCommentsDelete(req, res) {
    try {
        const { postid,commentid } = req.params;
        const { nickname } = res.locals.user;
        
        await recruitComment.deleteOne({ postid:Number(postid),
                                         commentId:Number(commentid),
                                         });
        
        return res.json({ success: true })
    } 
    catch (err) {
        res.status(400).send({
            result: "false",
            message: "알수 없는 에러가 발생하였습니다"
        });
}};


 module.exports = {
    recruitComments,
    recruitCommentsAllGet,
    recruitCommentsDelete,
  };