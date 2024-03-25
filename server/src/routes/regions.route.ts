import { getRegions } from '@app/controllers';
import { Router } from 'express';
const router: Router = Router();

router.get('/', getRegions);
// router.get('/region-by-id', getRegionById);
export default router;
