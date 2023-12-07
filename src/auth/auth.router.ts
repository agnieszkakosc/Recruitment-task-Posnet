import express, { Request, Response } from "express";
import { verifyUser } from "../users/user.service";
import { createToken } from "./auth.service";

export const authRouter = express.Router();
authRouter.post("/", (request: Request, response: Response) => {
    try {
        const userObj = request.body;
        const { email, password } = userObj;
        if (!email || !password){
            response.status(400).send();
            return;
        }
        const user = verifyUser(email, password);
        
        if (!user){
            response.status(404).send();
            return;
        }
        const token = createToken({ userId: user.id, email: user.email, role: user.role });
        response.status(200).json({accessToken: token});
        
    } catch (e) {
        console.log(e);
        response.status(500).send();
    }
});