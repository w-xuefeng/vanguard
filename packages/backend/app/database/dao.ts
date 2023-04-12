import { SET_KEY, connectRedis } from "./connection";
import { GuardRecord } from "./type";

export async function getAllRecords(cause?: string) {
  const client = await connectRedis(`Searching all records ${cause ? `by ${cause}` : ''}`);
  const rs = await client.sMembers(SET_KEY)
  await client.disconnect();
  return rs.map(e => ({
    value: GuardRecord.parse(e),
    raw: e
  }));
}

export async function getRecordByPrefix(prefix: string) {
  const rs = await getAllRecords(`Querying '${prefix}'`);
  return rs.findLast(e => e?.value?.prefix === prefix);
}

export async function addRecord(record: GuardRecord[]) {
  const prefixes = record.map(e => e.prefix).join(',')
  const client = await connectRedis(`Adding '${prefixes}' record`)
  const rs = await client.sAdd(SET_KEY, record.map(e => e.toString()))
  await client.disconnect();
  return rs;
}

export async function removeRecord(prefixOrRecord: string | GuardRecord) {
  const record = {
    raw: '',
    value: null as GuardRecord | null,
  }
  if (typeof prefixOrRecord === 'string') {
    const { raw, value } = await getRecordByPrefix(prefixOrRecord) || record
    record.raw = raw;
    record.value = value;
  } else {
    record.raw = prefixOrRecord.toString();
    record.value = prefixOrRecord;
  }
  if (!record.raw || !record.value) {
    return 0;
  }
  const client = await connectRedis(`Removing '${record.value.prefix}' record`);
  const rs = await client.sRem(SET_KEY, record.raw)
  await client.disconnect();
  return rs;
}

export async function modifyRecord(prefix: string, next: GuardRecord) {
  await removeRecord(prefix);
  const rs = await addRecord([next]);
  return rs;
}
