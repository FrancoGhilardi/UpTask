import type { Request, Response } from "express";
import Project from "../config/models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.send("Project created successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("Todos los projectos");
  };
}
