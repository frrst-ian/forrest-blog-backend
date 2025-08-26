const { parse } = require("dotenv");
const prisma = require("../models/prisma");

async function getAllPosts(req, res, next) {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
            comments: true
        }
    });

    res.json(posts);
}

async function createPost(req, res, next) {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            userId: 1,
        }
    });

    res.status(201).json(post)
}

async function updatePost(req, res, next) {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    const { title, content } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: updateData
    });

    res.json(updatedPost);
}

async function deletePost(req, res, next) {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    });

    res.status(204).send();
}

async function togglePublishStatus(req, res, next) {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    const currentPost = await prisma.post.findUnique({
        where: { id: postId },
        select: { published: true }
    });

    if (!currentPost) {
        return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { published: !currentPost.published }
    });

    res.json(updatedPost);
}

async function deleteComment(req, res, next) {
    const commentId = parseInt(req.params.id);

    if (isNaN(commentId)) {
        return res.status(400).json({ error: "Invalid comment ID" });
    }

    await prisma.comment.delete({
        where: {
            id: commentId,
        }
    });

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
