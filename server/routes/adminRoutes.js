import express from "express";
import {
  adminLogin,
  adminSignup,
  approveCommentById,
  deleteCommentById,
  getAllBlogAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";

import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/signup", adminSignup);

adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
