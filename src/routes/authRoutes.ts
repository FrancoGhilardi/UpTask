import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleImputError } from "../middleware/validations";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("¡El nombre no puede ir vacio!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("¡Contraseña demasiado corta, minimo 8 caracteres!"),
  body("password-confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("¡Las contraseñas no coinciden!");
    }
    return true;
  }),
  body("email").isEmail().withMessage("¡El email no es valido!"),
  handleImputError,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("¡El Token no puede ir vacio!"),
  handleImputError,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email").isEmail().withMessage("¡El email no es valido!"),
  body("password").notEmpty().withMessage("¡La contraseña no puede ir vacia!"),
  handleImputError,
  AuthController.login
);

export default router;
