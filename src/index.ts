import express, {Request, Response, Application} from 'express';
import { authRouter } from './auth/auth.router';
import { taskRouter } from './tasks/task.router';
import { verifyAuthorization } from './auth/auth.service';

const app : Application = express();
const PORT = 8765;

app.use(express.json());
app.use("/api/login", authRouter);
app.use("/api/tasks", [verifyAuthorization, taskRouter]);

app.listen(PORT, ():void => {
    console.log(`Server listening at port ${PORT}`);
});