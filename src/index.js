import express from 'express';
import { matchRouter } from './routes/matchesRoute.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server!');
});


app.use('/matches', matchRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});