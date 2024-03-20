import { Router } from 'express';

import { getSecretForKey, setSecretForKey } from './secrets.controller';

const router = Router();

router.get(`/secrets/:key`, getSecretForKey);

// TODO - DOR - Add reference to this route in the documentation
router.put(`/test/secrets/:key`, setSecretForKey);

export { router };
