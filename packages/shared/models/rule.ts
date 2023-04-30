export enum IBPType {
  path = "path",
  ip = "ip",
}

export interface IBPItem {
  content: string;
  type: IBPType;
}

export interface IGuardRecord {
  prefix: string;
  nextOrigin: string;
  banList: IBPItem[];
  pickList: IBPItem[];
  checkers: string[];
  ignorePrefix?: boolean;
}
