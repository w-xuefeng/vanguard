# Vanguard Checker


## 操作符 Operator

操作符用于比较期望值和目标值，取值如下

| 操作符 | 描述 |
| -------- | ----------- |
| `==`| value == expectValue |
| `===` | value === expectValue |
| `>` | value 是必要的且 value > expectValue |
| `>=` | value 是必要的且 value >= expectValue |
| `<` | value 是必要的且 value < expectValue |
| `<=` | value 是必要的且 value <= expectValue |
| `!=` | value != expectValue |
| `!==` | value !== expectValue |
| `includes` | value 是必要的且 value 包含 expectValue |
| `startsWith` | value 是必要的且 value 以 expectValue 开头 |
| `endsWith` | value 是必要的且 value 以 expectValue 结尾 |
| `back-includes` | expectValue 包含 value |
| `back-startsWith` | expectValue 以 value 开头 |
| `back-endsWith` | expectValue 以 value 结尾 |
| `any-includes` | includes 或 back-includes |
| `any-startsWith` | startsWith 或 back-startsWith |
| `any-endsWith` | endsWith 或 back-endsWith |

<details>
  <summary>
    源代码
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

## 检查器 Checker

检查器是一个对象，例如

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

通常包含以下属性

| 属性 | 描述 | 是否必须 |
| - | - | - |
| `type` | 检查器的类型，取值如下文所示 | 是 |
| `expectValue` | 期望值 | 是 |
| `parseValue` | 解析目标值和期望值的方法，取值如下文所示，默认值为 `value => value` | 否 |
| `operator` | 操作符，值如上文所示，默认值为 `==` | 否 |
| `pattern` | 正则字符串，优先级比 `operator` 高 | 否 |
| `patternFlags` | 正则匹配标志的字符串，（`g`,`i`,`m`,`s`,`u`,`y`）| 否 |
| `message` | 不满足时返回的错误信息 | 否 |
| `headerName` (仅当 type 为 `headers` 时) | 要检测 header 的属性名称 | 仅当 type 为 `headers` 时是 |
| `queryName` (仅当 type 型为 `query` 或 `queries` 时) | 要检测的 URLSearchParams 名称 | 仅当 type 型为 `query` 或 `queries` 时是 |
| `checkType` (仅当 type 为 `queries` 时) | 检测一个或全部，值为 `all` \| `single` | 否 |
| `expectAllValue` (仅当 type 为 `queries` 时) | 期望值数组 | 否 |
| `index` (仅当 type 为 `queries` 且 checkType 为 `single` 时) | query 索引下标，从0开始 | 否 |
| `bodyType` (仅当 type 为 `body` 时) | 请求体的类型，取值如下：`json` \| `text` \| `formData` \| `blob` | 仅当 type 为 `body` 时是 |
| `property` (仅当 type 为 `body` 时) | 检测请求体的属性 | 仅当 type 为 `body` 时是 |
| `fileProperty` (仅当 type 为 `body` 且 bodyType 为 `formData` 或 `blob` 时) | `File` 或 `Blob` 的属性名称，例如 `name`、`size`、`type` | 仅当 type 为 `body` 且 bodyType 为 `formData` 或 `blob` 时是 |
| `url` (仅当 type 为 `remote` 时) | 远程接口地址 | 仅当 type 为 `remote` 时是 |
| `method` (仅当 type 为 `remote` 时) | 远程接口请求方式，默认 `GET` | 否 |
| `headers` (仅当 type 为 `remote` 时) | 远程接口请求头 | 否 |
| `body` (仅当 type 为 `remote` 时) | 远程接口请求体(如果有的话) | 否 |
| `nextField` (仅当 type 为 `remote` 时) | 远程接口响应体校验结果字段，字符串数组格式，如：`["grandparent", "parent", "next"]`, 默认 `["next"]` | 否 |
| `messageField` (仅当 type 为 `remote` 时) | 远程接口响应体校验结果消息字段，字符串数组格式，如：`["grandparent", "parent", "message"]`, 默认 `["message"]` | 否 |
| `timeout` (仅当 type 为 `remote` 时) | 远程接口超时时间，默认为 5000 ms，请求超时则代表校验不通过 | 否 |
| `expression` (仅当 type 为 `customExpression` 时) | 自定义表达式，此字符串将传递给 `new Function` 的第二个参数，第一个参数为名为 'c' 的上下文变量，必须返回一个具有布尔类型的 `next` 值的对象 | 仅当 type 为 `customExpression` 时是 |
| `where` | 限制 checker 校验的范围，如果配置了 where，只有满足 where 的条件才会执行校验器 | 否 |

`where` 的形式和 `checker` 类似，是 `checker` 的子集

`parseValue` 的取值如下

| 类型 | 描述 |
| - | - |
| 默认值 | value => value |
| `String` | String(value) |
| `Number` | Number(value) |
| `Boolean` | Boolean(value) |

`type` 的取值如下

| 类型 | 描述 |
| - | - |
| `url` | 检查 context.req.url |
| `path` | 检查 context.req.path |
| `headers` | 检查 context.req.header(headerName) |
| `query` | 检查 context.req.query(queryName) |
| `queries` | 检查 context.req.queries(queryName) |
| `body` | 检查 context.req.body |
| `remote`| 调用远程接口校验 |
| `customExpression` | 自定义表达式 |

## 检查器示例

- 1.`url` 检查器

```json
{
  "type": "url",
  "expectValue": "https",
  "operator": "startsWith",
  "message": "仅支持 HTTPS"
}
```

- 2.`path` 检查器

```json
{
  "type": "path",
  "expectValue": "/prefix/specific-path",
  "operator": "startsWith",
  "message": "仅可访问 /prefix/specific-path"
}

{
  "type": "path",
  "pattern": "\\/archive\\/\\d{4}\\/\\d{1,2}\\/\\d{1,2}\\/.+$",
  "patternFlags": "i",
  "message": "仅可访问 archive/year/month/date/*"
}

{
  "type": "path",
  "expectValue": "specific-path",
  "operator": "includes",
  "message": "仅可访问路径包含 'specific-path'"
}
```

- 3.`headers` 检查器

```json
{
  "type": "headers",
  "headerName": "authorization",
  "expectValue": "Bearer",
  "operator": "startsWith",
  "message": "访问被拒绝"
}
```

- 4.`query` 检查器

```json
{
  "type": "query",
  "queryName": "from",
  "expectValue": "vanguard",
  "operator": "===",
  "message": "访问被拒绝"
}

{
  "type": "query",
  "queryName": "level",
  "expectValue": 5,
  "parseValue": "Number",
  "operator": ">",
  "message": "等级太低"
}
```

- 5.`queries` 检查器

```json
{
  "type": "queries",
  "queryName": "names",
  "checkType": "single",
  "expectValue": "Amy",
  "operator": "includes",
  "index": 2,
  "message": "第三个名字必须包含 'Amy'"
}

{
  "type": "queries",
  "queryName": "from",
  "checkType": "all",
  "expectAllValue": ["shanghai", "beijing"],
  "index": 2,
  "message": "from 必须是 [(shanghai 和 beijing) 或 (beijing 和 shanghai)]"
}
```
- 6.`body` 检查器

```json
{
  "type": "body",
  "bodyType": "json",
  "property": "level",
  "expectValue": 10,
  "operator": ">",
  "message": "等级太低"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "age",
  "expectValue": 18,
  "operator": ">=",
  "message": "此人太年轻"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "file",
  "fileProperty": "size",
  "expectValue": 102400,
  "operator": "<",
  "message": "文件太大"
}

{
  "type": "body",
  "bodyType": "blob",
  "fileProperty": "size",
  "expectValue": 10240,
  "operator": "<=",
  "message": "文件太大"
}

{
  "type": "body",
  "bodyType": "formData",
  "property": "file",
  "fileProperty": "type",
  "expectValue": "image",
  "operator": "includes",
  "message": "此文件类型不受支持，仅支持图像格式"
}
```

- 7.`remote` 检查器

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

- 8.`customExpression` 检查器

```text
"return { next: Number(c.req.query('level')) > 5, message: '等级太低' }"
```

```json
{
  "type": "customExpression",
  "expression": "return { next: Number(c.req.query('level')) > 5, message: '等级太低' }",
}

``` 
