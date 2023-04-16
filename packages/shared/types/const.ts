export enum HTTP_CODE {
  OK = 200,
  BAN = 401,
  NOT_FOUND = 404,
  USER_NOT_FOUND = 4040,
  CHECK_FAIL = 405,
  REQ_EXCEPTION = 406,
  MISSING_BODY = 407,
  MISSING_PARAM = 408,
  PASSWORD_ERROR = 409,
  UNAUTHORIZED = 410,
  AUTH_EXPIRED = 411,
  ILLEGAL_ACCESS = 412,
}

export enum HTTP_MSG {
  OK = 'OK',
  BAN = 'Access denied',
  NOT_FOUND = 'Not found',
  USER_NOT_FOUND = 'User not found',
  CHECK_FAIL = 'Condition is not satisfied',
  REQ_EXCEPTION = 'Request exception',
  MISSING_BODY = 'Missing request body',
  MISSING_PARAM = 'Missing request parameters',
  PASSWORD_ERROR = 'Password error',
  UNAUTHORIZED = 'Unauthorized access',
  AUTH_EXPIRED = 'Authorization expiration',
  ILLEGAL_ACCESS = 'Illegal access'
}
