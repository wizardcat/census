import { getCensusByRegionId } from '@app/controllers';
import { Router } from 'express';
const router: Router = Router();

router.get('/:locale/:regionId', getCensusByRegionId);

export default router;
