import { env } from '../utils/env'
import { createClient } from 'redis';
import { logErr, sLog } from '../utils/logger';

const client = createClient({ url: env.DBC });

export const SET_KEY = 'vanguard-rules';

export async function connectRedis(cause?: string) {
  client.on('connect', async () => {
    await sLog(`Redis Client Connect ${cause ? `for ${cause}` : ''}`)
  });
  client.on('end', async () => {
    await sLog(`Redis Client Disconnect ${cause ? `by ${cause} end` : ''}`)
  });
  client.on('error', async err => {
    await logErr(err, 'Redis Client Error:')
  });
  await client.connect();
  return client
}
