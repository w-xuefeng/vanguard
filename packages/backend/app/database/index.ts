import { logErr } from "../utils/logger";
import { RuleDAO } from "./dao";
import { type IChecker } from "@vanguard/shared/checker/types";
import { type IBPItem } from "./type";

/**
 * query nextOrigin and guard-rules and ban-pick-List form database by prefix
 * const rs = await queryGuardsByPrefix(prefix);
 * rs.banList     ->  IBPItem[]
 * rs.pickList    ->  IBPItem[]
 * rs.checkers    ->  IChecker[]
 * rs.nextOrigin  ->  string
 */
export async function queryGuardsByPrefix(prefix?: string) {
  const rs = {
    banList: [] as IBPItem[],
    pickList: [] as IBPItem[],
    checkers: [] as IChecker[],
    nextOrigin: "",
    ignorePrefix: false,
  };
  if (!prefix) {
    return rs;
  }

  try {
    const record = (await RuleDAO.getRecordByPrefix(prefix))?.value;
    if (!record) {
      return rs;
    }
    return record;
  } catch (error) {
    logErr(error, `QueryGuardsByPrefix "${prefix}" Error:`);
    return rs;
  }
}
