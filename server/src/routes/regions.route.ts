import { getRegions } from '@app/controllers/regions.controller';
import { Router } from 'express';
const router: Router = Router();

router.get('/', getRegions);
// router.get('/', getRegionById);
export default router;
