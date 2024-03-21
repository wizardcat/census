import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Application } from 'express';
import { censusRoute, importData, regionsRoute } from './routes';

const prisma = new PrismaClient();
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api', regionsRoute);
app.use('/api', censusRoute);
app.use('/api', importData);

const server = app.listen(port, () => console.log(`🚀 Server ready at: ${port}`));
