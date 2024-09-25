import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  //--------POST--------//
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    //Asigna un manager
    project.manager = req.user.id;
    try {
      await project.save();
      res.send("¡Proyecto creado correctamente!");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error!" });
    }
  };

  //--------GET--------//
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } },
        ],
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("¡Proyecto no encontrado!");
        return res.status(404).json({ error: error.message });
      }
      if (
        project.manager.toString() !== req.user.id.toString() &&
        !project.team.includes(req.user.id)
      ) {
        const error = new Error("¡Accion no valida!");
        return res.status(404).json({ error: error.message });
      }
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  //--------PUT--------//
  static updateProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("¡Proyecto no encontrado!");
        return res.status(404).json({ error: error.message });
      }
      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error(
          "¡Solo el Manager puede actualizar un proyecto!"
        );
        return res.status(404).json({ error: error.message });
      }
      project.projectName = req.body.projectName;
      project.clientName = req.body.clientName;
      project.description = req.body.description;
      await project.save();
      res.send("¡Proeycto actualizado correctamente!");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //--------DELETE--------//
  static deleteProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("¡Proyecto no encontrado!");
        return res.status(404).json({ error: error.message });
      }
      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("¡Solo el Manager puede eliminar un proyecto!");
        return res.status(404).json({ error: error.message });
      }
      await project.deleteOne();
      res.send("¡Proyecto eliminado correctamente!");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
