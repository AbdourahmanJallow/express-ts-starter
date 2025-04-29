import express, { Request, Response } from 'express';
import { logger } from './middlewares/logger';
import path from 'path';

const app = express();

// Body parser
app.use(express.json());
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// ADD API ROUTES HERE

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

// ADD ERROR HANDLER HERE

export default app;
