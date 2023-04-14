import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

export const { mode = "dev" } = minimist(process.argv.slice(2));

export function getDotEnvBase(mode?: string, basePath = process.cwd(),) {
  const modeSuffix = mode ? `.${mode}` : '';
  const modeEnvPath = path.resolve(basePath, `.env${modeSuffix}`);
  const localModeEnvPath = `${modeEnvPath}.local`;
  const envPath = fs.existsSync(localModeEnvPath) ? localModeEnvPath : modeEnvPath
  return Object.assign({}, config({ path: envPath }).parsed);
}
export const appPath = (...paths: string[]) => path.resolve(import.meta.url, '..', ...paths);
export const projectPath = (...paths: string[]) => appPath('..', ...paths);
export function getDotEnv(mode?: string) {
  const projectEnv = getDotEnvBase(mode)
  return {
    ...process.env,
    ...projectEnv,
    BUN_MODE: mode,
    __DEV__: mode === 'dev',
    __PROD__: mode === 'production',
  } as Record<string, any>;
}

export const env = getDotEnv(mode)
