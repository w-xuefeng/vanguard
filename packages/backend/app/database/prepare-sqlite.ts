import { Database } from "bun:sqlite";

export const RULE_SET_TABLE = "vanguard_rules";
export const USER_SET_TABLE = "vanguard_users";
export const KEY_SET_TABLE = "vanguard_keys";

export default function prepareSQLite(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS ${USER_SET_TABLE} (
      name TEXT PRIMARY KEY,
      password TEXT NOT NULL
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS ${RULE_SET_TABLE} (
      prefix TEXT PRIMARY KEY,
      nextOrigin TEXT NOT NULL,
      banList TEXT NOT NULL,
      pickList TEXT NOT NULL,
      checkers TEXT NOT NULL,
      ignorePrefix TEXT NOT NULL
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS ${KEY_SET_TABLE} (
      name TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}
