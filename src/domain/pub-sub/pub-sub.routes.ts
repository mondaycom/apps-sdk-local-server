import { Router } from 'express';

import { queue, validateSecret } from './pub-sub.controller';

const router = Router();

router.post(`/queue`, queue);
router.post(`/validate-secret`, validateSecret);

export { router };
