import { connectRedis, connectSQLite, closeSQLite, USER_SET_KEY, USER_SET_TABLE } from "../connection";
import { User } from "../type";
import { isRedis, isSQLite } from "../utils";

export class UserDAOForRedis {
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

export class UserDAOForSQLite {
  static async getAllUser(cause?: string) {
    const client = await connectSQLite(
      `[UserDAO] Searching all users ${cause ? `by ${cause}` : ""}`,
    );
    const rs = client.query(`SELECT * FROM ${USER_SET_TABLE};`);
    const data = rs.all().map(e => {
      return {
        value: User.parse(e as User),
        raw: JSON.stringify(e)
      }
    });
    await closeSQLite(client, cause);
    return data;
  }

  static async getUserByName(name: string) {
    const cause = `Querying user '${name}'`;
    const client = await connectSQLite(cause);
    const rs = client.query(`SELECT * FROM ${USER_SET_TABLE} where name = ?1;`)
    const data = rs.get(name);
    await closeSQLite(client, cause);
    return data ? {
      value: User.parse(data as User),
      raw: JSON.stringify(data)
    } : null;
  }

  static async addUser(users: User[]) {
    const names = users.map((e) => e.name).join(",");
    const cause = `[UserDAO] Adding '${names}' users`
    const db = await connectSQLite(cause);
    const insert = db.prepare(`INSERT INTO ${USER_SET_TABLE} (name, password) VALUES ($name, $password)`);
    const insertUsers = db.transaction(iUsers => {
      for (const user of iUsers) insert.run(user);
      return iUsers.length
    });
    const count = insertUsers(users.map(e => ({ $name: e.name, $password: e.password })));
    await closeSQLite(db, cause);
    return count;
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
    const cause = `[UserDAO] Removing '${record.value.name}' record`;
    const client = await connectSQLite(cause);
    const del = client.prepare(`DELETE FROM ${USER_SET_TABLE} WHERE name = $name;`);
    const delUsers = client.transaction(users => {
      for (const user of users) del.run(user);
      return users.length;
    });
    const count = delUsers([{ $name: record.value.name }]);
    await closeSQLite(client, cause);
    return count;
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

function defaultUserDAO() {
  return UserDAOForSQLite;
}

function useUserDAO() {
  return isRedis() ? UserDAOForRedis
    : isSQLite() ? UserDAOForSQLite
      : defaultUserDAO();
}

export class UserDAO {
  static getAllUser(cause?: string) {
    return useUserDAO().getAllUser(cause);
  }

  static getUserByName(name: string) {
    return useUserDAO().getUserByName(name);
  }

  static addUser(users: User[]) {
    return useUserDAO().addUser(users);
  }

  static removeUser(nameOrUser: string | User) {
    return useUserDAO().removeUser(nameOrUser);
  }

  static modifyUser(name: string, next: User) {
    return useUserDAO().modifyUser(name, next);
  }
}
