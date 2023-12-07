import express, { Request, Response } from "express";
import * as taskService from "./task.service";
import { Task } from "./task.model";
import { verifyPermission, CustomRequest } from '../auth/auth.service';
import { JwtPayload } from "jsonwebtoken";

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
    const token = (request as CustomRequest).token;
    const { userId } = token as JwtPayload;
    try {
      const task = taskService.get(id);
      if (task && task.ownerId == userId) {
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
        const token = (request as CustomRequest).token;
        const { userId } = token as JwtPayload;
        const task: Task = { ... request.body, ownerId: userId };
        const newTask = taskService.add(task);
        response.status(201).json(newTask);
    } catch (e) {
        response.status(500).send();
    }
});