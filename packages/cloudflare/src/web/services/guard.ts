import type { Context } from "hono";
import R, {
  bodyCheck,
  checkException,
  useAuthInterceptor,
} from "../../utils/r";
import { RuleDAO, UserDAO } from "../../database/dao";
import { GuardRecord, User } from "../../database/type";
import { logReqFail, logReqOk } from "../../utils/logger";
import { encodeUserPassword } from "../../utils";
import { EMPTY_PLACEHOLDER, HTTP_CODE, HTTP_MSG } from "../../guard/const";
import { encodeToken } from "../../utils/token";

/**
 * Rule begin
 */

export async function getGuardRuleByPrefix(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const prefix = c.req.query("prefix");
  const { res } = await checkException(
    c,
    !prefix,
    `prefix=${prefix}`,
    "MISSING_PARAM",
  );
  if (res) {
    return res;
  }
  const rs = (await RuleDAO.getRecordByPrefix(c, prefix!))?.value;
  logReqOk(c, `prefix=${prefix}`, rs);
  return c.json(R.ok(rs ?? null));
}

export async function getAllGuardRule(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const rs = ((await RuleDAO.getAllRecords(c)) || []).map((e) => e.value);
  logReqOk(c, null, rs);
  return c.json(R.ok(rs));
}

export async function postGuardRule(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as GuardRecord | GuardRecord[];
  const rules = (body ? (Array.isArray(body) ? body : [body]) : [])
    .map((e) => GuardRecord.parse(e))
    .filter((e) => !!e) as GuardRecord[];

  const exception = await checkException(
    c,
    !rules.length,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }

  const rs = await RuleDAO.addRecord(c, rules);
  if (!rs) {
    logReqFail(c, HTTP_CODE.RULE_EXIST, body, rs);
    return c.json(R.fail(HTTP_CODE.RULE_EXIST, HTTP_MSG.RULE_EXIST));
  }

  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

export async function modifyGuardRule(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as {
    prefix: string;
    next: GuardRecord;
  };
  const nextRule = GuardRecord.parse(body.next);

  const exception = await checkException(
    c,
    !body?.prefix || !nextRule,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }

  const rs = await RuleDAO.modifyRecord(c, body.prefix, nextRule!);
  if (!rs) {
    logReqFail(c, HTTP_CODE.MODIFY_FAIL, body, rs);
    return c.json(R.fail(HTTP_CODE.MODIFY_FAIL, HTTP_MSG.MODIFY_FAIL));
  }

  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

export async function removeGuardRule(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as { prefix: string };
  const exception = await checkException(
    c,
    !body?.prefix,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }
  const rs = await RuleDAO.removeRecord(c, body.prefix);
  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

/**
 * Rule end
 */

/**
 * User begin
 */

export async function getUserByName(
  c: Context<{ Bindings: CloudflareBindings }>,
) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const name = c.req.query("name");
  const { res } = await checkException(
    c,
    !name,
    `name=${name}`,
    "MISSING_PARAM",
  );
  if (res) {
    return res;
  }
  const rs = (await UserDAO.getUserByName(c, name!))?.value;
  if (rs) {
    rs.password = EMPTY_PLACEHOLDER.STRING;
  }
  logReqOk(c, `name=${name}`, rs);
  return c.json(R.ok(rs ?? null));
}

export async function getAllUser(c: Context<{ Bindings: CloudflareBindings }>) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const rs = ((await UserDAO.getAllUser(c)) || []).map((e) => {
    const user = e.value;
    if (user) {
      user.password = EMPTY_PLACEHOLDER.STRING;
    }
    return user;
  });
  logReqOk(c, null, rs);
  return c.json(R.ok(rs));
}

export async function postUser(c: Context<{ Bindings: CloudflareBindings }>) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as User | User[];
  const users = (body ? (Array.isArray(body) ? body : [body]) : [])
    .map((e) => User.parse(e))
    .filter((e) => !!e) as User[];

  const exception = await checkException(
    c,
    !users.length,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }

  const encodeUsers = await Promise.all(
    users.map((u) => encodeUserPassword(u)),
  );
  const rs = await UserDAO.addUser(c, encodeUsers);
  if (!rs) {
    logReqFail(c, HTTP_CODE.USER_EXIST, body, rs);
    return c.json(R.fail(HTTP_CODE.USER_EXIST, HTTP_MSG.USER_EXIST));
  }
  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

export async function modifyUser(c: Context) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as {
    name: string;
    next: User;
  };
  const nextUser = User.parse(body.next);

  const exception = await checkException(
    c,
    !body?.name || !nextUser,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }

  const rs = await UserDAO.modifyUser(
    c,
    body.name,
    await encodeUserPassword(nextUser!),
  );
  if (!rs) {
    logReqFail(c, HTTP_CODE.MODIFY_FAIL, body, rs);
    return c.json(R.fail(HTTP_CODE.MODIFY_FAIL, HTTP_MSG.MODIFY_FAIL));
  }

  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

export async function removeUser(c: Context) {
  const authCheck = await useAuthInterceptor(c);
  if (authCheck.res) {
    return authCheck.res;
  }
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as { name: string };
  const exception = await checkException(c, !body?.name, body, "MISSING_BODY");
  if (exception.res) {
    return exception.res;
  }
  const rs = await UserDAO.removeUser(c, body.name);
  logReqOk(c, body, rs);
  return c.json(R.ok(rs));
}

export async function login(c: Context<{ Bindings: CloudflareBindings }>) {
  const { hasBody, res } = await bodyCheck(c);
  if (!hasBody) {
    return res;
  }
  const body = (await res.json()) as User;
  const user = User.parse(body);

  const exception = await checkException(
    c,
    !user?.name || !user?.password,
    body,
    "MISSING_BODY",
  );
  if (exception.res) {
    return exception.res;
  }
  const rs = await UserDAO.getUserByName(c, user!.name);
  const userException = await checkException(
    c,
    !rs?.value || !rs?.raw,
    body,
    "USER_NOT_FOUND",
  );

  if (userException.res) {
    return userException.res;
  }

  const password = (await encodeUserPassword(user!)).password;
  const passwordException = await checkException(
    c,
    password !== rs?.value?.password,
    body,
    "PASSWORD_ERROR",
  );
  if (passwordException.res) {
    return passwordException.res;
  }

  const token = await encodeToken(c, rs!.value!.name!);
  const data = {
    token,
    name: body.name,
  };
  logReqOk(c, body, data);
  return c.json(R.ok(data));
}
/**
 * User end
 */
