import express, { Request, Response } from "express";
import * as TaskService from "./task.service";
import { Task } from "./task.model";

export const taskRouter = express.Router();

taskRouter.get("/", async (_: Request, response: Response) => {
    try {
        const tasks = await TaskService.getAll();
        response.status(200).json(tasks);
    } catch (e) {
        response.status(500).send();
    }
});

taskRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    try {
      const task = await TaskService.get(id);
      if (task) {
        response.status(200).json(task);
        return;
      }
      response.status(404).send();
    } catch (e) {
        response.status(500).send();
    }
});

taskRouter.post("/", async (request: Request, response: Response) => {
    try {
        const task: Task = request.body;  
        const newTask = await TaskService.add(task);
        response.status(201).json(newTask);
    } catch (e) {
        response.status(500).send();
    }
});