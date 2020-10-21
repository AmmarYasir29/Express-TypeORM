import * as express from "express";
const router = express.Router();
import UserController from "../../controllers/app/user.controller";

// create v1
//// register
router.post("/register", UserController.register);

//// check out
router.post("/otp",UserController.otp)
//// login
router.post("/login",UserController.Login)
//// categories
router.get("/categories",UserController.category)
//// category products
router.get("/products",UserController.products)
//// invoices
//// methods
//// notifications

export default router;
