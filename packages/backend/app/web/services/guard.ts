import type { Context } from "hono";
import R, { bodyCheck, checkException } from "../../utils/r";
import { addRecord, getAllRecords, getRecordByPrefix, modifyRecord, removeRecord } from "../../database/dao";
import { GuardRecord } from "../../database/type";
import { logReqOk } from "../../utils/logger";

export async function getGuardRuleByPrefix(c: Context) {
  const prefix = c.req.query('prefix');
  const { res } = await checkException(c, !prefix, `prefix=${prefix}`, 'MISSING_PARAM')
  if (res) {
    return res;
  }
  const rs = (await getRecordByPrefix(prefix!))?.value;
  await logReqOk(c, `prefix=${prefix}`, rs);
  return c.json(R.ok(rs ?? null))
}

export async function getAllGuardRule(c: Context) {
  const rs = (await getAllRecords() || []).map(e => e.value);
  await logReqOk(c, null, rs);
  return c.json(R.ok(rs))
}

export async function postGuardRule(c: Context) {
  const { hasBody, res } = await bodyCheck(c)
  if (!hasBody) {
    return res;
  }
  const body = await new Response(c.req.body).json<GuardRecord | GuardRecord[]>();
  const rules = (body ? Array.isArray(body) ? body : [body] : [])
    .map(e => GuardRecord.parse(e))
    .filter(e => !!e) as GuardRecord[]

  const exception = await checkException(c, !rules.length, body, 'MISSING_BODY')
  if (exception.res) {
    return exception.res;
  }

  const rs = await addRecord(rules);
  await logReqOk(c, body, rs);
  return c.json(R.ok(rs))
}

export async function modifyGuardRule(c: Context) {
  const { hasBody, res } = await bodyCheck(c)
  if (!hasBody) {
    return res;
  }
  const body = await new Response(c.req.body).json<{ prefix: string, next: GuardRecord }>();
  const nextRule = GuardRecord.parse(body.next)

  const exception = await checkException(c, !body?.prefix || !nextRule, body, 'MISSING_BODY')
  if (exception.res) {
    return exception.res;
  }

  const rs = await modifyRecord(body.prefix, nextRule!);
  await logReqOk(c, body, rs);
  return c.json(R.ok(rs))
}

export async function removeGuardRule(c: Context) {
  const { hasBody, res } = await bodyCheck(c)
  if (!hasBody) {
    return res;
  }
  const body = await new Response(c.req.body).json<{ prefix: string }>();
  const exception = await checkException(c, !body?.prefix, body, 'MISSING_BODY')
  if (exception.res) {
    return exception.res;
  }
  const rs = await removeRecord(body.prefix);
  await logReqOk(c, body, rs);
  return c.json(R.ok(rs))
}
