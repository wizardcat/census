import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Application } from 'express';
import { censusRoutes, importDataRoutes, regionsRoutes } from './routes';

const prisma = new PrismaClient();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/regions', regionsRoutes);
app.use('/api/census', censusRoutes);
app.use('/api/import-data', importDataRoutes);

const server = app.listen(PORT, () => console.log(`🚀 Server ready at: ${PORT}`));
