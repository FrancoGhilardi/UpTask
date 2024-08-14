import type { Request, Response } from "express";
import Project from "../config/models/Project";

export class ProjectController {
  //--------POST--------//
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();

      res.send("Project created successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  //--------GET--------//
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});

      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Project not found");
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
      const project = await Project.findByIdAndUpdate(id, req.body);

      if (!project) {
        const error = new Error("Project not found");
        return res.status(404).json({ error: error.message });
      }

      await project.save();
      res.send("Project updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //--------DELETE--------//
  static deleteProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Project not found");
        return res.status(404).json({ error: error.message });
      }

      await project.deleteOne();
      res.send("Project deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
}
