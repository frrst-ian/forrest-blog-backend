const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postController");
const { validateId } = require("../middleware/validation")

postRouter.get("/", postController.getPublishedPosts);
postRouter.get("/:id", validateId, postController.getPostWithComments);
postRouter.post("/:id/comments", validateId, postController.createComment);

module.exports = postRouter;