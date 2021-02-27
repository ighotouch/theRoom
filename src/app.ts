import express from 'express';
import cors from 'cors';
import apiV1Router from './routes';
const app = express()
app.use(cors())

app.use(express.json());


app.use('/v1', apiV1Router);

export default app;