import { connectRedis, RULE_SET_KEY, USER_SET_KEY } from "./connection";
import { GuardRecord, User } from "./type";

export class RuleDAO {
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

export class UserDAO {
  static async getAllUser(cause?: string) {
    const client = await connectRedis(
      `[UserDAO] Searching all users ${cause ? `by ${cause}` : ""}`,
    );
    const rs = await client.sMembers(USER_SET_KEY);
    await client.disconnect();
    return rs.map((e) => ({
      value: User.parse(e),
      raw: e,
    }));
  }

  static async getUserByName(name: string) {
    const rs = await this.getAllUser(`Querying user '${name}'`);
    return rs.findLast((e) => e?.value?.name === name);
  }

  static async addUser(users: User[]) {
    const all = await this.getAllUser();
    if (users.some((u) => all.some((e) => e.value?.name === u.name))) {
      return 0;
    }
    const names = users.map((e) => e.name).join(",");
    const client = await connectRedis(`[UserDAO] Adding '${names}' users`);
    const rs = await client.sAdd(USER_SET_KEY, users.map((e) => e.toString()));
    await client.disconnect();
    return rs;
  }

  static async removeUser(nameOrUser: string | User) {
    const record = {
      raw: "",
      value: null as User | null,
    };
    if (typeof nameOrUser === "string") {
      const { raw, value } = await this.getUserByName(nameOrUser) || record;
      record.raw = raw;
      record.value = value;
    } else {
      record.raw = nameOrUser.toString();
      record.value = nameOrUser;
    }
    if (!record.raw || !record.value) {
      return 0;
    }
    const client = await connectRedis(
      `[UserDAO] Removing '${record.value.name}' record`,
    );
    const rs = await client.sRem(USER_SET_KEY, record.raw);
    await client.disconnect();
    return rs;
  }

  static async modifyUser(name: string, next: User) {
    if (name !== next.name) {
      return 0;
    }
    await this.removeUser(name);
    const rs = await this.addUser([next]);
    return rs;
  }
}
