import { Router } from 'express';
import { extractCensusData } from '../controllers/createBase.controller';
const router: Router = Router();

router.post('/', extractCensusData);

export default router;