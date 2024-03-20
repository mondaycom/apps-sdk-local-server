import { Router } from 'express';

import { writeLog } from './logs.controller';

const router = Router();

router.post(`/log`, writeLog);

export { router };
