import { join } from 'node:path';

import appRoot from 'app-root-path';

// External - 59999
export const PORT = 3000;

export const VOLUME_PATH = join(appRoot.toString(), 'volumes');
