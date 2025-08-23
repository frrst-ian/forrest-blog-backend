const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");

postRouter.get("/", postController.getPublishedPosts);
postRouter.get("/:id", postController.getPostWithComments);
postRouter.post("/:id/comments", postController.createComment);


module.exports = postRouter;