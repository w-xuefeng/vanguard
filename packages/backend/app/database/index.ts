/**
 * query nextOrigin and guard-rules and ban-pick-List form database by prefix
 * const rs = await queryGuardsByPrefix(prefix);
 * rs.banList     ->  string[]
 * rs.pickList    ->  string[]
 * rs.checkers    ->  string[]
 * rs.nextOrigin  ->  string
 */
export async function queryGuardsByPrefix(prefix?: string) {
  const rs = {
    banList: [] as string[],
    pickList: [] as string[],
    checkers: [] as string[],
    nextOrigin: '',
  }
  if (!prefix) {
    return rs;
  }
  // query nextOrigin and guard-rules and ban-pick-List form database by prefix
  return rs;
}
