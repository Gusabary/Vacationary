# Learning notes of Week 5

## 2.18 Mon.

```js
const request = require('superagent')
```

+ 基础

  ```js
  request.post('url')
  request.get('url')
  request.put('url')
  request.del('url')
  
  request.then(res => ..)
  request.catch(err => ..)             
  request.end(res => ..)
  ```

+ 设置 `Header`

  ```js
  request.set({
      key1: value1,
      key2: value2
  })
  ```

+ `GET` 请求

  ```js
  request.get('url')
  	.query({
          key1: value1,
      	key2: value2
  	})
  ```

+ `POST/PUT` 请求

  ```js
  request.post('url')
  	.send({
          key1: value1,
          key2: value2
  	})
  ```

+ 如果遇到莫名其妙的 *error：重复定义* ， 先检查一下自定义的变量名是不是被自动 import 进来了。

+ 有的异步操作会改变变量的类型（如 Object -> Array），在操作完成前，调用 Array 的方法会报错，解决方法是加一个判断。

+ >JavaScript 整除运算
  >
  >整除四舍五入: X=Math.round(A/B)      
  >
  >整除向上取整: X=Math.ceil(A/B)
  >
  >整除向下取整: X=Math.floor(A/B)
  >
  >小数点后保留n位: X=X.toFixed(n)

##### Last-modified date: 2019.2.18, 8 p.m.