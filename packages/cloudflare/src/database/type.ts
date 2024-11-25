import { JSONSafeParse } from "../utils";

export enum IBPType {
  path = "path",
  ip = "ip",
  ipath = 'ipath'
}

export interface IBPItem {
  content: string;
  type: IBPType;
}

export function parseString<T extends object = any>(mayBeString: T | string, defaultValue?: T) {
  return typeof mayBeString === 'string' ? JSONSafeParse<T>(mayBeString) || defaultValue : mayBeString
}

export function parseBoolean(mayBeBoolean: boolean | 'true' | 'false') {
  return typeof mayBeBoolean === 'boolean' ? mayBeBoolean : mayBeBoolean === 'true'
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
      parseString<string[]>(record.checkers),
      parseString<IBPItem[]>(record.banList),
      parseString<IBPItem[]>(record.pickList),
      parseBoolean(record.ignorePrefix),
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
