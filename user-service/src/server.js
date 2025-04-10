import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('User Service is running...');
});

app.listen(PORT, () => {
  console.log(`User Service is listening on port ${PORT}`);
});
