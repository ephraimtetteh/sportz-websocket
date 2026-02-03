import express from 'express';

const app = express();
const port = 8000;

// Use JSON middleware
app.use(express.json());

// Root GET route that returns a short message
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js server!');
});

// Log URL when the server starts
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});