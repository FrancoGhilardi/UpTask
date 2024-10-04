import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleImputError } from "../middleware/validations";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("¡El nombre no puede ir vacio!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("¡Contraseña demasiado corta, minimo 8 caracteres!"),
  body("password_confirmation").custom((value, { req }) => {
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

router.post(
  "/request-code",
  body("email").isEmail().withMessage("¡El email no es valido!"),
  handleImputError,
  AuthController.requestConfirmationCode
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("¡El email no es valido!"),
  handleImputError,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("¡El Token no puede ir vacio!"),
  handleImputError,
  AuthController.validateToken
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("¡Token no valido!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("¡Contraseña demasiado corta, minimo 8 caracteres!"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("¡Las contraseñas no coinciden!");
    }
    return true;
  }),
  handleImputError,
  AuthController.updatePasswordWithToken
);

router.get("/user", authenticate, AuthController.user);

/**Profile */
router.put(
  "/profile",
  authenticate,
  body("name").notEmpty().withMessage("¡El nombre no puede ir vacio!"),
  body("email").isEmail().withMessage("¡El email no es valido!"),
  handleImputError,
  AuthController.updateProfile
);

router.post(
  "/update-password",
  authenticate,
  body("current_password")
    .notEmpty()
    .withMessage("!La contraseña actual no puede ir vacio!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("¡Contraseña demasiado corta, minimo 8 caracteres!"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("¡Las contraseñas no coinciden!");
    }
    return true;
  }),
  handleImputError,
  AuthController.updateCurrentUserPassword
);

router.post(
  "/check-password",
  authenticate,
  body("password")
    .notEmpty()
    .withMessage("!La contraseña actual no puede ir vacio!"),
  handleImputError,
  AuthController.checkPassword
);

export default router;
