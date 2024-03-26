import { getRegions } from '@app/controllers';
import { Router } from 'express';
const router: Router = Router();

router.get('/:locale', getRegions);
export default router;
