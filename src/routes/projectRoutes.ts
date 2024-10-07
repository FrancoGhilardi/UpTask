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
import { NoteController } from "../controllers/NoteController";

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

/**ROUTES FOR TASK */
router.param("projectId", projectExists);

//--------PUT--------//
router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("¡Id no valido!"),
  body("projectName").notEmpty().withMessage("¡Nombre del proyecto requerido!"),
  body("clientName").notEmpty().withMessage("¡Nombre del cliente requerido!"),
  body("description").notEmpty().withMessage("¡Descripcion requerida!"),
  handleImputError,
  hasAuthorization,
  ProjectController.updateProjectById
);

//--------DELETE--------//
router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  hasAuthorization,
  ProjectController.deleteProjectById
);

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

/**Routes for Notes */
//--------GET--------//
router.get("/:projectId/tasks/:taskId/notes", NoteController.getTaskNotes);

//--------POST--------//
router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content")
    .notEmpty()
    .withMessage("¡El contenido de la nota es obligatorio!"),
  handleImputError,
  NoteController.createNote
);

//--------DELETE--------//
router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  param("noteId").isMongoId().withMessage("¡Id no valido!"),
  handleImputError,
  NoteController.deleteNote
);
export default router;
