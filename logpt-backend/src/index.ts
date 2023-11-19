import express, { Express } from 'express';
import { RegisterRoutes } from '../build/routes';

export const app: Express = express();

app.use(express.json());

RegisterRoutes(app);

app.listen(8000, () => {
  console.log('listening on port 8000');
});
