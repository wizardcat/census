import { extractCensusData } from '@app/controllers/create-base.controller';
import { Router } from 'express';
const router: Router = Router();

router.post('/import-data', extractCensusData);

export default router;
