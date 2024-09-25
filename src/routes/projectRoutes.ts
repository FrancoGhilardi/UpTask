import { Router } from "express";
import { body, param } from "express-validator";
import { handleImputError } from "../middleware/validations";
import { ProjectController } from "../controllers/projectController";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();
/**ROUTES FOR PROJECT */

router.use(authenticate);

//--------POST--------//
router.post(
  "/",
  body("projectName").notEmpty().withMessage("¡Nombre del proyecto requerido!"),
  body("clientName").notEmpty().withMessage("¡Nombre del cliente requerido!"),
  body("description").notEmpty().withMessage("¡Descripcion requerida!"),
  handleImputError,
  ProjectController.createProject
);

//--------GET--------//
router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  ProjectController.getProjectsById
);

//--------PUT--------//
router.put(
  "/:id",
  param("id").isMongoId().withMessage("¡Id no valido!"),
  body("projectName").notEmpty().withMessage("¡Nombre del proyecto requerido!"),
  body("clientName").notEmpty().withMessage("¡Nombre del cliente requerido!"),
  body("description").notEmpty().withMessage("¡Descripcion requerida!"),
  handleImputError,
  ProjectController.updateProjectById
);

//--------DELETE--------//
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  ProjectController.deleteProjectById
);

/**ROUTES FOR TASK */
router.param("projectId", projectExists);

//--------POST--------//
router.post(
  "/:projectId/tasks",
  hasAuthorization,
  body("name").notEmpty().withMessage("¡Nombre requerido!"),
  body("description").notEmpty().withMessage("¡Descripcion requerida!"),
  handleImputError,
  TaskController.createTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("¡Id no valido!"),
  body("status").notEmpty().withMessage("¡Status es requerido!"),
  handleImputError,
  TaskController.updateStatus
);

//--------GET--------//
router.get("/:projectId/tasks", TaskController.getProjectTask);

router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  TaskController.getTaskById
);

//--------PUT--------//
router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("¡Id no valido!"),
  body("name").notEmpty().withMessage("¡Nombre requerido!"),
  body("description").notEmpty().withMessage("¡Descripcion requerida!"),
  handleImputError,
  TaskController.updateTaskById
);

//--------DELETE--------//
router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  TaskController.deleteTaskById
);

/**Routes for teams */
//--------GET--------//
router.get("/:projectId/team", TeamMemberController.getProjectTeam);

//--------POST--------//
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("¡Email no valido!"),
  handleImputError,
  TeamMemberController.findMemberByEmail
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  TeamMemberController.addMemberById
);

//--------DELETE--------//
router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  TeamMemberController.removeMember
);

export default router;
