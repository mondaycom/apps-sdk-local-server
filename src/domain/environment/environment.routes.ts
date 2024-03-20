import { Router } from 'express';

import { getEnvironmentForKey, setEnvironmentForKey } from './environment.controller';

const router = Router();

router.get(`/environments/:key`, getEnvironmentForKey);

// TODO - DOR - Add reference to this route in the documentation
router.put(`/test/environments/:key`, setEnvironmentForKey);

export { router };
