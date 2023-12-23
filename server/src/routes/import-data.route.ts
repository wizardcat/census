import { Router } from 'express';
import { extractCensusData } from '../controllers/create-base.controller';
const router: Router = Router();

router.post('/', extractCensusData);

export default router;
