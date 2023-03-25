import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

export const { mode = "dev" } = minimist(process.argv.slice(2));

export function getDotEnv(mode?: string) {
  const modeSuffix = mode ? `.${mode}` : '';
  const modeEnvPath = path.resolve(process.cwd(), `.env${modeSuffix}`);
  const localModeEnvPath = `${modeEnvPath}.local`;
  const envPath = fs.existsSync(localModeEnvPath) ? localModeEnvPath : modeEnvPath
  return config({ path: envPath }).parsed || {};
}

export const env = getDotEnv(mode)
