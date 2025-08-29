const postService = require("../models/postService");
const { sendError, sendSuccess } = require('../utils/responses');

async function getPublishedPosts(req, res, next) {
    const posts = await postService.getPublishedPosts();

    return sendSuccess(res, posts)
}

async function getPostWithComments(req, res, next) {
    const id = req.validId;

    const postWithComments = await postService.getPostWithComments(id);

    if (!postWithComments) {
        return sendError(res, 404, "Post not found")
    }

    return sendSuccess(res, postWithComments)
}

async function createComment(req, res, next) {
    const postId = req.validId;

    const { authorName, content } = req.body;
    if (!authorName || !content) {
        return sendError(res, 400, "Author name and content required")
    }

    const comment = await postService.createComment(postId, authorName, content);
    res.status(201).json(comment);
    return sendSuccess(res, comment, 201);
}

module.exports = {
    getPublishedPosts,
    getPostWithComments,
    createComment
};