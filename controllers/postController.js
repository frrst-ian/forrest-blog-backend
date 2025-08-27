

const prisma = require("../models/prisma");

async function getPublishedPosts(req, res, next) {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        }
    });

    res.json(posts);
}

async function getPostWithComments(req, res, next) {
    const id = req.validId;
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    const postWithComments = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            comments: {
                select: {
                    id: true,
                    authorName: true,
                    content: true,
                    createdAt: true
                }
            }
        },
    })

    if (!postWithComments) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json(postWithComments)
}

async function createComment(req, res, next) {
    const postId = req.validId;
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    const { authorName, content } = req.body;
    if (!authorName || !content) {
        return res.status(400).json({ error: "Author name and content required" });
    }

    const comment = await prisma.comment.create({
        data: { postId, authorName, content }
    });

    res.status(201).json(comment);
}

module.exports = {
    getPublishedPosts,
    getPostWithComments,
    createComment
};