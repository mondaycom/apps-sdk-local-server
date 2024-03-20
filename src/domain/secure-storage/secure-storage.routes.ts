import { Router } from 'express';

import { deleteSecureValue, getSecureValue, updateSecureValue } from './secure-storage.controller';

const router = Router();

router.get(`/secure-storage/:key`, getSecureValue);
router.delete(`/secure-storage/:key`, deleteSecureValue);
router.put(`/secure-storage/:key`, updateSecureValue);

export { router };
