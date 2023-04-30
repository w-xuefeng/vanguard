import { JSONSafeParse } from "../utils";

export enum IBPType {
  path = "path",
  ip = "ip",
}

export interface IBPItem {
  content: string;
  type: IBPType;
}

export class GuardRecord {
  prefix: string;
  nextOrigin: string;
  banList: IBPItem[];
  pickList: IBPItem[];
  checkers: string[];
  ignorePrefix?: boolean;
  constructor(
    prefix: string,
    nextOrigin: string,
    checkers: string[] = [],
    banList: IBPItem[] = [],
    pickList: IBPItem[] = [],
    ignorePrefix = false,
  ) {
    this.prefix = prefix;
    this.nextOrigin = nextOrigin;
    this.checkers = checkers;
    this.banList = banList;
    this.pickList = pickList;
    this.ignorePrefix = ignorePrefix;
  }

  toString() {
    return JSON.stringify(this);
  }

  static parse(
    originalRecord?: string | null | GuardRecord | Record<string, any>,
  ) {
    const record = typeof originalRecord === "string"
      ? JSONSafeParse<GuardRecord>(originalRecord)
      : originalRecord;

    if (!record) {
      return null;
    }

    return new GuardRecord(
      record.prefix,
      record.nextOrigin,
      record.checkers,
      record.banList,
      record.pickList,
      record.ignorePrefix,
    );
  }
}

export class User {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  toString() {
    return JSON.stringify(this);
  }

  static parse(originalRecord?: string | null | User | Record<string, any>) {
    const record = typeof originalRecord === "string"
      ? JSONSafeParse<User>(originalRecord)
      : originalRecord;

    if (!record) {
      return null;
    }
    return new User(
      record.name,
      record.password,
    );
  }
}
