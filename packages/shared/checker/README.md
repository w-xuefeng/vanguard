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
  "type": "path",
  "expectValue": "/api",
  "parseValue": "String",
  "operator": "startsWith",
  "message": "Access Denied"
}
```

which generally contains the following properties

| property | description |
| - | - |
| `type` | The types of checkers, with values as shown below |
| `expectValue` | Expected value |
| `parseValue` | Methods for parsing target values and expected values，with values as shown above, default value is `String` |
| `operator` | Operator, with values as shown above, default value is `==` |
| `message` | Error message returned when not satisfied |
| `headerName` (only type is `headers`) | The header attribute name to be detected |
| `queryName` (only type is `query` or `queries`) | The URLSearchParams name to be detected |
| `checkType` (only type is `queries`) | Detect one or all, with values of `all` \| `single`' |
| `expectAllValue` (only type is `queries`) | Expected value array |
| `index` (only type is `queries` and checkType is `single`) | the query index |
| `bodyType` (only type is `body`) | The type of the request body takes the following values: `json` \| `text` \| `formData` \| `blob` |
| `property` (only type is `body`) | To detect the property of the request body |
| `fileProperty` (only type is `body` and bodyType is `formData` or `blob`) | The property name of `File` or `Blob`, such as `name`、`size`、`type` |
| `expression` (only type is `customExpression`) | Custom expression, this string will be passed to the second parameter of the `new Function`, with the first parameter being the context variable named 'c', and
 must return an object with `next` value of boolean type |

The value of `parseValue` is as follows

| type | description |
| - | - |
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

- 7.`customExpression` checker

```text
"return { next: Number(c.req.query('level')) > 5, message: 'the level is too low' }"
```

```json
{
  "type": "customExpression",
  "expression": "return { next: Number(c.req.query('level')) > 5, message: 'the level is too low' }",
}

```
