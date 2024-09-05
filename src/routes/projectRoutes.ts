import { Router } from "express";
import { body, param } from "express-validator";
import { handleImputError } from "../middleware/validations";
import { ProjectController } from "../controllers/projectController";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router();
/**ROUTES FOR PROJECT */

router.use(authenticate);

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

/**ROUTES FOR TASK */
router.param("projectId", projectExists);
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);
//--------POST--------//
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Name required"),
  body("description").notEmpty().withMessage("Description required"),
  handleImputError,
  TaskController.createTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("Id is not valid"),
  body("status").notEmpty().withMessage("Status is required"),
  handleImputError,
  TaskController.updateStatus
);

//--------GET--------//
router.get("/:projectId/tasks", TaskController.getProjectTask);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id is not valid"),
  handleImputError,
  TaskController.getTaskById
);

//--------PUT--------//
router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id is not valid"),
  body("name").notEmpty().withMessage("Name required"),
  body("description").notEmpty().withMessage("Description required"),
  handleImputError,
  TaskController.updateTaskById
);

//--------DELETE--------//
router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id is not valid"),
  handleImputError,
  TaskController.deleteTaskById
);

export default router;
