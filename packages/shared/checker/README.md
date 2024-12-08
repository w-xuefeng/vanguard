# Vanguard Checker


## operator

The operator is used to compare the expected value and the target value, with the following values

| operator | description |
| -------- | ----------- |
| `==`| value == expectValue |
| `===` | value === expectValue |
| `>` | value is necessary and value > expectValue |
| `>=` | value is necessary and value >= expectValue |
| `<` | value is necessary and value < expectValue |
| `<=` | value is necessary and value <= expectValue |
| `!=` | value != expectValue |
| `!==` | value !== expectValue |
| `includes` | value is necessary and value includes expectValue |
| `startsWith` | value is necessary and value startsWith expectValue |
| `endsWith` | value is necessary and value endsWith expectValue |
| `back-includes` | expectValue includes value |
| `back-startsWith` | expectValue startsWith value |
| `back-endsWith` | expectValue endsWith value |
| `any-includes` | includes or back-includes|
| `any-startsWith` | startsWith or back-startsWith |
| `any-endsWith` | endsWith or back-endsWith |

<details>
  <summary>
    source code
  </summary>

  <p>

  ```ts
  if (!operator) {
    return value == expectValue;
  }
  const valueNecessary = value !== null && value !== void 0; 
  return {
    "==": value == expectValue,
    "===": value === expectValue,
    ">": valueNecessary && value > expectValue,
    ">=": valueNecessary && value >= expectValue,
    "<": valueNecessary && value < expectValue,
    "<=": valueNecessary && value <= expectValue,
    "!=": value != expectValue,
    "!==": value !== expectValue,
    includes: valueNecessary && String(value).includes(`${expectValue}`),
    startsWith: valueNecessary && String(value).startsWith(`${expectValue}`),
    endsWith: valueNecessary && String(value).endsWith(`${expectValue}`),
    "back-includes": String(expectValue).includes(`${value}`),
    "back-startsWith": String(expectValue).startsWith(`${value}`),
    "back-endsWith": String(expectValue).endsWith(`${value}`),
    "any-includes":
      (valueNecessary && String(value).includes(`${expectValue}`)) ||
      String(expectValue).includes(`${value}`),
    "any-startsWith":
      (valueNecessary && String(value).startsWith(`${expectValue}`)) ||
      String(expectValue).startsWith(`${value}`),
    "any-endsWith":
      (valueNecessary && String(value).endsWith(`${expectValue}`)) ||
      String(expectValue).endsWith(`${value}`),
  }[operator]
  ```

  </p>

</details>

## checker

The checker is an object, such as

```json
{
  "where": {
    "type": "path",
    "expectValue": "/prefix/api/",
    "operator": "startsWith"
  },
  "type": "remote",
  "url": "https://auth.user-center-example.com/public/v1/token/verify",
  "method": "post",
  "body": {
    "token": "$header(Authorization)"
  },
  "nextField": [
    "data",
    "valid"
  ],
  "messageField": [
    "data",
    "message"
  ],
  "message": "token invalid"
}
```

which generally contains the following properties

| Property | Description | Required |
| - | - | - |
| `type` | The types of checkers, with values as shown below | Required |
| `expectValue` | Expected value | Required |
| `parseValue` | Methods for parsing target values and expected values，with values as shown above, default value is `value => value` | Optional |
| `operator` | Operator, with values as shown above, default value is `==` | Optional |
| `pattern` | Regular expression string with higher priority than `operator` | Optional |
| `patternFlags` | A string of regular matching flags, (`g`, `i`, `m`, `s`, `u`, `y`) | Optional |
| `message` | Error message returned when not satisfied | Optional |
| `headerName` (only type is `headers`) | The header attribute name to be detected | Required only type is `headers` |
| `queryName` (only type is `query` or `queries`) | The URLSearchParams name to be detected | Required only type is `query` or `queries` |
| `checkType` (only type is `queries`) | Detect one or all, with values of `all` \| `single`' | Optional |
| `expectAllValue` (only type is `queries`) | Expected value array | Optional |
| `index` (only type is `queries` and checkType is `single`) | the query index | Optional |
| `bodyType` (only type is `body`) | The type of the request body takes the following values: `json` \| `text` \| `formData` \| `blob` | Required only type is `body` |
| `property` (only type is `body`) | To detect the property of the request body | Required only type is `body` |
| `fileProperty` (only type is `body` and bodyType is `formData` or `blob`) | The property name of `File` or `Blob`, such as `name`、`size`、`type` | Required only type is `body` and bodyType is `formData` or `blob` |
| `url` (only type is `remote`) | The URL of a remote API | Required only type is `remote |
| `method` (only type is `remote`) | The request method of a remote API, default is `GET` | Optional |
| `headers` (only type is `remote`) | The request headers of a remote API  | Optional |
| `body` (only type is `remote`) | The request body of a remote API, if it is necessary | Optional |
| `nextField` (only type is `remote`) | The remote API response body verification result field, in string array format, such as: `["grandparent", "parent", "next"]`, default `["next"]` | Optional |
| `messageField` (only type is `remote`) | The remote API response body verification result message field, in string array format, such as: `["grandparent", "parent", "message"]`, default `["message"]` | Optional |
| `timeout` (only type is `remote`) | The request timeout of a remote API, default is 5000ms, request timeout means verification fails | Optional |
| `expression` (only type is `customExpression`) | Custom expression, this string will be passed to the second parameter of the `new Function`, with the first parameter being the context variable named 'c', and must return an object with `next` value of boolean type | Required only type is `customExpression` |
| `where` | Limit the scope of checker verification. If 'where' is configured, the checker will only be executed if the 'where' condition is met | Optional |
 
The form of `where` is similar to `checker` and is a subset of `checker`

The value of `parseValue` is as follows

| type | description |
| - | - |
| default | value => value |
| `String` | String(value) |
| `Number` | Number(value) |
| `Boolean` | Boolean(value) |

The value of `type` is as follows

| type | description |
| - | - |
| `url` | check context.req.url |
| `path` | check context.req.path |
| `headers` | check context.req.header(headerName) |
| `query` | check context.req.query(queryName) |
| `queries` | check context.req.queries(queryName) |
| `body` | check context.req.body |
| `remote`| check by calling remote interface |
| `customExpression` | custom expression |

## Example of checker

- 1.`url` Checker

```json
{
  "type": "url",
  "expectValue": "https",
  "operator": "startsWith",
  "message": "HTTPS only"
}
```

- 2.`path` Checker

```json
{
  "type": "path",
  "expectValue": "/prefix/specific-path",
  "operator": "startsWith",
  "message": "Only accessible /prefix/specific-path"
}

{
  "type": "path",
  "pattern": "\\/archive\\/\\d{4}\\/\\d{1,2}\\/\\d{1,2}\\/.+$",
  "patternFlags": "i",
  "message": "Only accessible the path with the 'archive/year/month/date/*' pattern"
}

{
  "type": "path",
  "expectValue": "specific-path",
  "operator": "includes",
  "message": "Only accessible the path includes 'specific-path'"
}
```

- 3.`headers` Checker

```json
{
  "type": "headers",
  "headerName": "authorization",
  "expectValue": "Bearer",
  "operator": "startsWith",
  "message": "Access Denied"
}
```

- 4.`query` Checker

```json
{
  "type": "query",
  "queryName": "from",
  "expectValue": "vanguard",
  "operator": "===",
  "message": "Access Denied"
}

{
  "type": "query",
  "queryName": "level",
  "expectValue": 5,
  "parseValue": "Number",
  "operator": ">",
  "message": "the level is too low"
}
```

- 5.`queries` Checker

```json
{
  "type": "queries",
  "queryName": "names",
  "checkType": "single",
  "expectValue": "Amy",
  "operator": "includes",
  "index": 2,
  "message": "the third name must include 'Amy'"
}

{
  "type": "queries",
  "queryName": "from",
  "checkType": "all",
  "expectAllValue": ["shanghai", "beijing"],
  "index": 2,
  "message": "from must be [(shanghai and beijing) or (beijing and shanghai)]"
}
```
- 6.`body` Checker

```json
{
  "type": "body",
  "bodyType": "json",
  "property": "level",
  "expectValue": 10,
  "operator": ">",
  "message": "the level is too low"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "age",
  "expectValue": 18,
  "operator": ">=",
  "message": "the person is too young"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "file",
  "fileProperty": "size",
  "expectValue": 102400,
  "operator": "<",
  "message": "the file is too large"
}

{
  "type": "body",
  "bodyType": "blob",
  "fileProperty": "size",
  "expectValue": 10240,
  "operator": "<=",
  "message": "the file is too large"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "file",
  "fileProperty": "type",
  "expectValue": "image",
  "operator": "includes",
  "message": "This file type is not supported, only image format is supported"
}
```

- 7.`remote` checker

```json
{
  "where": {
    "type": "path",
    "expectValue": "/prefix/api/",
    "operator": "startsWith"
  },
  "type": "remote",
  "url": "https://auth.user-center-example.com/public/v1/token/verify",
  "method": "post",
  "body": {
    "token": "$header(Authorization)"
  },
  "nextField": [
    "data",
    "valid"
  ],
  "messageField": [
    "data",
    "message"
  ],
  "message": "token invalid"
}
```

- 8.`customExpression` checker

```text
"return { next: Number(c.req.query('level')) > 5, message: 'the level is too low' }"
```

```json
{
  "type": "customExpression",
  "expression": "return { next: Number(c.req.query('level')) > 5, message: 'the level is too low' }",
}

```
