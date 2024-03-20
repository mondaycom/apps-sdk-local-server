import { Router } from 'express';

import { counterIncrement, deleteValue, getValue, updateValue } from './storage.controller';

const router = Router();

// TODO - DOR - Add in the documentation explanation as to why the storage will use the real storage api
router.get(`/storage/:key`, getValue);
router.delete(`/storage/:key`, deleteValue);
router.put(`/storage/:key`, updateValue);
router.post(`/storage/counter/increment`, counterIncrement);

export { router };
