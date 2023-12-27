import { Router } from 'express';
import { getRegions } from '../controllers/regions.controller';
const router: Router = Router();

router.get('/', getRegions);
// router.get('/', getRegionById);
export default router;