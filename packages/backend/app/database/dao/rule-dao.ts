
import { closeSQLite, connectRedis, connectSQLite, RULE_SET_KEY, RULE_SET_TABLE } from "../connection";
import { GuardRecord } from "../type";
import { isRedis, isSQLite } from "../utils";

export class RuleDAOForRedis {
  static async getAllRecords(cause?: string) {
    const client = await connectRedis(
      `[RuleDAO] Searching all records ${cause ? `by ${cause}` : ""}`,
    );
    const rs = await client.sMembers(RULE_SET_KEY);
    await client.disconnect();
    return rs.map((e) => ({
      value: GuardRecord.parse(e),
      raw: e,
    }));
  }

  static async getRecordByPrefix(prefix: string) {
    const rs = await this.getAllRecords(`Querying '${prefix}'`);
    return rs.findLast((e) => e?.value?.prefix === prefix);
  }

  static async addRecord(record: GuardRecord[]) {
    const all = await this.getAllRecords();
    if (record.some((r) => all.some((e) => e.value?.prefix === r.prefix))) {
      return 0;
    }
    const prefixes = record.map((e) => e.prefix).join(",");
    const client = await connectRedis(`[RuleDAO] Adding '${prefixes}' record`);
    const rs = await client.sAdd(RULE_SET_KEY, record.map((e) => e.toString()));
    await client.disconnect();
    return rs;
  }

  static async removeRecord(prefixOrRecord: string | GuardRecord) {
    const record = {
      raw: "",
      value: null as GuardRecord | null,
    };
    if (typeof prefixOrRecord === "string") {
      const { raw, value } = await this.getRecordByPrefix(prefixOrRecord) ||
        record;
      record.raw = raw;
      record.value = value;
    } else {
      record.raw = prefixOrRecord.toString();
      record.value = prefixOrRecord;
    }
    if (!record.raw || !record.value) {
      return 0;
    }
    const client = await connectRedis(
      `[RuleDAO] Removing '${record.value.prefix}' record`,
    );
    const rs = await client.sRem(RULE_SET_KEY, record.raw);
    await client.disconnect();
    return rs;
  }

  static async modifyRecord(prefix: string, next: GuardRecord) {
    if (prefix !== next.prefix) {
      return 0;
    }
    await this.removeRecord(prefix);
    const rs = await this.addRecord([next]);
    return rs;
  }
}

export class RuleDAOForSQLite {
  static async getAllRecords(cause?: string) {
    const client = await connectSQLite(
      `[RuleDAO] Searching all records ${cause ? `by ${cause}` : ""}`,
    );
    const rs = client.query(`SELECT * FROM ${RULE_SET_TABLE};`);
    const data = rs.all().map(e => {
      return {
        value: GuardRecord.parse(e as GuardRecord),
        raw: GuardRecord.parse(e as GuardRecord)?.toString() || JSON.stringify(e)
      }
    });
    await closeSQLite(client, cause);
    return data;
  }

  static async getRecordByPrefix(prefix: string) {
    const cause = `Querying '${prefix}'`;
    const client = await connectSQLite(cause);
    const rs = client.query(`SELECT * FROM ${RULE_SET_TABLE} where prefix = ?1;`)
    const data = rs.get(prefix);
    await closeSQLite(client, cause);
    return data ? {
      value: GuardRecord.parse(data as GuardRecord),
      raw: GuardRecord.parse(data as GuardRecord)?.toString() || JSON.stringify(data)
    } : null;
  }

  static async addRecord(record: GuardRecord[]) {
    const all = await this.getAllRecords();
    if (record.some((r) => all.some((e) => e.value?.prefix === r.prefix))) {
      return 0;
    }
    const prefixes = record.map((e) => e.prefix).join(",");
    const cause = `[RuleDAO] Adding '${prefixes}' record`
    const db = await connectSQLite(cause);
    const insert = db.prepare(`INSERT INTO ${RULE_SET_TABLE} (prefix, nextOrigin, banList, pickList, checkers, ignorePrefix) VALUES ($prefix, $nextOrigin, $banList, $pickList, $checkers, $ignorePrefix)`);
    const insertRecords = db.transaction(iRecords => {
      for (const record of iRecords) insert.run(record);
      return iRecords.length
    });
    const count = insertRecords(record.map(e => ({
      $prefix: e.prefix,
      $nextOrigin: e.nextOrigin,
      $banList: JSON.stringify(e.banList || []),
      $pickList: JSON.stringify(e.pickList || []),
      $checkers: JSON.stringify(e.checkers || []),
      $ignorePrefix: `${e.ignorePrefix || false}`
    })));
    await closeSQLite(db, cause);
    return count;
  }

  static async removeRecord(prefixOrRecord: string | GuardRecord) {
    const record = {
      raw: "",
      value: null as GuardRecord | null,
    };
    if (typeof prefixOrRecord === "string") {
      const { raw, value } = await this.getRecordByPrefix(prefixOrRecord) ||
        record;
      record.raw = raw;
      record.value = value;
    } else {
      record.raw = prefixOrRecord.toString();
      record.value = prefixOrRecord;
    }
    if (!record.raw || !record.value) {
      return 0;
    }
    const cause = `[RuleDAO] Removing '${record.value.prefix}' record`;
    const client = await connectSQLite(cause);
    const del = client.prepare(`DELETE FROM ${RULE_SET_TABLE} WHERE prefix = $prefix;`);
    const delRecords = client.transaction(records => {
      for (const r of records) del.run(r);
      return records.length;
    });
    const count = delRecords([{ $prefix: record.value.prefix }]);
    await closeSQLite(client, cause);
    return count;
  }

  static async modifyRecord(prefix: string, next: GuardRecord) {
    if (prefix !== next.prefix) {
      return 0;
    }
    await this.removeRecord(prefix);
    const rs = await this.addRecord([next]);
    return rs;
  }
}

function defaultRuleDAO() {
  return RuleDAOForSQLite;
}

function useRuleDAO() {
  return isRedis() ? RuleDAOForRedis
    : isSQLite() ? RuleDAOForSQLite
      : defaultRuleDAO();
}

export class RuleDAO {
  static getAllRecords(cause?: string) {
    return useRuleDAO().getAllRecords(cause);
  }

  static getRecordByPrefix(prefix: string) {
    return useRuleDAO().getRecordByPrefix(prefix);
  }

  static addRecord(record: GuardRecord[]) {
    return useRuleDAO().addRecord(record);
  }

  static removeRecord(prefixOrRecord: string | GuardRecord) {
    return useRuleDAO().removeRecord(prefixOrRecord);
  }

  static modifyRecord(prefix: string, next: GuardRecord) {
    return useRuleDAO().modifyRecord(prefix, next);
  }
}
