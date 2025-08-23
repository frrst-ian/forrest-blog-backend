

const prisma = require("../models/prisma");

async function getPublishedPosts(req, res, next) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            }
        });
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts: ", err);
        res.status(500).json({ error: "Failed to fetch posts" })
    }
}

async function getPostWithComments(req, res, next) {
    try {
        const id = parseInt(req.params.id);
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
    } catch (err) {
        console.error("Error fetching post with comments: ", err);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function createComment(req, res, next) {
    try {
        const postId = parseInt(req.params.id);
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
    } catch (err) {
        console.error("Failed to create comment:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getPublishedPosts, getPostWithComments, createComment };