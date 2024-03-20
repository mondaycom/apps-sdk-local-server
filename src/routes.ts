import { Router } from 'express';

import { router as environmentRoutes } from 'domain/environment/environment.routes';
import { router as logRoutes } from 'domain/log/logs.routes';
import { router as pubSubRoutes } from 'domain/pub-sub/pub-sub.routes';
import { router as secretRoutes } from 'domain/secrets/secrets.routes';
import { router as secureStorageRoutes } from 'domain/secure-storage/secure-storage.routes';
import { router as storageRoutes } from 'domain/storage/storage.routes';

const router = Router();

router.use(logRoutes);
router.use(environmentRoutes);
router.use(storageRoutes);
router.use(secretRoutes);
router.use(secureStorageRoutes);
router.use(pubSubRoutes);

export { router };
