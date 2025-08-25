const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");
const { authenticateJWT } = require("../middleware/auth");

adminRouter.use(authenticateJWT);

adminRouter.get("/posts", adminController.getAllPosts);
adminRouter.post("/posts", adminController.createPost);
adminRouter.put("/posts/:id", adminController.updatePost);
adminRouter.delete("/posts/:id", adminController.deletePost);
adminRouter.put("/posts/:id/published", adminController.togglePublishStatus);
adminRouter.delete("/comments/:id", adminController.deleteComment);

module.exports = adminRouter;


