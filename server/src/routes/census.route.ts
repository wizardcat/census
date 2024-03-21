import { getCensusByRegionId } from '@app/controllers/census.controller';
import { Router } from 'express';
const router: Router = Router();

router.get('/census', getCensusByRegionId);
// router.get('/by-name', getCensusByRegionName);

export default router;
