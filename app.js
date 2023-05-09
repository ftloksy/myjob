import express from 'express';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.EXPRESSPORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/jobs', jobRoutes );

// Start the server
export default app.listen(port, () => console.log(`Server running on port ${port}`));
