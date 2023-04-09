import { SET_KEY, connectRedis } from "./connection";
import { GuardRecord } from "./type";

export async function getAllRecords(cause?: string) {
  const client = await connectRedis(`Searching all records ${cause ? `by ${cause}` : ''}`);
  const rs = await client.sMembers(SET_KEY)
  await client.disconnect();
  return rs.map(e => GuardRecord.parse(e));
}

export async function getRecordByPrefix(prefix: string) {
  const rs = await getAllRecords(`Querying '${prefix}'`);
  return rs.findLast(e => e?.prefix === prefix);
}

export async function addRecord(record: GuardRecord[]) {
  const prefixes = record.map(e => e.prefix).join(',')
  const client = await connectRedis(`Adding '${prefixes}' record`);
  const rs = await client.sAdd(SET_KEY, record.map(e => e.toString()))
  await client.disconnect();
  return rs;
}

export async function removeRecord(record: GuardRecord) {
  const client = await connectRedis(`Removing '${record.prefix}' record`);
  const rs = await client.sRem(SET_KEY, record.toString())
  await client.disconnect();
  return rs;
}

export async function modifyRecord(prev: GuardRecord, next: GuardRecord) {
  await removeRecord(prev);
  const rs = await addRecord([next]);
  return rs;
}
