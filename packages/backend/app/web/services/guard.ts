import type { Context } from "hono";
import R from "../../utils/r";
import { queryGuardsByPrefix } from "../../database";
import { addRecord, getAllRecords } from "../../database/dao";
import { GuardRecord } from "../../database/type";
import { HTTP_CODE, HTTP_MSG } from "../../guard/const";

export async function getGuardRuleByPrefix(c: Context) {
  const prefix = c.req.query('prefix');
  const rs = await queryGuardsByPrefix(prefix);
  return c.json(R.ok(rs))
}

export async function getAllGuardRule(c: Context) {
  const rs = await getAllRecords();
  return c.json(R.ok(rs))
}

export async function postGuardRule(c: Context) {
  const body = await new Response(c.req.body).json<GuardRecord | GuardRecord[]>();
  const rules = body ? Array.isArray(body) ? body : [body] : []
  if (!rules.length) {
    return c.json(R.fail(HTTP_CODE.MISSING_BODY, HTTP_MSG.MISSING_BODY))
  }
  const rs = await addRecord(rules);
  return c.json(R.ok(rs))
}
