export enum HTTP_CODE {
  BAN = 401,
  NOT_FOUND = 404,
  CHECK_FAIL = 405,
  REQ_EXCEPTION = 406,
  MISSING_BODY = 407,
  MISSING_PARAM = 408
}

export enum HTTP_MSG {
  BAN = 'Access denied',
  NOT_FOUND = 'Not found',
  CHECK_FAIL = 'Condition is not satisfied',
  REQ_EXCEPTION = 'Request exception',
  MISSING_BODY = 'Missing request body',
  MISSING_PARAM = 'Missing request parameters'
}
