import { JSONSafeParse } from "../utils";

export enum IBPType {
  path = 'path',
  ip = 'ip'
}

export interface IBPItem {
  content: string;
  type: IBPType
}

export class GuardRecord {
  prefix: string;
  nextOrigin: string;
  banList: IBPItem[];
  pickList: IBPItem[];
  checkers: string[];
  constructor(
    prefix: string,
    nextOrigin: string,
    checkers: string[] = [],
    banList: IBPItem[] = [],
    pickList: IBPItem[] = []
  ) {
    this.prefix = prefix;
    this.nextOrigin = nextOrigin;
    this.checkers = checkers;
    this.banList = banList;
    this.pickList = pickList;
  }

  toString() {
    return JSON.stringify(this);
  }

  static parse(originalRecord?: string | null | GuardRecord | Record<string, any>) {
    const record = typeof originalRecord === 'string'
      ? JSONSafeParse<GuardRecord>(originalRecord)
      : originalRecord;

    if (!record) {
      return null
    }

    return new GuardRecord(
      record.prefix,
      record.nextOrigin,
      record.checkers,
      record.banList,
      record.pickList,
    )
  }
}
