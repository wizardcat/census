import { Router } from 'express';
import { getCensusById } from '../controllers/census.controller';
const router: Router = Router();

router.get('/', getCensusById);

export default router;