const prisma = require("./prisma");

async function getAllPostWithDetails() {
    return await prisma.post.findMany({
        include: {
            user: true,
            comments: true
        }
    });
}

async function getPublishedPosts() {
    return await prisma.post.findMany({
        where: {
            published: true
        }
    });
}

async function getPostWithComments(id) {
    return await prisma.post.findUnique({
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
}

async function createComment(postId, authorName, content) {
    return await prisma.comment.create({
        data: {
            postId,
            authorName,
            content
        }
    });
}

async function createPost(postData) {
    return await prisma.post.create({
        data: postData
    });
}

async function getPostById(postId) {
    return await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
}


async function updatePost(postId, updatedData) {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: updatedData
    })
}

async function deletePost(postId) {
    return await prisma.post.delete({
        where: {
            id: postId
        }
    });
}

async function togglePublishStatus(postId) {
    return await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            published: true
        }
    });
}

async function updatePostPublishStatus(postId, currentPost) {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            published: !currentPost.published
        }
    });
}

async function deleteComment(commentId) {
    return await prisma.comment.delete({
        where: {
            id: commentId,
        }
    });

}

module.exports = {
    getAllPostWithDetails,
    createPost,
    updatePost,
    deletePost,
    togglePublishStatus,
    updatePostPublishStatus,
    deleteComment,
    getPublishedPosts,
    getPostWithComments,
    createComment,
    getPostById
};