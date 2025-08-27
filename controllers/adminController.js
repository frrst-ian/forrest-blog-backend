const postService = require("../models/postService");
const { sendError, sendSuccess } = require('../utils/responses');

async function getAllPosts(req, res, next) {
    const posts = await postService.getAllPostWithDetails();

    return sendSuccess(res, posts);
}

async function createPost(req, res, next) {
    const { title, content } = req.body;

    if (!title || !content) {
        return sendError(res, 400, "Title and content are required")
    }

    const post = await postService.createPost({
        title, content, userId: req.user.id,
    });

    return sendSuccess(res, post, 201)
}

async function updatePost(req, res, next) {
    const postId = req.validId;
    const { title, content } = req.body;

    const existingPost = await postService.getPostById(postId);
    if (!existingPost) {
        return sendError(res, 404, "Post not found");
    }

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
        return sendError(res, 400, "No valid fields to update")
    }

    const updatedPost = await postService.updatePost(postId, updateData);

    return sendSuccess(res, updatedPost);
}

async function deletePost(req, res, next) {
    const postId = req.validId;

    const existingPost = await postService.getPostById(postId);
    if (!existingPost) {
        return sendError(res, 404, "Post not found");
    }

    await postService.deletePost(postId);

    res.status(204).send();
}

async function togglePublishStatus(req, res, next) {
    const postId = req.validId;

    const currentPost = await postService.togglePublishStatus(postId);

    if (!currentPost) {
        return sendError(res, 404, "Post not found")
    }

    const updatedPost = await postService.updatePostPublishStatus(postId, currentPost);

    return sendSuccess(res, updatedPost);
}

async function deleteComment(req, res, next) {
    const commentId = req.validId;

    await postService.deleteComment(commentId);

    res.status(204).send();
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    togglePublishStatus,
    deleteComment
};
