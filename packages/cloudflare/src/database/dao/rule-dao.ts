import { sLog } from "../../utils/logger";
import { RULE_SET_KEY } from "../config";
import { GuardRecord } from "../type";
import type { Context } from "hono";

export class RuleDAOForKV {
  static context = {};
  static async getAllRecords(
    c: Context<{ Bindings: CloudflareBindings }>,
    cause = "[RuleDAO] Searching all rules",
  ) {
    sLog(cause, "KV");
    const rs = ((await c.env.KV.get(RULE_SET_KEY, "json")) ||
      []) as GuardRecord[];
    return rs.map((e) => ({
      value: GuardRecord.parse(e),
      raw: e,
    }));
  }

  static async getRecordByPrefix(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefix: string,
  ) {
    const rs = await this.getAllRecords(c, `Querying '${prefix}'`);
    return rs.findLast((e) => e?.value?.prefix === prefix);
  }

  static async addRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    record: GuardRecord[],
  ) {
    const prefixes = record.map((e) => e.prefix).join(",");
    const all = (
      await this.getAllRecords(c, `[RuleDAO] Adding '${prefixes}' record`)
    ).map((e) => e.value);
    if (record.some((r) => all.some((e) => e?.prefix === r.prefix))) {
      return 0;
    }
    all.push(...record);
    await c.env.KV.put(RULE_SET_KEY, JSON.stringify(all));
    return record.length;
  }

  static async removeRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefixOrRecord: string | GuardRecord,
  ) {
    const record = {
      raw: "",
      value: null as GuardRecord | null,
    };
    if (typeof prefixOrRecord === "string") {
      const { raw, value } =
        (await this.getRecordByPrefix(c, prefixOrRecord)) || record;
      record.raw = raw.toString();
      record.value = value;
    } else {
      record.raw = prefixOrRecord.toString();
      record.value = prefixOrRecord;
    }
    if (!record.raw || !record.value) {
      return 0;
    }
    const all = (
      await this.getAllRecords(
        c,
        `[RuleDAO] Removing '${record.value.prefix}' record`,
      )
    ).map((e) => e.value);
    const index = all.findIndex((e) => e?.prefix === record.value?.prefix);
    all.splice(index, 1);
    await c.env.KV.put(RULE_SET_KEY, JSON.stringify(all));
    return 1;
  }

  static async modifyRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefix: string,
    next: GuardRecord,
  ) {
    if (prefix !== next.prefix) {
      return 0;
    }
    await this.removeRecord(c, prefix);
    const rs = await this.addRecord(c, [next]);
    return rs;
  }
}

function useRuleDAO() {
  return RuleDAOForKV;
}

export class RuleDAO {
  static getAllRecords(
    c: Context<{ Bindings: CloudflareBindings }>,
    cause?: string,
  ) {
    return useRuleDAO().getAllRecords(c, cause);
  }

  static getRecordByPrefix(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefix: string,
  ) {
    return useRuleDAO().getRecordByPrefix(c, prefix);
  }

  static addRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    record: GuardRecord[],
  ) {
    return useRuleDAO().addRecord(c, record);
  }

  static removeRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefixOrRecord: string | GuardRecord,
  ) {
    return useRuleDAO().removeRecord(c, prefixOrRecord);
  }

  static modifyRecord(
    c: Context<{ Bindings: CloudflareBindings }>,
    prefix: string,
    next: GuardRecord,
  ) {
    return useRuleDAO().modifyRecord(c, prefix, next);
  }
}
