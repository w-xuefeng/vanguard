import type { IBPItem } from "./type";


/**
 * query nextOrigin and guard-rules and ban-pick-List form database by prefix
 * const rs = await queryGuardsByPrefix(prefix);
 * rs.banList     ->  IBPItem[]
 * rs.pickList    ->  IBPItem[]
 * rs.checkers    ->  string[]
 * rs.nextOrigin  ->  string
 */
export async function queryGuardsByPrefix(prefix?: string) {
  const rs = {
    banList: [] as IBPItem[],
    pickList: [] as IBPItem[],
    checkers: [] as string[],
    nextOrigin: '',
  }
  if (!prefix) {
    return rs;
  }
  // query nextOrigin and guard-rules and ban-pick-List form database by prefix
  return rs;
}
