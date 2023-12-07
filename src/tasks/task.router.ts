import express, { Request, Response } from "express";
import * as taskService from "./task.service";
import { Task } from "./task.model";
import { verifyPermission } from "../auth/auth.service";

export const taskRouter = express.Router();

taskRouter.get("/", verifyPermission("Admin"), (_: Request, response: Response) => { 
    try {
        const tasks = taskService.getAll();
        response.status(200).json(tasks);
    } catch (e) {
        response.status(500).send();
    }
});

taskRouter.get("/:id", (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    const { userId } = request.body.token;
    try {
      const task = taskService.get(id);
      if (task && task.ownerId === userId) {
        response.status(200).json(task);
        return;
      }
      response.status(404).send();
    } catch (e) {
        response.status(500).send();
    }
});

taskRouter.post("/", (request: Request, response: Response) => {
    try {
        const task: Task = request.body;  
        const newTask = taskService.add(task);
        response.status(201).json(newTask);
    } catch (e) {
        response.status(500).send();
    }
});