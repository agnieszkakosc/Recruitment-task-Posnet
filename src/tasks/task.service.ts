import { Task } from './task.model';

const tasks: Task[] = [
    { id: 1, name: "Simple task 1", description: "Task for user", done: false, ownerId: 1},
    { id: 2, name: "Simple task 2", description: "Task for user", done: false, ownerId: 1},
    { id: 3, name: "Simple task 3", description: "Task for user", done: false, ownerId: 1},
    { id: 4, name: "Task 1", description: "Task for admin", done: false, ownerId: 2},
    { id: 5, name: "Task 2", description: "Task for admin", done: false, ownerId: 2}
];

export const add = async (task: Task): Promise<Task> => {
    const newTask = {
        ...task,
        id: tasks.length + 1
    }
    tasks.push(newTask);
    return newTask;
};

export const get = async (id: number): Promise<Task|null> => {
    return tasks.find(task => task.id === id) ?? null;
};

export const getAll = async (): Promise<Task[]> => {
    return [...tasks];
};