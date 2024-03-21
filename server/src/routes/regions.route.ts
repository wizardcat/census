import { getRegions } from '@app/controllers/regions.controller';
import { Router } from 'express';
const router: Router = Router();

router.get('/regions', getRegions);
// router.get('/region-by-id', getRegionById);
export default router;
