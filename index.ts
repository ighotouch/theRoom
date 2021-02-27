import express from 'express';
import cors from 'cors';
import apiV1Router from './src/routes';
const app = express()
app.use(cors())

app.use(express.json());
const port = 3000

app.use('/v1', apiV1Router);

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})