import { Router } from 'express';
import { getCensusByRegionId } from '../controllers/census.controller';
const router: Router = Router();

router.get('/', getCensusByRegionId);
// router.get('/by-name/', getCensusByRegionName);

export default router;