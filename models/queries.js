const prisma = require("./prisma");

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}


module.exports = { getUserById, getUserByEmail };