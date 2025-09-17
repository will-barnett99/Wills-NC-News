
const removeCommentByCommentId = require('../models/commentID-model')

const deleteCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params;
    removeCommentByCommentId(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}

module.exports = deleteCommentByCommentId;