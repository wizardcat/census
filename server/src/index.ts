import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Application } from 'express';
import { PORT, URL } from './config';
import { censusRoute, importData, regionsRoute } from './routes';

const prisma = new PrismaClient();
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/regions', regionsRoute);
app.use('/census', censusRoute);
app.use('/import-data', importData);

const server = app.listen(PORT, () => console.log(`🚀 Server ready at: ${URL}:${PORT}`));
