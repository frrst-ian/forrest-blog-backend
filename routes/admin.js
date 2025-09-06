const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");
const { authenticateJWT } = require("../middleware/auth");
const { validateId } = require("../middleware/validation");

adminRouter.use(authenticateJWT);

adminRouter.get("/posts", adminController.getAllPosts);
adminRouter.get("/posts/:id", validateId, adminController.getPostById);
adminRouter.post("/posts", adminController.createPost);
adminRouter.put("/posts/:id", validateId, adminController.updatePost);
adminRouter.delete("/posts/:id", validateId, adminController.deletePost);
adminRouter.put("/posts/:id/published", validateId, adminController.togglePublishStatus);
adminRouter.delete("/comments/:id", validateId, adminController.deleteComment);

module.exports = adminRouter;


