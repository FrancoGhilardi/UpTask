import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { handleImputError } from "../middleware/validations";

const router = Router();
//--------POST--------//
router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project Name required"),
  body("clientName").notEmpty().withMessage("Client Name required"),
  body("description").notEmpty().withMessage("Description required"),
  handleImputError,
  ProjectController.createProject
);

//--------GET--------//
router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Id is not valid"),
  handleImputError,
  ProjectController.getProjectsById
);

//--------PUT--------//
router.put(
  "/:id",
  param("id").isMongoId().withMessage("Id is not valid"),
  body("projectName").notEmpty().withMessage("Project Name required"),
  body("clientName").notEmpty().withMessage("Client Name required"),
  body("description").notEmpty().withMessage("Description required"),
  handleImputError,
  ProjectController.updateProjectById
);

//--------DELETE--------//
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id is not valid"),
  handleImputError,
  ProjectController.deleteProjectById
);

export default router;
