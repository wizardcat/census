import { importData } from '@app/controllers';
import { Router } from 'express';
const router: Router = Router();

router.post('/', importData);

export default router;
