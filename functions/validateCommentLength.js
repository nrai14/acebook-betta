function validateCommentLength(req, res, next) {
    if (req.body.comment.length > 114) {
        return res.status(400).redirect('/posts')
    }
    next();
}

module.exports = validateCommentLength