import express, {Request, Response, Application} from 'express';

const app : Application = express();
const PORT = 8765;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(PORT, ():void => {
    console.log(`Server listening at port ${PORT}`);
});