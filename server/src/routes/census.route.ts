import { getCensusByRegionId } from '@app/controllers';
import { Router } from 'express';
const router: Router = Router();

router.get('/', getCensusByRegionId);
// router.get('/by-name', getCensusByRegionName);

export default router;
