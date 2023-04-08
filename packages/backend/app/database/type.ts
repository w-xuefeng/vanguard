export enum IBPType {
  path = 'path',
  ip = 'ip'
}

export interface IBPItem {
  content: string;
  type: IBPType
}
