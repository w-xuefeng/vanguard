import { env } from '../utils/env'
import { createClient } from 'redis';

const client = createClient({ url: env.DBC });

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();
