import { Router } from "express";
import { userController } from "../../controllers/user.controller";
import { validator } from "../../services/validator.service";
import Joi from "joi";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/register",
  validator.body(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  ),
  userController.register.bind(userController)
);
router.post("/login", userController.login.bind(userController));
export default router;
