import { sLog } from "../../utils/logger";
import { USER_SET_KEY } from "../config";
import { User } from "../type";
import type { Context } from "hono";

export class UserDAOForKV {
  static async getAllUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    cause = "[UserDAO] Searching all users",
  ) {
    sLog(cause, "KV");
    const rs = ((await c.env.KV.get(USER_SET_KEY, "json")) || []) as User[];
    return rs.map((e) => ({
      value: User.parse(e),
      raw: e,
    }));
  }

  static async getUserByName(
    c: Context<{ Bindings: CloudflareBindings }>,
    name: string,
  ) {
    const rs = await this.getAllUser(c, `Querying user '${name}'`);
    return rs.findLast((e) => e?.value?.name === name);
  }

  static async addUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    users: User[],
  ) {
    const names = users.map((e) => e.name).join(",");
    const all = (
      await this.getAllUser(c, `[UserDAO] Adding '${names}' users`)
    ).map((e) => e.value);
    if (users.some((u) => all.some((e) => e?.name === u.name))) {
      return 0;
    }
    all.push(...users);
    await c.env.KV.put(USER_SET_KEY, JSON.stringify(all));
    return users.length;
  }

  static async removeUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    nameOrUser: string | User,
  ) {
    const record = {
      raw: "",
      value: null as User | null,
    };
    if (typeof nameOrUser === "string") {
      const { raw, value } =
        (await this.getUserByName(c, nameOrUser)) || record;
      record.raw = raw.toString();
      record.value = value;
    } else {
      record.raw = nameOrUser.toString();
      record.value = nameOrUser;
    }
    if (!record.raw || !record.value) {
      return 0;
    }
    const all = (
      await this.getAllUser(
        c,
        `[UserDAO] Removing '${record.value.name}' record`,
      )
    ).map((e) => e.value);
    const index = all.findIndex((e) => e?.name === record.value?.name);
    all.splice(index, 1);
    await c.env.KV.put(USER_SET_KEY, JSON.stringify(all));
    return 1;
  }

  static async modifyUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    name: string,
    next: User,
  ) {
    if (name !== next.name) {
      return 0;
    }
    await this.removeUser(c, name);
    const rs = await this.addUser(c, [next]);
    return rs;
  }
}

function useUserDAO() {
  return UserDAOForKV;
}

export class UserDAO {
  static getAllUser(c: Context<{ Bindings: CloudflareBindings }>) {
    return useUserDAO().getAllUser(c);
  }

  static getUserByName(
    c: Context<{ Bindings: CloudflareBindings }>,
    name: string,
  ) {
    return useUserDAO().getUserByName(c, name);
  }

  static addUser(c: Context<{ Bindings: CloudflareBindings }>, users: User[]) {
    return useUserDAO().addUser(c, users);
  }

  static removeUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    nameOrUser: string | User,
  ) {
    return useUserDAO().removeUser(c, nameOrUser);
  }

  static modifyUser(
    c: Context<{ Bindings: CloudflareBindings }>,
    name: string,
    next: User,
  ) {
    return useUserDAO().modifyUser(c, name, next);
  }
}
