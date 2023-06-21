function validateCommentLength(req, res) {
    if (req.body.comment.length > 114) {
        return res.status(400).redirect('/posts')
    };
}

module.exports = validateCommentLength