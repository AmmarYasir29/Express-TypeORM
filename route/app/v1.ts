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
router.get("/products:id",UserController.products)
//// invoices
//// methods
//// notifications

// forget password
router.put("/forget",UserController.forgetPasswprd)
// updata data
router.put("/update",UserController.update)
export default router;
