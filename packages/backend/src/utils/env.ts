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
export const srcPath = (...paths: string[]) => path.resolve(import.meta.dir, '..', ...paths);
export const projectPath = (...paths: string[]) => srcPath('..', ...paths);
export const packagesPath = (...paths: string[]) => projectPath('..', ...paths);
export const workspacePath = (...paths: string[]) => packagesPath('..', ...paths);
export function getDotEnv(mode?: string) {
  const workspaceEnv = getDotEnvBase(mode, workspacePath())
  const projectEnv = getDotEnvBase(mode)
  return {
    ...process.env,
    ...workspaceEnv,
    ...projectEnv,
    BUN_MODE: mode,
  } as Record<string, any>;
}



export const env = getDotEnv(mode)
